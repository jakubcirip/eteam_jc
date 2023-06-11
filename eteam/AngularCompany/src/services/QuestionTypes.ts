import { GetSupportedLanguagesResponse } from './API';
import { QPLangsObject } from 'src/app/hr-job-position-form-editor/hr-job-position-form-editor.component';

declare const uuidv4: any;

export const FormEditorLangKeys = [
  'question_text_language',
  'question_mp4_beforetextlang',
  'question_mp4_aftertextlang',
  'question_mp3_beforetextlang',
  'question_mp3_aftertextlang',
  'answer_speak_language',
];

export class QuestionType {
  static TEXT = new QuestionType('Text Question', 'text_question');
  static IMAGE = new QuestionType('Image Question', 'image_question');
  static MP3 = new QuestionType('Audio Question', 'mp3_question');
  static MP4 = new QuestionType('Video Question', 'mp4_question');

  static ALL = [
    QuestionType.TEXT,
    QuestionType.IMAGE,
    QuestionType.MP3,
    QuestionType.MP4,
  ];

  static fromId(id: string): QuestionType {
    const target = QuestionType.ALL.find((t) => t.id === id);

    if (!target) {
      return null;
    }

    return target;
  }

  constructor(public verboseName: string, public id: string) {}
}

export class AnswerType {
  static TYPE = new AnswerType('Text Answer', 'text_answer');
  static SPEAK = new AnswerType('Microphone + Video', 'speak_answer');
  static SELECT_ONE = new AnswerType('Select One', 'select_one');
  static SELECT_MANY = new AnswerType('Select Multiple', 'select_many');

  static ALL = [
    AnswerType.TYPE,
    AnswerType.SPEAK,
    AnswerType.SELECT_ONE,
    AnswerType.SELECT_MANY,
  ];

  static fromId(id: string): AnswerType {
    const target = AnswerType.ALL.find((t) => t.id === id);

    if (!target) {
      return null;
    }

    return target;
  }

  constructor(public verboseName: string, public id: string) {}
}

export enum QuestionDataType {
  TEXT_INPUT,
  MP3_INPUT,
  MP4_INPUT,
  TIME_INPUT,
  TEXT_ARRAY_INPUT,
  SELECT_ONE_INPUT,
  SELECT_ONE_INPUT_INLINE,
  SELECT_MANY_INPUT,
  IMAGE_INPUT,
}

export class QuestionData {
  public type: QuestionDataType;
  public value: any;
  public displayValue: string;
  public title: string;
  public required: boolean;
  public isTemplate = false;
  public isSet = false;
  public data: any = {};

  constructor(title) {
    this.type = QuestionDataType.TEXT_INPUT;
    this.setTextValue('Put your question here..');
    this.required = true;
    this.title = title;
  }

  setTextValue(value: string) {
    this.value = value;
    this.displayValue = value;
  }

  setValue(id: string, name: string) {
    this.value = id;
    this.displayValue = name + ' (' + id + ')';
  }

  applyUpdateFunction() {
    if (this.data.joinInfo === 'selectAnswerRes') {
      this.data.onOtherChange = (self: QuestionData, other: QuestionData) => {
        console.log(self.data, other.data);
        if (
          self.data.joinInfo === 'selectAnswerRes' &&
          other.data.joinInfo === 'selectAnswerArr'
        ) {
          self.data.options = other.value;
        }
      };
    }
  }
}

export class Question {
  type: QuestionType;
  id: string;
  data: QuestionData[];

