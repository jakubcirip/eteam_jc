import { SQLManager } from '../managers/SQLManager';
import { Utils } from '../../Utils';

import * as mp3Dur from 'mp3-duration';
import * as ffmpeg from 'ffmpeg';
import * as _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs-extra';
import { GoogleManager } from '../managers/GoogleManager';
import { Error404 } from '../helpers/errors';

export class AnalyseService {
  static async getInterviewPeople(req: any, intId: number): Promise<any> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const intStaticData = await SQLManager.knex
      .select(['name', 'job_position_form_id', 'tag'])
      .from('job_interviews')
      .where('division_id', divId)
      .where('id', intId)
      .limit(1);

    if (intStaticData.length <= 0) {
      throw Error404(
        req,
        __('HrService.getInterviewPeople.InterviewNoLongerExist')
      );
    }

    const intName = intStaticData[0].name;
    const formId = intStaticData[0].job_position_form_id;
    const intTag = intStaticData[0].tag;

    const intData = await SQLManager.knex
      .select(['job_interview_person_id'])
      .from('job_interviews_candidates')
      .where('job_interview_id', intId)
      .where('division_id', divId);

    const peopleData: any[] = await SQLManager.knex
      .select(['id', 'name', 'email', 'tag'])
      .from('job_interviews_people')
      .whereIn(
        'id',
        intData.map((p) => {
          return p.job_interview_person_id;
        })
      );

    const previewData: any[] = await SQLManager.knex
      .select(['test_user_tag'])
      .from('job_interviews')
      .where('id', intId)
      .limit(1);

    if (previewData.length > 0) {
      peopleData.push({
        id: '9999999',
        name: 'Interview Preview Results',
        email: 'interviewpreview@hiroo.eu',
        tag: previewData[0].test_user_tag,
      });
    }

    const peoplePromises = peopleData.map(async (d) => {
      let f = null;
      let f2 = null;

      try {
        f = (
          await fs.readFile(
            path.join(
              process.env.dirname,
              '../private/fm/int/' + intTag + '/' + d.tag + '_source.json'
            )
          )
        ).toString();
      } catch (err) {
        // file not found, person didnt answer
      }

      try {
        f2 = (
          await fs.readFile(
            path.join(
              process.env.dirname,
              '../private/fm/int/' + intTag + '/' + d.tag + '.json'
            )
          )
        ).toString();
      } catch (err) {
        // file not found, person didnt answer
      }

      return {
        ...d,
        medalsData: f === null ? null : JSON.parse(f),
        answersData: f2 === null ? null : JSON.parse(f2),
      };
    });

    const formData = await SQLManager.knex
      .select(['data'])
      .from('job_positions_forms')
      .where('division_id', divId)
      .where('id', formId)
      .limit(1);

    if (formData.length <= 0) {
      throw Error404(
        req,
        __('HrService.getInterviewPeople.templateNoLongerExist')
      );
    }

    const formDataJson = JSON.parse(formData[0].data);

    const people = await Promise.all(peoplePromises);

    let finishedPeople = people.filter((p) => p.medalsData !== null);
    const failedPeople = people.filter((p) => p.medalsData === null);

    const allGlobalMedals: string[] = [];
    const allAnswerMedsls: { [key: string]: string[] } = {};

    finishedPeople.forEach((p) => {
      if (!p.answersData) {
        return;
      }

      const globals = Object.keys(p.answersData.global);
      globals.forEach((g) => {
        if (!allGlobalMedals.includes(g)) {
          allGlobalMedals.push(g);
        }
      });

      Object.keys(p.answersData.answers).forEach((answerId) => {
        const answerMedals = Object.keys(p.answersData.answers[answerId]);

        if (!allAnswerMedsls[answerId]) {
          allAnswerMedsls[answerId] = [];
        }

        answerMedals.forEach((aMedal) => {
          if (!allAnswerMedsls[answerId].includes(aMedal)) {
            allAnswerMedsls[answerId].push(aMedal);
          }
        });
      });
    });

    const globalPlacementScore: {
      [key: string]: { first: number; second: number; third: number };
    } = {};
    const answerPlacementScore: {
      [key: string]: {
        [key: string]: { first: number; second: number; third: number };
      };
    } = {};

