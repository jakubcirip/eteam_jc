var data = {
  intTag: 'wxFjn7hY',
  intName: 'Nazov',
  questions: [
    {
      uuid: '05994f29-dab0-460b-8abd-41b2661f32b1',
      name: 'text text',
      q: {
        type: {
          verboseName: 'Text Question',
          id: 'text_question',
        },
        data: [
          {
            isTemplate: true,
            isSet: true,
            data: {
              type: 'question_text_message',
            },
            type: 0,
            value: 'What projects have you been workin on this year?',
            displayValue: 'What projects have you been workin on this year?',
            required: true,
            title: 'Question Text',
          },
          {
            isTemplate: true,
            isSet: false,
            data: {
              type: 'question_text_readtime',
            },
            type: 3,
            value: '5',
            displayValue: '5 seconds',
            required: true,
            title: 'Read Question Time',
          },
          {
            isTemplate: true,
            isSet: false,
            data: {
              type: 'question_text_language',
            },
            type: 6,
            value: 'en-GB',
            displayValue: 'English (United Kingdom) (en-GB)',
            required: true,
            title: 'Question Text Language',
          },
        ],
      },
      a: {
        type: {
          verboseName: 'Text Answer',
          id: 'text_answer',
        },
        data: [
          {
            isTemplate: false,
            isSet: false,
            data: {
              type: 'answer_type_preparationtime',
            },
            type: 3,
            value: '5',
            displayValue: '5 seconds',
            required: true,
            title: 'Preparation Time',
          },
          {
            isTemplate: false,
            isSet: false,
            data: {
              type: 'answer_type_keywords',
            },
            type: 4,
            value: ['Perfect', 'Great'],
            displayValue: 'Perfect,Great',
            required: true,
            title: 'Keywords',
          },
        ],
      },
      answerTime: 10,
    },
    {
      uuid: 'e26766be-7565-4070-a2e2-dc34a04b3244',
      name: 'Mp4 SelectOne',
      q: {
        type: {
          verboseName: 'Video Question',
          id: 'mp4_question',
        },
        data: [
          {
            isTemplate: true,
            isSet: true,
            data: {
              type: 'question_mp4_source',
            },
            type: 2,
            value: 'OHFoD9Wx',
            displayValue: 'Najnovsie mp4 (OHFoD9Wx)',
            required: true,
            title: 'Question MP4 Source',
          },
          {
            isTemplate: true,
            isSet: true,
            data: {
              type: 'question_mp4_beforetext',
            },
            type: 0,
            value: 'Watch Closly',
            displayValue: 'Watch Closly',
            required: true,
            title: 'Text Before Question',
          },
          {
            isTemplate: true,
            isSet: false,
            data: {
              type: 'question_mp4_beforetextlang',
            },
            type: 6,
            value: 'en-GB',
            displayValue: 'English (United Kingdom) (en-GB)',
            required: true,
            title: 'Text Before Language',
          },
          {
            isTemplate: true,
            isSet: true,
            data: {
              type: 'question_mp4_aftertext',
            },
            type: 0,
            value: 'How old is he?',
            displayValue: 'How old is he?',
            required: true,
            title: 'Text After Question',
          },
          {
            isTemplate: true,
            isSet: false,
            data: {
              type: 'question_mp4_aftertextlang',
            },
            type: 6,
            value: 'en-GB',
            displayValue: 'English (United Kingdom) (en-GB)',
            required: true,
            title: 'Text After Language',
          },
          {
            isTemplate: true,
            isSet: false,
            data: {
              type: 'question_text_readtime_after',
            },
            type: 3,
            value: '5',
            displayValue: '5 seconds',
            required: true,
            title: 'Read Question After Time',
          },
          {
            isTemplate: true,
            isSet: false,
            data: {
              type: 'question_text_readtime_before',
            },
            type: 3,
            value: '5',
            displayValue: '5 seconds',
            required: true,
            title: 'Read Question Before Time',
          },
        ],
      },
      a: {
        type: {
          verboseName: 'Select One',
          id: 'select_one',
        },
        data: [
          {
            isTemplate: false,
            isSet: false,
            data: {
              joinInfo: 'selectAnswerArr',
              type: 'answer_selectone_options',
            },
            type: 4,
            value: ['15 years', '18 years', '20 years', '13 years'],
            displayValue: '15 years, 18 years, 20 years, 13 years',
            required: true,
            title: 'Possible Options',
          },
          {
            isTemplate: false,
            isSet: true,
            data: {
              joinInfo: 'selectAnswerRes',
              options: ['Man', 'Woman', 'Other'],
              type: 'answer_selectone_correct',
            },
            type: 5,
            value: '20 years',
            displayValue: '20 years',
            required: true,
            title: 'Correct Option',
          },
        ],
      },
      answerTime: 10,
    },
    {
      uuid: 'd008c710-f67b-45a1-9c92-a366d02aa95a',
      name: 'Mp3 select many',
      q: {
        type: {
          verboseName: 'Audio Question',
          id: 'mp3_question',
        },
        data: [
          {
            isTemplate: true,
            isSet: true,
            data: {
              type: 'question_mp3_source',
            },
            type: 1,
            value: 'MirGzaLo',
            displayValue: 'Najnovsi (MirGzaLo)',
            required: true,
            title: 'Question MP3 Source',
          },
          {
            isTemplate: true,
            isSet: true,
            data: {
              type: 'question_mp3_beforetext',
            },
            type: 0,
            value: 'Listen please.',
            displayValue: 'Listen please.',
            required: true,
            title: 'Text Before Question',
          },
          {
            isTemplate: true,
            isSet: false,
            data: {
              type: 'question_mp3_beforetextlang',
            },
            type: 6,
            value: 'en-GB',
            displayValue: 'English (United Kingdom) (en-GB)',
            required: true,
            title: 'Text Before Language',
          },
          {
            isTemplate: true,
            isSet: true,
            data: {
              type: 'question_mp3_aftertext',
            },
            type: 0,
            value: 'What is his gender?',
            displayValue: 'What is his gender?',
            required: true,
            title: 'Text After Question',
          },
          {
            isTemplate: true,
            isSet: false,
            data: {
              type: 'question_mp3_aftertextlang',
            },
            type: 6,
            value: 'en-GB',
            displayValue: 'English (United Kingdom) (en-GB)',
            required: true,
            title: 'Text After Language',
          },
          {
            isTemplate: true,
            isSet: false,
            data: {
              type: 'question_text_readtime_after',
            },
            type: 3,
            value: '5',
            displayValue: '5 seconds',
            required: true,
            title: 'Read Question After Time',
          },
          {
            isTemplate: true,
            isSet: false,
            data: {
              type: 'question_text_readtime_before',
            },
            type: 3,
            value: '5',
            displayValue: '5 seconds',
            required: true,
            title: 'Read Question Before Time',
          },
        ],
      },
      a: {
        type: {
          verboseName: 'Select Multiple',
          id: 'select_many',
        },
        data: [
          {
            isTemplate: false,
            isSet: false,
            data: {
              joinInfo: 'selectAnswerArr',
              type: 'answer_selectmany_options',
            },
            type: 4,
            value: ['Man', 'Woman', 'Other'],
            displayValue: 'Man, Woman, Other',
            required: true,
            title: 'Possible Options',
          },
          {
            isTemplate: false,
            isSet: false,
            data: {
              joinInfo: 'selectAnswerRes',
              options: ['Man', 'Woman', 'Other'],
              type: 'answer_selectmany_correct',
            },
            type: 7,
            value: ['Yes', 'Man', 'Other'],
            displayValue: 'Yes, Man, Other',
            required: true,
            title: 'Correct Options',
          },
        ],
      },
      answerTime: 10,
    },
    {
      uuid: 'c0289c90-e5ef-4aaf-85e0-adf1dcddc73f',
      name: 'Text Speak',
      q: {
        type: {
          verboseName: 'Text Question',
          id: 'text_question',
        },
        data: [
          {
            isTemplate: false,
            isSet: true,
            data: {
              type: 'question_text_message',
            },
            type: 0,
            value: 'Can you say voice?',
            displayValue: 'Can you say voice?',
            required: true,
            title: 'Question Text',
          },
          {
            isTemplate: false,
            isSet: false,
            data: {
              type: 'question_text_readtime',
            },
            type: 3,
            value: '5',
            displayValue: '5 seconds',
            required: true,
            title: 'Read Question Time',
          },
          {
            isTemplate: false,
            isSet: false,
            data: {
              type: 'question_text_language',
            },
            type: 6,
            value: 'en-GB',
            displayValue: 'English (United Kingdom) (en-GB)',
            required: true,
            title: 'Question Text Language',
          },
        ],
      },
      a: {
        type: {
          verboseName: 'Microphone + Video',
          id: 'speak_answer',
        },
        data: [
          {
            isTemplate: false,
            isSet: false,
            data: {
              type: 'answer_speak_preparationtime',
            },
            type: 3,
            value: '5',
            displayValue: '5 seconds',
            required: true,
            title: 'Preparation Time',
          },
          {
            isTemplate: false,
            isSet: false,
            data: {
              type: 'answer_speak_keywords',
            },
            type: 4,
            value: ['voice', 'cucumber', 'cheap', 'money'],
            displayValue: 'voice, cucumber, cheap, money',
            required: true,
            title: 'Keywords',
          },
          {
            isTemplate: false,
            isSet: true,
            data: {
              type: 'answer_speak_language',
            },
            type: 6,
            value: 'en-GB',
            displayValue: 'English (United Kingdom) (en-GB)',
            required: true,
            title: 'Answer speak Language',
          },
        ],
      },
      answerTime: 10,
    },
  ],
  failedCandidates: [],
  candidates: [
    {
      id: '9999999',
      name: 'Interview Preview Results',
      email: 'interviewpreview@hiroo.eu',
      tag: 'h7nCxOef',
      medalsData: {
        answers: [
          {
            uuid: '05994f29-dab0-460b-8abd-41b2661f32b1',
            response: {
              data: {
                wordsPerMinute: 9,
                value: 'asdadssa',
                type: 'type',
              },
              rating: 4,
              didSkipRating: true,
            },
          },
          {
            uuid: 'e26766be-7565-4070-a2e2-dc34a04b3244',
            response: {
              data: {
                didSkipManually: true,
                value: '15 years',
                type: 'select-one',
              },
              rating: 3,
              didSkipRating: true,
            },
          },
          {
            uuid: 'd008c710-f67b-45a1-9c92-a366d02aa95a',
            response: {
              data: {
                didSkipManually: true,
                value: ['Man', 'Woman', 'Other'],
                type: 'select-many',
              },
              rating: 3,
              didSkipRating: true,
            },
          },
          {
            uuid: 'c0289c90-e5ef-4aaf-85e0-adf1dcddc73f',
            response: {
              data: {
                value:
                type: 'speak',
              },
              rating: 5,
              didSkipRating: true,
            },
          },
        ],
        submitAt: 1598788245439,
        intTag: 'wxFjn7hY',
        userTag: 'h7nCxOef',
        isHardwareWorking: true,
        interviewType: 'cam',
        name: 'Matej',
        surname: 'Baco',
        email: 'matejbacocom@gmail.com',
        nickname: 'Meldiron',
        phone: '+421 919 178 798',
        id: 'c1fa18ee-e4f5-4120-b994-5c0d89769ec6',
      },
      answersData: {
        sttObj: {
          type: 'mp4',
          data: {
            '05994f29-dab0-460b-8abd-41b2661f32b1': {},
            'e26766be-7565-4070-a2e2-dc34a04b3244': {},
            'd008c710-f67b-45a1-9c92-a366d02aa95a': {},
            'c0289c90-e5ef-4aaf-85e0-adf1dcddc73f': {
              results: [
                {
                  alternatives: [
                    {
                      words: [
                        {
                          startTime: {
                            seconds: '0',
                            nanos: 0,
                          },
                          endTime: {
                            seconds: '2',
                            nanos: 300000000,
                          },
                          word: 'money',
                          speakerTag: 0,
                        },
                        {
                          startTime: {
                            seconds: '2',
                            nanos: 300000000,
                          },
                          endTime: {
                            seconds: '3',
                            nanos: 500000000,
                          },
                          word: 'money',
                          speakerTag: 0,
                        },
                        {
                          startTime: {
                            seconds: '3',
                            nanos: 500000000,
                          },
                          endTime: {
                            seconds: '4',
                            nanos: 900000000,
                          },
                          word: 'money',
                          speakerTag: 0,
                        },
                      ],
                      transcript: 'money money money',
                      confidence: 0.9209878444671631,
                    },
                  ],
                  channelTag: 0,
                },
              ],
            },
          },
        },
        faceRecon: {
          data: {
            '05994f29-dab0-460b-8abd-41b2661f32b1': {},
            'e26766be-7565-4070-a2e2-dc34a04b3244': {},
            'd008c710-f67b-45a1-9c92-a366d02aa95a': {},
            'c0289c90-e5ef-4aaf-85e0-adf1dcddc73f': {
              joy: 7,
              sorrow: 7,
              anger: 7,
              surprise: 7,
              underExposed: 7,
              blurred: 7,
              headwear: 10,
            },
          },
        },
        baseTotal: -1,
        total: -1,
        global: {
          global_camera_over_mic: {
            result: 4,
            base: 1,
            isBoolean: true,
            medal: 'blue',
          },
          global_answer_submit_speed: {
            result: 360,
            base: 72,
            isBoolean: false,
            medal: 'gold',
          },
        },
        answers: {
          '05994f29-dab0-460b-8abd-41b2661f32b1': {
            text_writing_speed: {
              result: 54,
              base: 9,
              isBoolean: false,
              medal: 'gold',
            },
            text_keywords: {
              result: 0,
              base: 0,
              isBoolean: false,
              medal: 'gold',
            },
            text_self_review: {
              result: 24,
              base: 4,
              isBoolean: false,
              medal: 'gold',
            },
            text_did_skip_self_review: {
              result: 2,
              base: 1,
              isBoolean: true,
              medal: 'blue',
            },
          },
          'e26766be-7565-4070-a2e2-dc34a04b3244': {
            select_one_correct_option: {
              result: 0,
              base: 0,
              isBoolean: false,
              medal: 'gold',
            },
            select_one_did_skip: {
              result: 2,
              base: 1,
              isBoolean: true,
              medal: 'blue',
            },
            select_one_self_review: {
              result: 18,
              base: 3,
              isBoolean: false,
              medal: 'gold',
            },
            select_one_did_skip_self_review: {
              result: 2,
              base: 1,
              isBoolean: true,
              medal: 'blue',
            },
          },
          'd008c710-f67b-45a1-9c92-a366d02aa95a': {
            select_many_correct_option: {
              result: 12,
              base: 2,
              isBoolean: false,
              medal: 'gold',
            },
            select_many_did_skip: {
              result: 2,
              base: 1,
              isBoolean: true,
              medal: 'blue',
            },
            select_many_self_review: {
              result: 18,
              base: 3,
              isBoolean: false,
              medal: 'gold',
            },
            select_many_did_skip_self_review: {
              result: 2,
              base: 1,
              isBoolean: true,
              medal: 'blue',
            },
          },
          'c0289c90-e5ef-4aaf-85e0-adf1dcddc73f': {
            audio_face_emotions: {
              result: 0,
              base: 0,
              isBoolean: false,
              medal: 'gold',
            },
            audio_talking_speed: {
              result: 0,
              base: 0,
              isBoolean: false,
              medal: 'gold',
            },
            audio_talking_pauses: {
              result: 0,
              base: 0,
              isBoolean: false,
              medal: 'gold',
            },
            audio_keywords: {
              result: 0,
              base: 0,
              isBoolean: false,
              medal: 'gold',
            },
            audio_self_review: {
              result: 30,
              base: 5,
              isBoolean: false,
              medal: 'gold',
            },
            audio_did_skip_self_review: {
              result: 2,
              base: 1,
              isBoolean: true,
              medal: 'blue',
            },
          },
        },
        submitAt: 1598788245439,
        intTag: 'wxFjn7hY',
        userTag: 'h7nCxOef',
        isHardwareWorking: true,
        interviewType: 'cam',
        name: 'Matej',
        surname: 'Baco',
        email: 'matejbacocom@gmail.com',
        nickname: 'Meldiron',
        phone: '+421 919 178 798',
        id: 'c1fa18ee-e4f5-4120-b994-5c0d89769ec6',
      },
      percentage: 100,
    },
  ],
  allGlobalMedals: ['global_camera_over_mic', 'global_answer_submit_speed'],
  allAnswerMedsls: {
    '05994f29-dab0-460b-8abd-41b2661f32b1': [
      'text_writing_speed',
      'text_keywords',
      'text_self_review',
      'text_did_skip_self_review',
    ],
    'e26766be-7565-4070-a2e2-dc34a04b3244': [
      'select_one_correct_option',
      'select_one_did_skip',
      'select_one_self_review',
      'select_one_did_skip_self_review',
    ],
    'd008c710-f67b-45a1-9c92-a366d02aa95a': [
      'select_many_correct_option',
      'select_many_did_skip',
      'select_many_self_review',
      'select_many_did_skip_self_review',
    ],
    'c0289c90-e5ef-4aaf-85e0-adf1dcddc73f': [
      'audio_face_emotions',
      'audio_talking_speed',
      'audio_talking_pauses',
      'audio_keywords',
      'audio_self_review',
      'audio_did_skip_self_review',
    ],
  },
};