  constructor(private langObj: QPLangsObject) {
    this.setType(QuestionType.TEXT);
  }
  setType(type: QuestionType) {
    this.type = type;
    if (type === QuestionType.TEXT) {
      const qd = new QuestionData('Question Text');
      qd.type = QuestionDataType.TEXT_INPUT;
      qd.data = { type: 'question_text_message' };
      qd.setTextValue('Put your question here..');

      const qd2 = new QuestionData('Read Question Time');
      qd2.type = QuestionDataType.TIME_INPUT;
      qd2.data = { type: 'question_text_readtime' };
      qd2.displayValue = '5 seconds';
      qd2.value = '5';

      const qd3 = new QuestionData('Question Text Language');
      qd3.type = QuestionDataType.SELECT_ONE_INPUT_INLINE;
      qd3.displayValue = this.langObj.default.displayValue;
      qd3.value = this.langObj.default.value;
      qd3.data = {
        type: 'question_text_language',
        options: this.langObj.langs.map((l) => `${l.name} (${l.code})`),
      };
      qd3.applyUpdateFunction();

      this.data = [qd, qd2, qd3];
    } else if (type === QuestionType.IMAGE) {
      const qd = new QuestionData('Question Image Source');
      qd.type = QuestionDataType.IMAGE_INPUT;
      qd.data = { type: 'question_image_source' };
      qd.setTextValue('Select image file..');

      const qd2 = new QuestionData('Text Before Question');
      qd2.type = QuestionDataType.TEXT_INPUT;
      qd2.data = { type: 'question_image_beforetext', nullable: true };
      qd2.setTextValue('Enter text before question..');
      qd2.required = false;

      const qd3 = new QuestionData('Text After Question');
      qd3.type = QuestionDataType.TEXT_INPUT;
      qd3.data = { type: 'question_image_aftertext', nullable: true };
      qd3.setTextValue('Enter text after question..');
      qd3.required = false;

      const qd9 = new QuestionData('Read Question Before Time');
      qd9.type = QuestionDataType.TIME_INPUT;
      qd9.data = { type: 'question_text_readtime_before' };
      qd9.displayValue = '5 seconds';
      qd9.value = '5';

      const qd8 = new QuestionData('Read Question After Time');
      qd8.type = QuestionDataType.TIME_INPUT;
      qd8.data = { type: 'question_text_readtime_after' };
      qd8.displayValue = '5 seconds';
      qd8.value = '5';

      const qd4 = new QuestionData('Text Before Language');
      qd4.type = QuestionDataType.SELECT_ONE_INPUT_INLINE;
      qd4.displayValue = this.langObj.default.displayValue;
      qd4.value = this.langObj.default.value;
      qd4.data = {
        type: 'question_image_beforetextlang',
        options: this.langObj.langs.map((l) => `${l.name} (${l.code})`),
      };
      qd4.applyUpdateFunction();

      const qd5 = new QuestionData('Text After Language');
      qd5.type = QuestionDataType.SELECT_ONE_INPUT_INLINE;
      qd5.displayValue = this.langObj.default.displayValue;
      qd5.value = this.langObj.default.value;
      qd5.data = {
        type: 'question_image_aftertextlang',
        options: this.langObj.langs.map((l) => `${l.name} (${l.code})`),
      };
      qd5.applyUpdateFunction();

      this.data = [qd, qd2, qd4, qd3, qd5, qd8, qd9];
    } else if (type === QuestionType.MP3) {
      const qd = new QuestionData('Question MP3 Source');
      qd.type = QuestionDataType.MP3_INPUT;
      qd.data = { type: 'question_mp3_source' };
      qd.setTextValue('Select mp3 file..');

      const qd2 = new QuestionData('Text Before Question');
      qd2.type = QuestionDataType.TEXT_INPUT;
      qd2.data = { type: 'question_mp3_beforetext', nullable: true };
      qd2.setTextValue('Enter text before question..');
      qd2.required = false;

      const qd3 = new QuestionData('Text After Question');
      qd3.type = QuestionDataType.TEXT_INPUT;
      qd3.data = { type: 'question_mp3_aftertext', nullable: true };
      qd3.setTextValue('Enter text after question..');
      qd3.required = false;

      const qd9 = new QuestionData('Read Question Before Time');
      qd9.type = QuestionDataType.TIME_INPUT;
      qd9.data = { type: 'question_text_readtime_before' };
      qd9.displayValue = '5 seconds';
      qd9.value = '5';

      const qd8 = new QuestionData('Read Question After Time');
      qd8.type = QuestionDataType.TIME_INPUT;
      qd8.data = { type: 'question_text_readtime_after' };
      qd8.displayValue = '5 seconds';
      qd8.value = '5';

      const qd4 = new QuestionData('Text Before Language');
      qd4.type = QuestionDataType.SELECT_ONE_INPUT_INLINE;
      qd4.displayValue = this.langObj.default.displayValue;
      qd4.value = this.langObj.default.value;
      qd4.data = {
        type: 'question_mp3_beforetextlang',
        options: this.langObj.langs.map((l) => `${l.name} (${l.code})`),
      };
      qd4.applyUpdateFunction();

      const qd5 = new QuestionData('Text After Language');
      qd5.type = QuestionDataType.SELECT_ONE_INPUT_INLINE;
      qd5.displayValue = this.langObj.default.displayValue;
      qd5.value = this.langObj.default.value;
      qd5.data = {
        type: 'question_mp3_aftertextlang',
        options: this.langObj.langs.map((l) => `${l.name} (${l.code})`),
      };
      qd5.applyUpdateFunction();

      this.data = [qd, qd2, qd4, qd3, qd5, qd8, qd9];
    } else if (type === QuestionType.MP4) {
      const qd = new QuestionData('Question MP4 Source');
      qd.type = QuestionDataType.MP4_INPUT;
      qd.data = { type: 'question_mp4_source' };
      qd.setTextValue('Select mp4 file..');

      const qd2 = new QuestionData('Text Before Question');
      qd2.type = QuestionDataType.TEXT_INPUT;
      qd2.data = { type: 'question_mp4_beforetext', nullable: true };
      qd2.setTextValue('Enter text before question..');
      qd2.required = false;

      const qd3 = new QuestionData('Text After Question');
      qd3.type = QuestionDataType.TEXT_INPUT;
      qd3.data = { type: 'question_mp4_aftertext', nullable: true };
      qd3.setTextValue('Enter text after question..');
      qd3.required = false;

      const qd9 = new QuestionData('Read Question Before Time');
      qd9.type = QuestionDataType.TIME_INPUT;
      qd9.data = { type: 'question_text_readtime_before' };
      qd9.displayValue = '5 seconds';
      qd9.value = '5';

      const qd8 = new QuestionData('Read Question After Time');
      qd8.type = QuestionDataType.TIME_INPUT;
      qd8.data = { type: 'question_text_readtime_after' };
      qd8.displayValue = '5 seconds';
      qd8.value = '5';

      const qd4 = new QuestionData('Text Before Language');
      qd4.type = QuestionDataType.SELECT_ONE_INPUT_INLINE;
      qd4.displayValue = this.langObj.default.displayValue;
      qd4.value = this.langObj.default.value;
      qd4.data = {
        type: 'question_mp4_beforetextlang',
        options: this.langObj.langs.map((l) => `${l.name} (${l.code})`),
      };
      qd4.applyUpdateFunction();

      const qd5 = new QuestionData('Text After Language');
      qd5.type = QuestionDataType.SELECT_ONE_INPUT_INLINE;
      qd5.displayValue = this.langObj.default.displayValue;
      qd5.value = this.langObj.default.value;
      qd5.data = {
        type: 'question_mp4_aftertextlang',
        options: this.langObj.langs.map((l) => `${l.name} (${l.code})`),
      };
      qd5.applyUpdateFunction();

      this.data = [qd, qd2, qd4, qd3, qd5, qd8, qd9];
    }
  }
}

