let totalPointsArr = [];
let globalPointsObj = {};
let answerPointsObj = {};
let allData = null;

function generateTopArrays(data) {
  // all points
  const tempArr = data.candidates.map(function (c) {
    let totalPoints = 0;

    Object.keys(c.answersData.global).forEach(function (globalkey) {
      const toAdd = c.answersData.global[globalkey].result;
      totalPoints += toAdd;
    });

    Object.keys(c.answersData.answers).forEach(function (answerId) {
      Object.keys(c.answersData.answers[answerId]).forEach(function (medalId) {
        const toAdd = c.answersData.answers[answerId][medalId].result;
        totalPoints += toAdd;
      });
    });

    return { id: c.id, result: totalPoints };
  });

  tempArr.sort((a, b) => (a.result > b.result ? -1 : 1));
  totalPointsArr = tempArr.map((tVal) => tVal.id);

  // answer points
  const allAnswers = [];
  const allAnswerMedals = {};

  data.candidates.forEach(function (c) {
    canAnswersArr = Object.keys(c.answersData.answers);
    canAnswersArr.forEach(function (answerId) {
      if (!allAnswers.includes(answerId)) {
        allAnswerMedals[answerId] = [];
        allAnswers.push(answerId);
      }
    });
  });

  allAnswers.forEach(function (answerId) {
    const allMedals = [];

    data.candidates.forEach(function (c) {
      canMedalsArr = Object.keys(c.answersData.answers[answerId]);
      canMedalsArr.forEach(function (medalId) {
        if (!allMedals.includes(medalId)) {
          allMedals.push(medalId);
        }
      });
    });

    allAnswerMedals[answerId] = allMedals;
  });

  for (const answerId of allAnswers) {
    for (const medalId of allAnswerMedals[answerId]) {
      const tempArr = [];

      if (!answerPointsObj[answerId]) {
        answerPointsObj[answerId] = {};
      }

      if (!answerPointsObj[answerId][medalId]) {
        answerPointsObj[answerId][medalId] = [];
      }

      data.candidates.forEach(function (c) {
        const canResult = c.answersData.answers[answerId][medalId].result;
        tempArr.push({ id: can.id, result: canResult });
      });

      tempArr.sort((a, b) => (a.result > b.result ? -1 : 1));
      answerPointsObj[answerId][medalId] = tempArr.map((tVal) => tVal.id);
    }
  }

  // global points
  const allGlobalMedals = [];

  data.candidates.forEach(function (c) {
    canGlobalArr = Object.keys(c.answersData.global);
    canGlobalArr.forEach(function (cKey) {
      if (!allGlobalMedals.includes(cKey)) {
        allGlobalMedals.push(cKey);
      }
    });
  });

  globalPointsObj = {};
  allGlobalMedals.forEach(function (gKey) {
    const globalArr = data.candidates.map(function (c) {
      return { id: c.id, result: c.answersData.global[gKey].result };
    });

    globalArr.sort((a, b) => (a.result > b.result ? -1 : 1));

    globalPointsObj[gKey] = globalArr.map((tVal) => tVal.id);
  });
}

function getGlobalPercentage(can, gKey) {
  const canId = can.id;
  const arr = globalPointsObj[gKey];
  if (!arr) {
    return 0;
  }

  const arrIndex = arr.indexOf(canId);

  if (arrIndex === -1) {
    return 0;
  }

  return ((arrIndex + 1) / arr.length) * 100;
}

function getAnswerPercentage(can, answerId, medalId) {
  const canId = can.id;
  if (
    !answerPointsObj ||
    !answerPointsObj[answerId] ||
    !answerPointsObj[answerId][medalId]
  ) {
    return 0;
  }

  const arrIndex = answerPointsObj[answerId][medalId].indexOf(canId);

  if (arrIndex === -1) {
    return 0;
  }

  return ((arrIndex + 1) / answerPointsObj[answerId][medalId].length) * 100;
}

function getTotalPointsPercentage(can) {
  const canId = can.id;
  const arrIndex = totalPointsArr.indexOf(canId);

  if (arrIndex === -1) {
    return 0;
  }

  return ((arrIndex + 1) / totalPointsArr.length) * 100;
}

function firstInitData(data) {
  return new Promise(function (res, rej) {
    allData = { ...data };

    setTimeout(() => {
      res();
    }, 1);
  });
}