var can = {
  id: '9999999',
  name: 'Interview Preview Results',
  email: 'interviewpreview@hiroo.eu',
  tag: 'h7nCxOef',
  medalsData: {
    answers: [
      {
        uuid: '05994f29-dab0-460b-8abd-41b2661f32b1',
        response: {
          data: {
            wordsPerMinute: 9,
            value: 'asdadssa',
            type: 'type',
          },
          rating: 4,
          didSkipRating: true,
        },
      },
      {
        uuid: 'e26766be-7565-4070-a2e2-dc34a04b3244',
        response: {
          data: {
            didSkipManually: true,
            value: '15 years',
            type: 'select-one',
          },
          rating: 3,
          didSkipRating: true,
        },
      },
      {
        uuid: 'd008c710-f67b-45a1-9c92-a366d02aa95a',
        response: {
          data: {
            didSkipManually: true,
            value: ['Man', 'Woman', 'Other'],
            type: 'select-many',
          },
          rating: 3,
          didSkipRating: true,
        },
      },
      {
        uuid: 'c0289c90-e5ef-4aaf-85e0-adf1dcddc73f',
        response: {
          data: {
            value:
            type: 'speak',
          },
          rating: 5,
          didSkipRating: true,
        },
      },
    ],
    submitAt: 1598788245439,
    intTag: 'wxFjn7hY',
    userTag: 'h7nCxOef',
    isHardwareWorking: true,
    interviewType: 'cam',
    name: 'Matej',
    surname: 'Baco',
    email: 'matejbacocom@gmail.com',
    nickname: 'Meldiron',
    phone: '+421 919 178 798',
    id: 'c1fa18ee-e4f5-4120-b994-5c0d89769ec6',
  },
  answersData: {
    sttObj: {
      type: 'mp4',
      data: {
        '05994f29-dab0-460b-8abd-41b2661f32b1': {},
        'e26766be-7565-4070-a2e2-dc34a04b3244': {},
        'd008c710-f67b-45a1-9c92-a366d02aa95a': {},
        'c0289c90-e5ef-4aaf-85e0-adf1dcddc73f': {
          results: [
            {
              alternatives: [
                {
                  words: [
                    {
                      startTime: {
                        seconds: '0',
                        nanos: 0,
                      },
                      endTime: {
                        seconds: '2',
                        nanos: 300000000,
                      },
                      word: 'money',
                      speakerTag: 0,
                    },
                    {
                      startTime: {
                        seconds: '2',
                        nanos: 300000000,
                      },
                      endTime: {
                        seconds: '3',
                        nanos: 500000000,
                      },
                      word: 'money',
                      speakerTag: 0,
                    },
                    {
                      startTime: {
                        seconds: '3',
                        nanos: 500000000,
                      },
                      endTime: {
                        seconds: '4',
                        nanos: 900000000,
                      },
                      word: 'money',
                      speakerTag: 0,
                    },
                  ],
                  transcript: 'money money money',
                  confidence: 0.9209878444671631,
                },
              ],
              channelTag: 0,
            },
          ],
        },
      },
    },
    faceRecon: {
      data: {
        '05994f29-dab0-460b-8abd-41b2661f32b1': {},
        'e26766be-7565-4070-a2e2-dc34a04b3244': {},
        'd008c710-f67b-45a1-9c92-a366d02aa95a': {},
        'c0289c90-e5ef-4aaf-85e0-adf1dcddc73f': {
          joy: 7,
          sorrow: 7,
          anger: 7,
          surprise: 7,
          underExposed: 7,
          blurred: 7,
          headwear: 10,
        },
      },
    },
    baseTotal: -1,
    total: -1,
    global: {
      global_camera_over_mic: {
        result: 4,
        base: 1,
        isBoolean: true,
        medal: 'blue',
      },
      global_answer_submit_speed: {
        result: 360,
        base: 72,
        isBoolean: false,
        medal: 'gold',
      },
    },
    answers: {
      '05994f29-dab0-460b-8abd-41b2661f32b1': {
        text_writing_speed: {
          result: 54,
          base: 9,
          isBoolean: false,
          medal: 'gold',
        },
        text_keywords: {
          result: 0,
          base: 0,
          isBoolean: false,
          medal: 'gold',
        },
        text_self_review: {
          result: 24,
          base: 4,
          isBoolean: false,
          medal: 'gold',
        },
        text_did_skip_self_review: {
          result: 2,
          base: 1,
          isBoolean: true,
          medal: 'blue',
        },
      },
      'e26766be-7565-4070-a2e2-dc34a04b3244': {
        select_one_correct_option: {
          result: 0,
          base: 0,
          isBoolean: false,
          medal: 'gold',
        },
        select_one_did_skip: {
          result: 2,
          base: 1,
          isBoolean: true,
          medal: 'blue',
        },
        select_one_self_review: {
          result: 18,
          base: 3,
          isBoolean: false,
          medal: 'gold',
        },
        select_one_did_skip_self_review: {
          result: 2,
          base: 1,
          isBoolean: true,
          medal: 'blue',
        },
      },
      'd008c710-f67b-45a1-9c92-a366d02aa95a': {
        select_many_correct_option: {
          result: 12,
          base: 2,
          isBoolean: false,
          medal: 'gold',
        },
        select_many_did_skip: {
          result: 2,
          base: 1,
          isBoolean: true,
          medal: 'blue',
        },
        select_many_self_review: {
          result: 18,
          base: 3,
          isBoolean: false,
          medal: 'gold',
        },
        select_many_did_skip_self_review: {
          result: 2,
          base: 1,
          isBoolean: true,
          medal: 'blue',
        },
      },
      'c0289c90-e5ef-4aaf-85e0-adf1dcddc73f': {
        audio_face_emotions: {
          result: 0,
          base: 0,
          isBoolean: false,
          medal: 'gold',
        },
        audio_talking_speed: {
          result: 0,
          base: 0,
          isBoolean: false,
          medal: 'gold',
        },
        audio_talking_pauses: {
          result: 0,
          base: 0,
          isBoolean: false,
          medal: 'gold',
        },
        audio_keywords: {
          result: 0,
          base: 0,
          isBoolean: false,
          medal: 'gold',
        },
        audio_self_review: {
          result: 30,
          base: 5,
          isBoolean: false,
          medal: 'gold',
        },
        audio_did_skip_self_review: {
          result: 2,
          base: 1,
          isBoolean: true,
          medal: 'blue',
        },
      },
    },
    submitAt: 1598788245439,
    intTag: 'wxFjn7hY',
    userTag: 'h7nCxOef',
    isHardwareWorking: true,
    interviewType: 'cam',
    name: 'Matej',
    surname: 'Baco',
    email: 'matejbacocom@gmail.com',
    nickname: 'Meldiron',
    phone: '+421 919 178 798',
    id: 'c1fa18ee-e4f5-4120-b994-5c0d89769ec6',
  },
  percentage: 100,
};