export class Answer {
  type: AnswerType;
  data: QuestionData[];

  constructor(private langObj: QPLangsObject) {
    this.setType(AnswerType.TYPE);
  }

  setType(type: AnswerType) {
    this.type = type;

    if (type === AnswerType.TYPE) {
      const qd = new QuestionData('Preparation Time');
      qd.type = QuestionDataType.TIME_INPUT;
      qd.data = { type: 'answer_type_preparationtime' };
      qd.displayValue = '5 seconds';
      qd.value = '5';

      const qd2 = new QuestionData('Keywords');
      qd2.type = QuestionDataType.TEXT_ARRAY_INPUT;
      qd2.data = { type: 'answer_type_keywords' };
      qd2.displayValue = 'Perfect,Great';
      qd2.value = ['Perfect', 'Great'];

      this.data = [qd, qd2];
    } else if (type === AnswerType.SPEAK) {
      const qd = new QuestionData('Preparation Time');
      qd.type = QuestionDataType.TIME_INPUT;
      qd.data = { type: 'answer_speak_preparationtime' };
      qd.displayValue = '5 seconds';
      qd.value = '5';

      const qd2 = new QuestionData('Keywords');
      qd2.type = QuestionDataType.TEXT_ARRAY_INPUT;
      qd2.data = { type: 'answer_speak_keywords' };
      qd2.displayValue = 'Perfect,Great';
      qd2.value = ['Perfect', 'Great'];

      const qd4 = new QuestionData('Answer speak Language');
      qd4.type = QuestionDataType.SELECT_ONE_INPUT_INLINE;
      qd4.displayValue = this.langObj.default.displayValue;
      qd4.value = this.langObj.default.value;
      qd4.data = {
        type: 'answer_speak_language',
        options: this.langObj.langs.map((l) => `${l.name} (${l.code})`),
      };
      qd4.applyUpdateFunction();

      this.data = [qd, qd2, qd4];
    } else if (type === AnswerType.SELECT_ONE) {
      const qd = new QuestionData('Possible Options');
      qd.type = QuestionDataType.TEXT_ARRAY_INPUT;
      qd.displayValue = 'Yes,No';
      qd.value = ['Yes', 'No'];
      qd.data = {
        joinInfo: 'selectAnswerArr',
        type: 'answer_selectone_options',
      };

      const qd2 = new QuestionData('Correct Option');
      qd2.type = QuestionDataType.SELECT_ONE_INPUT;
      qd2.displayValue = 'Yes';
      qd2.value = 'Yes';
      qd2.data = {
        joinInfo: 'selectAnswerRes',
        options: qd.value,
        type: 'answer_selectone_correct',
      };
      qd2.applyUpdateFunction();

      this.data = [qd, qd2];
    } else if (type === AnswerType.SELECT_MANY) {
      const qd = new QuestionData('Possible Options');
      qd.type = QuestionDataType.TEXT_ARRAY_INPUT;
      qd.displayValue = 'Yes,No,Maybe';
      qd.value = ['Yes', 'No', 'Maybe'];
      qd.data = {
        joinInfo: 'selectAnswerArr',
        type: 'answer_selectmany_options',
      };

      const qd2 = new QuestionData('Correct Options');
      qd2.type = QuestionDataType.SELECT_MANY_INPUT;
      qd2.displayValue = 'Yes';
      qd2.value = ['Yes'];
      qd2.data = {
        joinInfo: 'selectAnswerRes',
        options: qd.value,
        type: 'answer_selectmany_correct',
      };
      qd2.applyUpdateFunction();
      this.data = [qd, qd2];
    }
  }
}

export class QuestionPair {
  public name: string;
  public q: Question;
  public a: Answer;
  public uuid: string;

  public answerTime: number;

  constructor(langObj: QPLangsObject) {
    this.uuid = uuidv4();
    this.name = 'Question Pair Without Internal Name';
    this.q = new Question(langObj);
    this.a = new Answer(langObj);

    this.answerTime = 10;
  }
}