function initPage(canData) {
  const candidate = { ...canData };

  console.log(candidate);
  console.log(allData);

  generateTopArrays(allData);

  return new Promise(function (res, rej) {
    const submitDate = new Date(candidate.medalsData.submitAt);

    const totalPercentage = getTotalPointsPercentage(candidate);

    const totalStars =
      totalPercentage < 20
        ? 1
        : totalPercentage < 40
        ? 2
        : totalPercentage < 60
        ? 3
        : totalPercentage < 80
        ? 4
        : 5;

    // candidate detail
    document.querySelector('#fullName').textContent =
      candidate.medalsData.name + ' ' + candidate.medalsData.surname;

    document.querySelector('#phoneNumber').textContent =
      candidate.medalsData.phone;

    document.querySelector('#email').textContent = candidate.medalsData.email;

    document.querySelector('#nickname').textContent =
      candidate.medalsData.nickname;

    document.querySelector('#overallRating').textContent =
      totalStars + ' ' + (totalStars === 1 ? 'star' : 'stars');

    document.querySelector('#notes').innerHTML = (candidate.answersData.notes
      ? candidate.answersData.notes
      : 'No notes'
    )
      .split('\n')
      .join('<br>')
      .split(' ')
      .join('&nbsp;');

    document.querySelector('#submitedAt').textContent =
      submitDate.getDate() +
      '.' +
      submitDate.getMonth() +
      '.' +
      submitDate.getFullYear() +
      ' at ' +
      submitDate.getHours() +
      ':' +
      submitDate.getMinutes();

    // global medals
    const globalMedals = document.querySelector('#globalMedalsTable');
    const lineElement = globalMedals.firstElementChild.cloneNode(true);

    globalMedals.innerHTML = '';

    Object.keys(candidate.answersData.global).forEach(function (gKey) {
      const topGlobalPercentage = getGlobalPercentage(can, gKey);

      const line = lineElement.cloneNode(true);
      line.querySelector('#globalMedalsTitle').textContent = getMedalVerbose(
        gKey
      ).title;
      line.querySelector('#globalMedalsText').textContent =
        '(' +
        candidate.answersData.global[gKey].result +
        ' Points, TOP ' +
        topGlobalPercentage +
        '%)';

      globalMedals.appendChild(line);
    });

    // all answers
    const answersEl = document.querySelector('#allAnswers');
    const answerEl = answersEl.firstElementChild.cloneNode(true);

    answersEl.innerHTML = '';

    let index = 0;
    for (const answerId of Object.keys(candidate.answersData.answers)) {
      const q = allData.questions.find((qAll) => qAll.uuid === answerId);
      const el = answerEl.cloneNode(true);

      el.querySelector('#answerName').textContent = q.name;
      el.querySelector('#answerType').textContent = getVerboseAnswer(
        q.a.type.id
      );

      let bodyHTML = 'Unknown Answer';

      if (q.a.type.id === 'text_answer') {
        bodyHTML = candidate.medalsData.answers.find(
          (an) => an.uuid === answerId
        ).response.data.value;
      } else if (q.a.type.id === 'speak_answer') {
        try {
          bodyHTML =
            candidate.answersData.sttObj.data[answerId].results[0]
              .alternatives[0].transcript;
        } catch (err) {
          bodyHTML = 'Speech-to-text failed.';
        }
      } else if (q.a.type.id === 'select_many') {
        const allOptions = q.a.data.find(
          (d) => d.data.type === 'answer_selectmany_options'
        ).value;
        const correctOptions = q.a.data.find(
          (d) => d.data.type === 'answer_selectmany_correct'
        ).value;
        const candidateOptions = candidate.medalsData.answers.find(
          (an) => an.uuid === answerId
        ).response.data.value;

        bodyHTML = `
          <ul class="list-group">
            ${allOptions
              .map(
                (o) => `
              <li style="display: flex; align-items: center; justify-content: space-between;" class="${
                candidateOptions.includes(o) && correctOptions.includes(o)
                  ? 'is-correct'
                  : ''
              } list-group-item-light list-group-item">
                ${o}
                <div style="width: 170px; padding-left: 10px; display: flex; align-items: center; justify-content: space-between;">
                  
                  ${
                    correctOptions.includes(o)
                      ? `<span style="font-weight: bold; font-size: 10px;"> CORRECT </span>`
                      : '<span style="font-weight: bold; font-size: 10px; opacity: 0.3;"> NOT CORRECT </span>'
                  }

                  ${
                    candidateOptions.includes(o)
                      ? `<span style="font-weight: bold; font-size: 10px;"> SELECTED </span>`
                      : `<span style="font-weight: bold; font-size: 10px; opacity: 0.3;"> NOT SELECTED </span>`
                  }
                </div> 
              </li>
            `
              )
              .join('')}
          </ul>    
        `;
      } else if (q.a.type.id === 'select_one') {
        const allOptions = q.a.data.find(
          (d) => d.data.type === 'answer_selectone_options'
        ).value;
        const correctOption = q.a.data.find(
          (d) => d.data.type === 'answer_selectone_correct'
        ).value;
        const candidateOption = candidate.medalsData.answers.find(
          (an) => an.uuid === answerId
        ).response.data.value;

        bodyHTML = `
          <ul class="list-group">
            ${allOptions
              .map(
                (o) => `
              <li style="display: flex; align-items: center; justify-content: space-between;" class="${
                candidateOption == o && correctOption === o
                  ? 'is-correct'
                  : ''
              } list-group-item-light list-group-item">
                ${o}
                <div style="width: 170px; padding-left: 10px; display: flex; align-items: center; justify-content: space-between;">
                  
                  ${
                    correctOption === o
                      ? `<span style="font-weight: bold; font-size: 10px;"> CORRECT </span>`
                      : '<span style="font-weight: bold; font-size: 10px; opacity: 0.3;"> NOT CORRECT </span>'
                  }

                  ${
                    candidateOption === o
                      ? `<span style="font-weight: bold; font-size: 10px;"> SELECTED </span>`
                      : `<span style="font-weight: bold; font-size: 10px; opacity: 0.3;"> NOT SELECTED </span>`
                  }
                </div> 
              </li>
            `
              )
              .join('')}
          </ul>    
        `;
      }

      const selfStars = candidate.medalsData.answers.find(
        (an) => an.uuid === answerId
      ).response.rating;
      bodyHTML +=
        "<br /><span class='text-muted'> Self evaluation: </span> " +
        selfStars +
        ' ' +
        (selfStars === 1 ? 'star' : 'stars');

      el.querySelector('#answerBody').innerHTML = bodyHTML;

      const answerTableEl = el.querySelector('#answerMedalsTable');
      const answerLineEl = answerTableEl.firstElementChild.cloneNode(true);
      answerTableEl.innerHTML = '';

      Object.keys(candidate.answersData.answers[answerId]).forEach(function (
        medalId
      ) {
        const myEl = answerLineEl.cloneNode(true);

        const medalData = candidate.answersData.answers[answerId][medalId];

        topAnswerPercentage = getAnswerPercentage(can, answerId, medalId);

        myEl.querySelector(
          '#answerMedalsTableName'
        ).textContent = getMedalVerbose(medalId).title;
        myEl.querySelector('#answerMedalsTableText').textContent = textContent =
          '(' + medalData.result + ' Points, TOP ' + topAnswerPercentage + '%)';

        answerTableEl.appendChild(myEl);
      });

      if (index > 0) {
        el.classList.add('mt-4');
      }

      answersEl.appendChild(el);

      index++;
    }

    setTimeout(() => {
      res();
    }, 1);
  });
}

