import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  QuestionPair,
  Question,
  QuestionType,
  QuestionDataType,
  QuestionData,
  AnswerType,
  Answer,
  FormEditorLangKeys,
} from 'src/services/QuestionTypes';
import API, {
  Mp3Array,
  Mp4Array,
  JobPositionForm,
  GetSupportedLanguagesResponse,
  ImgArray,
} from 'src/services/API';
import { Utils } from 'src/services/Utils';
import { environment } from 'src/environments/environment';

declare var Swal: any;
declare var document: any;
declare const $: any;

export interface QPLangsObject {
  default: {
    value: string;
    displayValue: string;
  };

  langs: GetSupportedLanguagesResponse['languages'];
}

@Component({
  selector: 'app-hr-job-position-form-editor',
  templateUrl: './hr-job-position-form-editor.component.html',
  styleUrls: ['./hr-job-position-form-editor.component.scss'],
})
export class HrJobPositionFormEditorComponent implements OnInit {
  apiUrl = environment.api;
  get QuestionDataType() {
    return QuestionDataType;
  }

  data: { pairs: QuestionPair[] } = null;
  name: string = null;
  medalCats = null;
  langsObj: QPLangsObject = null;

  mp3: Mp3Array = [];
  mp4: Mp4Array = [];
  img: ImgArray = [];

  didChange = false;
  saveText = null;

  modalEditing = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  onSelectManyCheckbox(el: any, val: string, aData: any) {
    if (el.checked) {
      // add
      if (!aData.value.includes(val)) {
        aData.value.push(val);
        this.onUpdateArr(aData);
      }
    } else {
      // remove
      if (aData.value.includes(val)) {
        const i = aData.value.indexOf(val);
        aData.value.splice(i, 1);
        this.onUpdateArr(aData);
      }
    }
  }

  forceQuestionDataUpdate(self) {
    // self je to, co sa upravilo

    this.data.pairs.forEach((p) => {
      p.a.data.forEach((d) => {
        if (d.data.onOtherChange) {
          d.data.onOtherChange(d, self);
        }
      });
    });
  }

  onUpdateArr(aData) {
    this.doChange();
    aData.displayValue = aData.value.join(', ');
    aData.isTemplate = false;
    this.forceQuestionDataUpdate(aData);
  }

  onRemoveFromArray(aData: any, arr: any[], i: number) {
    arr.splice(i, 1);
    this.onUpdateArr(aData);
  }

  onMoveFromArray(aData: any, arr: any[], i: number, dir: number) {
    if (dir === 1) {
      if (i >= arr.length - 1) {
        return;
      }

      const tmp = arr[i + 1];
      arr[i + 1] = arr[i];
      arr[i] = tmp;
    } else if (dir === -1) {
      if (i <= 0) {
        return;
      }

      const tmp = arr[i - 1];
      arr[i - 1] = arr[i];
      arr[i] = tmp;
    }

    this.onUpdateArr(aData);
  }

  onEditFromArray(aData: any, rowIndex: string) {
    if (this.modalEditing.includes(rowIndex)) {
      this.modalEditing.splice(this.modalEditing.indexOf(rowIndex), 1);
    } else {
      this.modalEditing.push(rowIndex);
    }

    this.onUpdateArr(aData);

    this.onAutoFocusArray(rowIndex + '-input');
  }

  onAnswerArraySave(
    e: any,
    aData: any,
    arr: any[],
    i: number,
    newVal: string,
    rowIndex: string,
  ) {
    e.preventDefault();
    arr[i] = newVal;

    if (this.modalEditing.includes(rowIndex)) {
      this.modalEditing.splice(this.modalEditing.indexOf(rowIndex), 1);
    }

    this.onUpdateArr(aData);
  }

  onAutoFocusArray(id: string) {
    setTimeout(() => {
      document.getElementById(id).focus();
    }, 0);
  }