    const asignBestPlacement = (
      gKey: string,
      playerScore: number,
      place: string
    ): boolean => {
      if (!globalPlacementScore[gKey][place]) {
        globalPlacementScore[gKey][place] = playerScore;
        return true;
      } else {
        if (globalPlacementScore[gKey][place] < playerScore) {
          globalPlacementScore[gKey][place] = playerScore;
          return true;
        } else if (globalPlacementScore[gKey][place] === playerScore) {
          return true;
        }
      }

      return false;
    };

    allGlobalMedals.forEach((gKey) => {
      if (!globalPlacementScore[gKey]) {
        globalPlacementScore[gKey] = {
          first: null,
          second: null,
          third: null,
        };
      }

      finishedPeople.forEach((p) => {
        const playerScore = p.answersData.global[gKey]
          ? p.answersData.global[gKey].result
          : -1;

        if (playerScore !== -1) {
          if (asignBestPlacement(gKey, playerScore, 'first')) {
            return;
          }

          if (asignBestPlacement(gKey, playerScore, 'second')) {
            return;
          }

          if (asignBestPlacement(gKey, playerScore, 'third')) {
            return;
          }
        }
      });
    });

    const asignBestAnswerPlacement = (
      answerId: string,
      medalId: string,
      playerScore: number,
      place: string
    ): boolean => {
      if (!answerPlacementScore[answerId][medalId][place]) {
        answerPlacementScore[answerId][medalId][place] = playerScore;
        return true;
      } else {
        if (answerPlacementScore[answerId][medalId][place] < playerScore) {
          answerPlacementScore[answerId][medalId][place] = playerScore;
          return true;
        } else if (
          answerPlacementScore[answerId][medalId][place] === playerScore
        ) {
          return true;
        }
      }

      return false;
    };

    Object.keys(allAnswerMedsls).forEach((answerId) => {
      if (!answerPlacementScore[answerId]) {
        answerPlacementScore[answerId] = {};
      }
      allAnswerMedsls[answerId].forEach((medalId) => {
        if (!answerPlacementScore[answerId][medalId]) {
          answerPlacementScore[answerId][medalId] = {
            first: null,
            second: null,
            third: null,
          };
        }

        finishedPeople.forEach((p) => {
          const playerScore = p.answersData.answers[answerId][medalId]
            ? p.answersData.answers[answerId][medalId].result
            : -1;

          if (playerScore !== -1) {
            if (
              asignBestAnswerPlacement(answerId, medalId, playerScore, 'first')
            ) {
              return;
            }

            if (
              asignBestAnswerPlacement(answerId, medalId, playerScore, 'second')
            ) {
              return;
            }

            if (
              asignBestAnswerPlacement(answerId, medalId, playerScore, 'third')
            ) {
              return;
            }
          }
        });
      });
    });

    const getTotalPoints = (can: any) => {
      if (!can.answersData) {
        return 0;
      }

      let totalpoints = 0;

      Object.keys(can.answersData.global).forEach((gKey) => {
        totalpoints += can.answersData.global[gKey].result;
      });

      Object.keys(can.answersData.answers).forEach((answerId) => {
        Object.keys(can.answersData.answers[answerId]).forEach((medalId) => {
          totalpoints += can.answersData.answers[answerId][medalId].result;
        });
      });

      return totalpoints;
    };

    let overallRatingData: any[] = finishedPeople.map((person) => {
      return {
        id: person.id,
        points: getTotalPoints(person),
      };
    });

    overallRatingData.sort((a, b) => (a.points > b.points ? -1 : 1));
    overallRatingData = overallRatingData.map((p) => p.id);