function getMedalVerbose(medalId) {
  const obj = {
    global_answer_submit_speed: {
      title: 'Answer Submit Speed',
      description:
        'How fast did the candidate submit results after interview start?',
    },

    global_camera_over_mic: {
      title: 'Camera or Microphone',
      description: 'Did candidate select camera over microphone?',
    },

    text_writing_speed: {
      title: 'Writing Speed',
      description: 'How fast did candidate type while answering question?',
    },

    text_keywords: {
      title: 'Keywords',
      description: 'How many keywords did candidate use in answer?',
    },

    text_self_review: {
      title: 'Self Review',
      description: 'How many stars did candidate give himself after answer?',
    },

    text_did_skip_self_review: {
      title: 'Self Review Continue',
      description: 'Did candidate use continue button after self review?',
    },

    audio_face_emotions: {
      title: 'Face Emotions',
      description: 'Work in progress ...',
    },

    audio_talking_speed: {
      title: 'Talking Speed',
      description: 'How fast did candidate talk while answering question?',
    },

    audio_talking_pauses: {
      title: 'Talking Pauses',
      description:
        'How many percent of candidate answer was he talking without pause?',
    },

    audio_keywords: {
      title: 'Keywords',
      description: 'How many keywords did candidate use in answer?',
    },

    audio_self_review: {
      title: 'Self Review',
      description: 'How many stars did candidate give himself after answer?',
    },

    audio_did_skip_self_review: {
      title: 'Self Review Continue',
      description: 'Did candidate use continue button after self review?',
    },

    select_one_correct_option: {
      title: 'Select Correct One',
      description: 'Did candidate select correct option?',
    },

    select_one_did_skip: {
      title: 'Select Continue',
      description: 'Did candidate use continue button after answer?',
    },

    select_one_self_review: {
      title: 'Self Review',
      description: 'How many stars did candidate give himself after answer?',
    },

    select_one_did_skip_self_review: {
      title: 'Self Review Continue',
      description: 'Did candidate use continue button after self review?',
    },

    select_many_correct_option: {
      title: 'Select Correct Many',
      description: 'How many correct options did candidate select?',
    },

    select_many_did_skip: {
      title: 'Select Continue',
      description: 'Did candidate use continue button after answer?',
    },

    select_many_self_review: {
      title: 'Self Review',
      description: 'How many stars did candidate give himself after answer?',
    },

    select_many_did_skip_self_review: {
      title: 'Self Review Continue',
      description: 'Did candidate use continue button after self review?',
    },
  };

  return obj[medalId]
    ? obj[medalId]
    : {
        title: 'Unnamed medal',
        description: 'Medal not found.',
      };
}

function getVerboseAnswer(answerId) {
  if (answerId === 'text_answer') {
    return 'Text Answer';
  } else if (answerId === 'speak_answer') {
    return 'Speak Answer';
  } else if (answerId === 'select_one') {
    return 'Speak One Answer';
  }

  if (answerId === 'select_many') {
    return 'Speak Multiple Answer';
  }

  return 'Unknown Answer';
}

// firstInitData(data);
// initPage(can);