  onAddFromArray(aData: any, rowIndex: string, arr: any[]) {
    arr.push('');
    rowIndex += '-' + (arr.length - 1);
    this.onEditFromArray(aData, rowIndex);

    this.onUpdateArr(aData);

    this.onAutoFocusArray(rowIndex + '-input');
  }

  async ngOnInit() {
    const posId = this.route.snapshot.params.positionId;
    const formId = this.route.snapshot.params.formId;

    const [data, mp3, mp4, langs, img] = await Promise.all([
      API.getJobPositionForm(posId, formId),
      API.getMp3(),
      API.getMp4(),
      API.getSupportedLanguages(),
      API.getImg(),
    ]);

    this.medalCats = data.medalCategories;
    this.data = JSON.parse(data.data);

    const langObj = langs.languages.find(
      (l) => l.code === data.defaultLanguage,
    );

    this.langsObj = {
      default: {
        value: langObj.code,
        displayValue: `${langObj.name} (${langObj.code})`,
      },
      langs: langs.languages,
    };

    this.data.pairs = this.data.pairs.map((p) => {
      const qp = new QuestionPair(this.langsObj);
      qp.answerTime = p.answerTime;

      qp.name = p.name;
      if (p.uuid) {
        qp.uuid = p.uuid;
      }

      const a = new Answer(this.langsObj);
      a.type = p.a.type;
      a.data = p.a.data;

      const q = new Question(this.langsObj);
      q.type = p.q.type;
      q.data = p.q.data.map((pd) => {
        const qd = new QuestionData(pd.title);

        qd.isSet = pd.isSet;
        qd.displayValue = pd.displayValue;
        qd.type = pd.type;
        qd.value = pd.value;
        qd.isTemplate = pd.isTemplate;
        qd.data = pd.data ? pd.data : {};

        if (FormEditorLangKeys.includes(pd.data.type)) {
          qd.data.options = this.langsObj.langs.map(
            (l) => `${l.name} (${l.code})`,
          );
        }

        qd.applyUpdateFunction();

        return qd;
      });

      a.data = p.a.data.map((pd) => {
        const qd = new QuestionData(pd.title);

        qd.isSet = pd.isSet;
        qd.displayValue = pd.displayValue;
        qd.type = pd.type;
        qd.value = pd.value;
        qd.data = pd.data ? pd.data : {};

        qd.applyUpdateFunction();

        return qd;
      });

      qp.a = a;
      qp.q = q;

      return qp;
    });

    this.name = data.name;
    this.mp3 = mp3;
    this.img = img;
    this.mp4 = mp4;
  }

  moveUp(i: number) {
    if (i === 0) {
      return;
    }

    this.moveAnim(i, i - 1, 0);

    setTimeout(() => {
      const old = this.data.pairs[i - 1];
      this.data.pairs[i - 1] = this.data.pairs[i];
      this.data.pairs[i] = old;
      this.moveAnim(i, i - 1, 1);

      this.doChange();
    }, 500);
  }

  moveAnim(i, i2, opacity) {
    const currentDiv = document.getElementById('qp-' + i);
    const oldDiv = document.getElementById('qp-' + i2);
    const divs = [currentDiv, oldDiv];

    divs.forEach((d) => {
      d.style.opacity = opacity;
    });
  }

  moveDown(i: number) {
    if (i >= this.data.pairs.length - 1) {
      return;
    }

    this.moveAnim(i, i + 1, 0);

    setTimeout(() => {
      const old = this.data.pairs[i + 1];
      this.data.pairs[i + 1] = this.data.pairs[i];
      this.data.pairs[i] = old;

      this.moveAnim(i, i + 1, 1);
      this.doChange();
    }, 500);
  }