    finishedPeople = finishedPeople.map((person) => {
      if (!person.answersData) {
        return person;
      }

      // su traja, ja mam index 1.. cize som druhy.. 2/3 =

      const personIndex = overallRatingData.indexOf(person.id);
      const placementPercentage =
        personIndex === -1
          ? 0
          : Math.round(((personIndex + 1) / overallRatingData.length) * 100);

      person.percentage = placementPercentage;

      Object.keys(person.answersData.global).forEach((gKey) => {
        const personScore = person.answersData.global[gKey].result;
        const medalObject = globalPlacementScore[gKey];

        const isBoolean = person.answersData.global[gKey].isBoolean;

        person.answersData.global[gKey].medal = 'none';

        if (medalObject.first !== null && personScore === medalObject.first) {
          person.answersData.global[gKey].medal = isBoolean ? 'blue' : 'gold';
        }

        if (medalObject.second !== null && personScore === medalObject.second) {
          person.answersData.global[gKey].medal = 'silver';
        }

        if (medalObject.third !== null && personScore === medalObject.third) {
          person.answersData.global[gKey].medal = 'bronze';
        }
      });

      Object.keys(person.answersData.answers).forEach((answerId) => {
        Object.keys(person.answersData.answers[answerId]).forEach((medalId) => {
          const personScore =
            person.answersData.answers[answerId][medalId].result;
          const medalObject = answerPlacementScore[answerId][medalId];

          const isBoolean =
            person.answersData.answers[answerId][medalId].isBoolean;

          person.answersData.answers[answerId][medalId].medal = 'none';

          if (medalObject.first !== null && personScore === medalObject.first) {
            person.answersData.answers[answerId][medalId].medal = isBoolean
              ? 'blue'
              : 'gold';
          }

          if (
            medalObject.second !== null &&
            personScore === medalObject.second
          ) {
            person.answersData.answers[answerId][medalId].medal = 'silver';
          }

          if (medalObject.third !== null && personScore === medalObject.third) {
            person.answersData.answers[answerId][medalId].medal = 'bronze';
          }
        });
      });

      return person;
    });