  async save() {
    const posId = this.route.snapshot.params.positionId;
    const formId = this.route.snapshot.params.formId;

    const newData = JSON.parse(JSON.stringify(this.data));

    console.log(newData);

    newData.pairs = newData.pairs.map((p) => {
      delete p.q.langObj;
      delete p.a.langObj;

      p.q.data = p.q.data.map((qd) => {
        if (FormEditorLangKeys.includes(qd.data.type)) {
          delete qd.data.options;
        }

        return qd;
      });

      return p;
    });

    this.saveText = 'Saving..';

    await Utils.sendRequest(
      'Template save',
      API.editJobPositionFormData(
        posId,
        formId,
        {},
        { data: JSON.stringify(newData) },
      ),
    );

    this.leavePage();

    this.saveText = null;
    this.didChange = false;
  }

  doChange() {
    this.didChange = true;

    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
    });
    Toast.fire({
      type: 'success',
      title: 'Changes applied',
    });
  }

  drop() {}

  leavePage() {
    const jobId = this.route.snapshot.params.positionId;
    this.router.navigate(['/hr', 'jobs', jobId, 'templates']);
  }

  goBack() {
    this.leavePage();
  }

  onExpand(i) {
    const className = '.qp-' + i;

    $(className).slideToggle(500, () => {});
  }

  newPair() {
    this.data.pairs.push(new QuestionPair(this.langsObj));
    this.doChange();
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1);
  }

  getMp3NameById(id: string): string {
    return this.mp3.find((mp3Data) => {
      return mp3Data.id === id;
    }).name;
  }

  getImgNameById(id: string): string {
    return this.img.find((mp3Data) => {
      return mp3Data.id === id;
    }).name;
  }

  getMp4NameById(id: string): string {
    return this.mp4.find((mp4Data) => {
      return mp4Data.id === id;
    }).name;
  }

  removeQuestionPair(i: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will remove the question pair!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.value !== undefined) {
        this.data.pairs.splice(i, 1);
        this.doChange();
      }
    });
  }

  editQuestionType(qp: QuestionPair) {
    Swal.fire({
      title: 'Select New Question Type',
      input: 'select',
      inputOptions: {
        [QuestionType.TEXT.id]: QuestionType.TEXT.verboseName,
        [QuestionType.IMAGE.id]: QuestionType.IMAGE.verboseName,
        [QuestionType.MP3.id]: QuestionType.MP3.verboseName,
        [QuestionType.MP4.id]: QuestionType.MP4.verboseName,
      },
      inputPlaceholder: 'Select New Type',
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        if (!name) {
          Swal.showValidationMessage(`Please select new question type`);
          return;
        }

        return name;
      },
    }).then((result) => {
      if (result.value !== undefined) {
        qp.q.setType(QuestionType.fromId(result.value));
        this.doChange();
      }
    });
  }

  editAnswerType(qp: QuestionPair) {
    Swal.fire({
      title: 'Select New Answer Type',
      input: 'select',
      inputOptions: {
        [AnswerType.TYPE.id]: AnswerType.TYPE.verboseName,
        [AnswerType.SPEAK.id]: AnswerType.SPEAK.verboseName,
        [AnswerType.SELECT_ONE.id]: AnswerType.SELECT_ONE.verboseName,
        [AnswerType.SELECT_MANY.id]: AnswerType.SELECT_MANY.verboseName,
      },
      inputPlaceholder: 'Select New Type',
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        if (!name) {
          Swal.showValidationMessage(`Please select new answer type`);
          return;
        }

        return name;
      },
    }).then((result) => {
      if (result.value !== undefined) {
        qp.a.setType(AnswerType.fromId(result.value));
        this.doChange();
      }
    });
  }

  setToNullQuestionData(qd: QuestionData) {
    qd.setTextValue('NULL');
    qd.isSet = true;
    qd.isTemplate = false;
    this.doChange();
  }

  editQuestionData(qd: QuestionData) {
    if (qd.type === QuestionDataType.TEXT_INPUT) {
      Swal.fire({
        title: 'Enter new ' + qd.title,
        input: 'text',
        inputPlaceholder: qd.value,
        showCancelButton: true,
        confirmButtonText: 'Save',
        showLoaderOnConfirm: true,
        preConfirm: (name) => {
          if (!name && qd.required) {
            Swal.showValidationMessage(`Please enter new ${qd.title}`);
            return;
          }

          return name;
        },
      }).then((result) => {
        if (result.value !== undefined) {
          qd.setTextValue(result.value);
          qd.isSet = true;
          qd.isTemplate = false;
          this.doChange();
        }
      });
    } else if (qd.type === QuestionDataType.TEXT_ARRAY_INPUT) {
      Swal.fire({
        title: 'Enter new ' + qd.title,
        text: 'Separate options with commas.',
        input: 'text',
        inputPlaceholder: qd.value,
        showCancelButton: true,
        confirmButtonText: 'Save',
        showLoaderOnConfirm: true,
        preConfirm: (name) => {
          if (!name && qd.required) {
            return null;
            // Swal.showValidationMessage(`Please enter new ${qd.title}`);
            // return;
          }

          return name;
        },
      }).then((result) => {
        if (result.value !== undefined) {
          if (result.value === null) {
            qd.value = [];
            qd.displayValue = 'None';
          } else {
            const arr = result.value.split(',');
            qd.value = arr;
            qd.displayValue = arr.join(',');
          }

          qd.isSet = true;
          qd.isTemplate = false;
          this.doChange();
        }
      });
    } else if (qd.type === QuestionDataType.TIME_INPUT) {
      Swal.fire({
        title: 'Enter new ' + qd.title,
        input: 'number',
        inputPlaceholder: qd.value,
        showCancelButton: true,
        confirmButtonText: 'Save',
        showLoaderOnConfirm: true,
        preConfirm: (name) => {
          if (!name && qd.required) {
            Swal.showValidationMessage(`Please enter new ${qd.title}`);
            return;
          }

          return name;
        },
      }).then((result) => {
        if (result.value !== undefined) {
          const val = +result.value;

          qd.value = val.toString();

          if (val === 1) {
            qd.displayValue = val + ' second';
          } else {
            qd.displayValue = val + ' seconds';
          }

          qd.isSet = true;
          qd.isTemplate = false;
          this.doChange();
        }
      });
    } else if (qd.type === QuestionDataType.SELECT_ONE_INPUT) {
      const options = {};

      qd.data.options.forEach((o, i) => {
        options[`o${i}`] = o;
      });

      Swal.fire({
        title: 'Select new ' + qd.title,
        input: 'radio',
        inputOptions: options,
        inputValue: qd.displayValue,
        inputPlaceholder: 'Select Option',
        showCancelButton: true,
        confirmButtonText: 'Save',
        showLoaderOnConfirm: true,
        preConfirm: (name) => {
          if (!name && qd.required) {
            Swal.showValidationMessage(`Please select new ${qd.title}`);
            return;
          }

          return name;
        },
      }).then((result) => {
        if (result.value !== undefined) {
          const val = result.value;
          const index = +val.split('o').join('');
          const option = qd.data.options[index];

          qd.value = option;
          qd.isTemplate = false;
          qd.displayValue = option;
          qd.isSet = true;
          this.doChange();
        }
      });
    } else if (qd.type === QuestionDataType.SELECT_ONE_INPUT_INLINE) {
      const obj = {};

      this.langsObj.langs.forEach((lang) => {
        obj[lang.code] = `${lang.name} (${lang.code})`;
      });

      Swal.fire({
        title: 'Select new ' + qd.title,
        input: 'select',
        inputOptions: obj,
        inputValue: qd.value,
        inputPlaceholder: 'Select Option',
        showCancelButton: true,
        confirmButtonText: 'Save',
        showLoaderOnConfirm: true,
        preConfirm: (name) => {
          if (!name && qd.required) {
            Swal.showValidationMessage(`Please select new ${qd.title}`);
            return;
          }

          return name;
        },
      }).then((result) => {
        if (result.value !== undefined) {
          const val = result.value;
          const langObj = this.langsObj.langs.find((l) => l.code === val);
          qd.value = langObj.code;
          qd.displayValue = `${langObj.name} (${langObj.code})`;
          qd.isSet = true;
          qd.isTemplate = false;
          this.doChange();
        }
      });
    } else if (qd.type === QuestionDataType.MP3_INPUT) {
      const selectData = {};

      this.mp3.forEach((mp3Data) => {
        selectData[mp3Data.id] = mp3Data.name + ' (' + mp3Data.id + ')';
      });

      Swal.fire({
        title: 'Select new ' + qd.title,
        input: 'select',
        inputOptions: selectData,
        inputPlaceholder: qd.value,
        showCancelButton: true,
        confirmButtonText: 'Save',
        showLoaderOnConfirm: true,
        preConfirm: (name) => {
          if (!name && qd.required) {
            Swal.showValidationMessage(`Please enter new ${qd.title}`);
            return;
          }

          return name;
        },
      }).then((result) => {
        if (result.value !== undefined) {
          qd.setValue(result.value, this.getMp3NameById(result.value));
          qd.isSet = true;
          qd.isTemplate = false;
          this.doChange();
        }
      });
    } else if (qd.type === QuestionDataType.IMAGE_INPUT) {
      const selectData = {};

      this.img.forEach((imgData) => {
        selectData[imgData.id] = imgData.name + ' (' + imgData.id + ')';
      });

      Swal.fire({
        title: 'Select new ' + qd.title,
        input: 'select',
        inputOptions: selectData,
        inputPlaceholder: qd.value,
        showCancelButton: true,
        confirmButtonText: 'Save',
        showLoaderOnConfirm: true,
        preConfirm: (name) => {
          if (!name && qd.required) {
            Swal.showValidationMessage(`Please enter new ${qd.title}`);
            return;
          }

          return name;
        },
      }).then((result) => {
        if (result.value !== undefined) {
          qd.setValue(result.value, this.getImgNameById(result.value));
          qd.isSet = true;
          qd.isTemplate = false;
          this.doChange();
        }
      });
    } else if (qd.type === QuestionDataType.MP4_INPUT) {
      const selectData = {};

      this.mp4.forEach((mp4Data) => {
        selectData[mp4Data.id] = mp4Data.name + ' (' + mp4Data.id + ')';
      });

      Swal.fire({
        title: 'Select new ' + qd.title,
        input: 'select',
        inputOptions: selectData,
        inputPlaceholder: qd.value,
        showCancelButton: true,
        confirmButtonText: 'Save',
        showLoaderOnConfirm: true,
        preConfirm: (name) => {
          if (!name && qd.required) {
            Swal.showValidationMessage(`Please enter new ${qd.title}`);
            return;
          }

          return name;
        },
      }).then((result) => {
        if (result.value !== undefined) {
          qd.setValue(result.value, this.getMp4NameById(result.value));
          qd.isSet = true;
          qd.isTemplate = false;
          this.doChange();
        }
      });
    }
  }

  editBasicTime(qp: QuestionPair, type: string) {
    const title = 'Enter new Answer time';

    Swal.fire({
      title,
      input: 'number',
      inputPlaceholder: qp[type],
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        if (!name) {
          Swal.showValidationMessage(`Please ${title}`);
          return;
        }

        return name;
      },
    }).then((result) => {
      if (result.value !== undefined) {
        qp[type] = result.value;
        this.doChange();
      }
    });
  }

  editQuestionPairName(qp: QuestionPair) {
    Swal.fire({
      title: 'Enter new Question Pair Name',
      input: 'text',
      inputPlaceholder: qp.name,
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        if (!name) {
          Swal.showValidationMessage(`Please enter new question pair name`);
          return;
        }

        return name;
      },
    }).then((result) => {
      if (result.value !== undefined) {
        qp.name = result.value;
        this.doChange();
      }
    });
  }
}