    return {
      intTag,
      intName,
      questions: formDataJson.pairs,
      failedCandidates: failedPeople,
      candidates: finishedPeople,
      allGlobalMedals,
      allAnswerMedsls,
    };
  }

  static async generateResults(
    req,
    data: {
      submitAt: number;
      intTag: string;
      userTag: string;
      isHardwareWorking: boolean;
      interviewType: 'mic' | 'cam';
      name: string;
      surname: string;
      email: string;
      nickname: string;
      phone: string;
      id: string; // uuid odpovede
      answers: {
        uuid: string; // uuid question pair
        response: {
          rating: number;
          data: any;
          didSkipRating: boolean;
          /*
                    data.type:
                        type: value: string; wordsPerMinute: number;

                        speak: value: string;

                        select-one:value: string, didSkipManually: boolean

                        select-many: value: string[], didSkipManually: boolean
                */
        };
      }[];
    }
  ): Promise<{
    sttObj: { type: string; data: { [key: string]: any } };
    faceRecon: { data: { [key: string]: any } };
    submitAt: number;
    intTag: string;
    userTag: string;
    isHardwareWorking: boolean;
    interviewType: 'mic' | 'cam';
    name: string;
    surname: string;
    email: string;
    nickname: string;
    phone: string;
    id: string; // uuid odpovede

    baseTotal: number;
    total: number;
    global: {
      [key: string]: {
        // medal tag
        isBoolean: boolean;
        base: number;
        result: number;
      };
    };
    answers: {
      [key: string]: {
        // question uuid
        [key: string]: {
          // medal tag
          isBoolean: boolean;
          base: number;
          result: number;
        };
      };
    };
  }> {
    const res = {
      sttObj: {
        type: 'none',
        data: {},
      },
      faceRecon: {
        data: {},
      },
      baseTotal: -1,
      total: -1,
      global: {},
      answers: {},
      submitAt: data.submitAt,
      intTag: data.intTag,
      userTag: data.userTag,
      isHardwareWorking: data.isHardwareWorking,
      interviewType: data.interviewType,
      name: data.name,
      surname: data.surname,
      email: data.email,
      nickname: data.nickname,
      phone: data.phone,
      id: data.id, // uuid odpovede
    };

    const [{ divId, posId, formId, intId }] = await SQLManager.knex
      .select({
        intId: 'id',
        divId: 'division_id',
        posId: 'job_position_id',
        formId: 'job_position_form_id',
      })
      .from('job_interviews')
      .where('tag', data.intTag)
      .limit(1);

    const [formData] = await SQLManager.knex
      .select({
        data: 'data',
      })
      .from('job_positions_forms')
      .where('id', formId)
      .limit(1);

    const formJson = JSON.parse(formData.data);

    const [{ companyId }] = await SQLManager.knex
      .select({
        companyId: 'company_id',
      })
      .from('division')
      .where('id', divId)
      .limit(1);

    const { sub_model: currentPlan } = await Utils.companyToMany(
      req,
      companyId,
      ['sub_model']
    );

    const allMedals: any[] = await SQLManager.knex
      .select({
        medalId: 'medal_id',
        weight: 'weight',
        qpUuid: 'qp_uuid',
      })
      .from('job_interviews_weight')
      .where('form_id', formId);

    // global medals

    await Promise.all(
      allMedals.map(async (medalInfo) => {
        const [{ defaultWeight, tag, isGlobal }] = await SQLManager.knex
          .select({
            defaultWeight: 'default_weight',
            tag: 'tag',
            isGlobal: 'is_global',
          })
          .from('medals')
          .where('id', medalInfo.medalId)
          .limit(1);

        if (!isGlobal) {
          return;
        }

        if (!medalInfo.weight && medalInfo.weight !== 0) {
          medalInfo.weight = defaultWeight;
        }

        if (tag === 'global_answer_submit_speed') {
          const [{ startDate }] = await SQLManager.knex
            .select({
              startDate: 'date',
            })
            .from('job_interviews_data')
            .where('int_id', intId)
            .where('type', 'start')
            .limit(1);

          const startDateMilis = startDate.getTime();
          const submitDateMilis = data.submitAt;
          const differenceMilis = Math.abs(submitDateMilis - startDateMilis);
          const differenceSecs = Math.ceil(differenceMilis / 1000);
          const differenceHours = Math.ceil(differenceSecs / 3600);

          res.global[tag] = {
            result: differenceHours * medalInfo.weight,
            base: differenceHours,
            isBoolean: false,
          };
        } else if (tag === 'global_camera_over_mic') {
          const value = data.interviewType === 'cam' ? 1 : 0;
          res.global[tag] = {
            result: value * medalInfo.weight,
            base: value,
            isBoolean: true,
          };
        }
      })
    );

    // per-answer medals

    for (const answer of data.answers) {
      res.answers[answer.uuid] = {};

      const qpUuid = answer.uuid;
      const qp = formJson.pairs.find((p) => p.uuid === qpUuid);

      res.sttObj.data[qp.uuid] = {};
      res.faceRecon.data[qp.uuid] = {};

      const answerType = qp.a.type.id;

      const audioPathTmpMp3 = path.join(
        process.env.dirname,
        '../temp/' + answer.uuid + '_temp.mp3'
      );
      const audioPathMp3 = path.join(
        process.env.dirname,
        '../temp/' + answer.uuid + '.mp3'
      );

      const audioPathTmpMp4 = path.join(
        process.env.dirname,
        '../temp/' + answer.uuid + '_temp_mp4.mp4'
      );
      const audioPathMp4 = path.join(
        process.env.dirname,
        '../temp/' + answer.uuid + '_mp4.mp3'
      );

      const videoPathMp4 = path.join(
        process.env.dirname,
        '../temp/' + answer.uuid + '_mp4.mp4'
      );

      let mp3DataObj;
      let mp4DataObj;

      if (answer.response.data.type === 'speak') {
        if (data.interviewType === 'mic') {
          const mp3Data = answer.response.data.value.split(';base64,')[1];

          const b = Buffer.from(mp3Data, 'base64');
          await fs.writeFile(audioPathTmpMp3, b);
          const audioFile = await new ffmpeg(audioPathTmpMp3);

          await new Promise((res, rej) => {
            audioFile.fnExtractSoundToMP3(audioPathMp3, (err, f) => {
              if (err) {
                rej(err);
                return;
              }

              setTimeout(() => {
                res(true);
              }, 3000);
            });
          });

          const langObj = qp.a.data.find(
            (d) => d.data.type === 'answer_speak_language'
          );
          const langCode = langObj.value;
          mp3DataObj = await GoogleManager.readSTTFile(audioPathMp3, langCode);

          res.sttObj.type = 'mp3';
          res.sttObj.data[qp.uuid] = mp3DataObj;

          await fs.remove(audioPathTmpMp3);
          await fs.remove(audioPathMp3);
        } else if (data.interviewType === 'cam') {
          const mp4Data = answer.response.data.value.split(';base64,')[1];

          const b = Buffer.from(mp4Data, 'base64');
          await fs.writeFile(audioPathTmpMp4, b);
          const audioFile = await new ffmpeg(audioPathTmpMp4);

          await new Promise((res, rej) => {
            audioFile.fnExtractSoundToMP3(audioPathMp4, (err, f) => {
              if (err) {
                rej(err);
                return;
              }

              setTimeout(() => {
                res(true);
              }, 3000);
            });
          });

          const langObj = qp.a.data.find(
            (d) => d.data.type === 'answer_speak_language'
          );
          const langCode = langObj.value;
          mp4DataObj = await GoogleManager.readSTTFile(audioPathMp4, langCode);

          res.sttObj.type = 'mp4';
          res.sttObj.data[qp.uuid] = mp4DataObj;

          await new Promise((res, rej) => {
            audioFile.save(videoPathMp4, (err, f) => {
              if (err) {
                rej(err);
                return;
              }

              setTimeout(() => {
                res(true);
              }, 3000);
            });
          });

          const videoObj = await GoogleManager.readFaceEmotions(videoPathMp4);
          res.faceRecon.data[qp.uuid] = videoObj;

          await fs.remove(audioPathTmpMp4);
          await fs.remove(audioPathMp4);
        }
      }

      await Promise.all(
        allMedals.map(async (medalInfo) => {
          const [{ defaultWeight, tag, isGlobal, type }] = await SQLManager.knex
            .select({
              defaultWeight: 'default_weight',
              tag: 'tag',
              isGlobal: 'is_global',
              type: 'type',
            })
            .from('medals')
            .where('id', medalInfo.medalId)
            .limit(1);

          if (type !== answerType) {
            return;
          }

          if (isGlobal) {
            return;
          }

          if (!medalInfo.weight && medalInfo.weight !== 0) {
            medalInfo.weight = defaultWeight;
          }

          if (tag === 'text_writing_speed') {
            const speed = answer.response.data.wordsPerMinute;

            res.answers[answer.uuid][tag] = {
              result: speed * medalInfo.weight,
              base: speed,
              isBoolean: false,
            };
          } else if (tag === 'text_keywords') {
            const words: string[] = answer.response.data.value.split(' ');
            const keywordsObj = qp.a.data.find(
              (d) => d.data.type === 'answer_type_keywords'
            );

            let keywordsCount = 0;
            const usedKeywords = [];

            keywordsObj.value.forEach((keyword) => {
              const wordWithKeyword = words.find((word) =>
                _.deburr(word.toLowerCase()).includes(
                  _.deburr(keyword.toLowerCase())
                )
              );
              if (wordWithKeyword && !usedKeywords.includes(keywordsCount)) {
                keywordsCount++;
                usedKeywords.push(keyword);
              }
            });

            res.answers[answer.uuid][tag] = {
              result: keywordsCount * medalInfo.weight,
              base: keywordsCount,
              isBoolean: false,
            };
          } else if (
            tag === 'text_did_skip_self_review' ||
            tag === 'select_many_did_skip_self_review' ||
            tag === 'select_one_did_skip_self_review' ||
            tag === 'audio_did_skip_self_review'
          ) {
            const value = answer.response.didSkipRating ? 1 : 0;
            res.answers[answer.uuid][tag] = {
              result: value * medalInfo.weight,
              base: value,
              isBoolean: true,
            };
          } else if (
            tag === 'text_self_review' ||
            tag === 'select_one_self_review' ||
            tag === 'select_many_self_review' ||
            tag === 'audio_self_review'
          ) {
            const rating = answer.response.rating;

            res.answers[answer.uuid][tag] = {
              result: rating * medalInfo.weight,
              base: rating,
              isBoolean: false,
            };
          } else if (
            tag === 'select_one_did_skip' ||
            tag === 'select_many_did_skip'
          ) {
            const value = answer.response.data.didSkipManually ? 1 : 0;
            res.answers[answer.uuid][tag] = {
              result: value * medalInfo.weight,
              base: value,
              isBoolean: true,
            };
          } else if (tag === 'select_one_correct_option') {
            const candidateOption: string = answer.response.data.value;

            const correctOptionObj = qp.a.data.find(
              (d) => d.data.type === 'answer_selectone_correct'
            );
            const correctOption: string = correctOptionObj.value;

            const value = correctOption === candidateOption ? 1 : 0;
            res.answers[answer.uuid][tag] = {
              result: value * medalInfo.weight,
              base: value,
              isBoolean: false, // Mozno true? no neviem.. asi nie nech je za to medajla
            };
          } else if (tag === 'select_many_correct_option') {
            const candidateOptions: string[] = answer.response.data.value;

            const correctOptionsObj = qp.a.data.find(
              (d) => d.data.type === 'answer_selectmany_correct'
            );

            let value = 0;

            const correctOptions: string[] = correctOptionsObj.value;

            candidateOptions.forEach((candidateOption) => {
              if (correctOptions.includes(candidateOption)) {
                value++;
              }
            });

            res.answers[answer.uuid][tag] = {
              result: value * medalInfo.weight,
              base: value,
              isBoolean: false,
            };
          } else if (
            tag === 'audio_face_emotions' ||
            tag === 'audio_talking_speed' ||
            tag === 'audio_talking_pauses' ||
            tag === 'audio_keywords'
          ) {
            if (tag === 'audio_keywords') {
              if (
                mp3DataObj &&
                mp3DataObj.results &&
                mp3DataObj.results[0] &&
                mp3DataObj.results[0].alternatives &&
                mp3DataObj.results[0].alternatives[0]
              ) {
                const text = mp3DataObj.results[0].alternatives[0].transcript;
                const words: string[] = text.split(' ');
                const keywordsObj = qp.a.data.find(
                  (d) => d.data.type === 'answer_speak_keywords'
                );

                let keywordsCount = 0;
                const usedKeywords = [];

                keywordsObj.value.forEach((keyword) => {
                  const wordWithKeyword = words.find((word) =>
                    _.deburr(word.toLowerCase()).includes(
                      _.deburr(keyword.toLowerCase())
                    )
                  );
                  if (
                    wordWithKeyword &&
                    !usedKeywords.includes(keywordsCount)
                  ) {
                    keywordsCount++;
                    usedKeywords.push(keyword);
                  }
                });

                res.answers[answer.uuid][tag] = {
                  result: keywordsCount * medalInfo.weight,
                  base: keywordsCount,
                  isBoolean: false,
                };
              } else {
                res.answers[answer.uuid][tag] = {
                  result: 0,
                  base: 0,
                  isBoolean: false,
                };
              }
            } else if (tag === 'audio_talking_pauses') {
              if (
                mp3DataObj &&
                mp3DataObj.results &&
                mp3DataObj.results[0] &&
                mp3DataObj.results[0].alternatives &&
                mp3DataObj.results[0].alternatives[0]
              ) {
                const words = mp3DataObj.results[0].alternatives[0].words;
                let totalTalkTime = 0;

                words.forEach((w) => {
                  const wordStartTime =
                    +w.startTime.seconds + +(w.startTime.nanos / 1000000000);
                  const wordEndTime =
                    +w.endTime.seconds + +(w.endTime.nanos / 1000000000);
                  totalTalkTime += Math.abs(wordEndTime - wordStartTime);
                });

                const totalLength: number = await new Promise((res, rej) => {
                  mp3Dur(
                    mp3DataObj ? audioPathMp3 : audioPathMp4,
                    (err, dur) => {
                      if (err) {
                        rej(err);
                        return;
                      }

                      res(dur);
                    }
                  );
                });

                const talkPercentage = Math.round(
                  (totalTalkTime / totalLength) * 100
                );

                res.answers[answer.uuid][tag] = {
                  result: talkPercentage * medalInfo.weight,
                  base: talkPercentage,
                  isBoolean: false,
                };
              } else {
                res.answers[answer.uuid][tag] = {
                  result: 0,
                  base: 0,
                  isBoolean: false,
                };
              }
            } else if (tag === 'audio_talking_speed') {
              if (
                mp3DataObj &&
                mp3DataObj.results &&
                mp3DataObj.results[0] &&
                mp3DataObj.results[0].alternatives &&
                mp3DataObj.results[0].alternatives[0]
              ) {
                const text = mp3DataObj.results[0].alternatives[0].transcript;
                let totalLetters = 0;

                text.split(' ').forEach((w) => {
                  totalLetters += w.length;
                });

                const totalLength: number = await new Promise((res, rej) => {
                  mp3Dur(
                    mp3DataObj ? audioPathMp3 : audioPathMp4,
                    (err, dur) => {
                      if (err) {
                        rej(err);
                        return;
                      }

                      res(dur);
                    }
                  );
                });

                const lettersPerMinute = Math.round(
                  (totalLetters * 60) / totalLength
                );

                res.answers[answer.uuid][tag] = {
                  result: lettersPerMinute * medalInfo.weight,
                  base: lettersPerMinute,
                  isBoolean: false,
                };
              } else {
                res.answers[answer.uuid][tag] = {
                  result: 0,
                  base: 0,
                  isBoolean: false,
                };
              }
            } else if (tag === 'audio_face_emotions') {
              const emotions = mp4DataObj;
              res.answers[answer.uuid][tag] = {
                result: 0,
                base: 0,
                isBoolean: false,
              };
              // TODO: Code if needed..
            }
          }
        })
      );
    }

    return res;
  }
}
