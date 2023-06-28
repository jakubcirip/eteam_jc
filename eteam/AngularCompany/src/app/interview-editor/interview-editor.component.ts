import { Component, OnInit } from '@angular/core';
import API, {
  InterviewData,
  InterviewSettingsForms,
  MailType,
  GetHrInterviewImagesResponse,
} from 'src/services/API';
import { Router, ActivatedRoute } from '@angular/router';
import { Utils } from 'src/services/Utils';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

declare var Swal: any;
declare var $: any;

@Component({
  selector: 'app-interview-editor',
  templateUrl: './interview-editor.component.html',
  styleUrls: ['./interview-editor.component.scss'],
})
export class InterviewEditorComponent implements OnInit {
  public Math = Math;

  data: InterviewData = null;
  dataDynamic: InterviewData = null;
  formData: InterviewSettingsForms[] = [];
  id: number;
  images: GetHrInterviewImagesResponse['images'] = [];

  apiUrl = environment.api;

  totalSetupSteps = 0;
  totalFinished = 0;

  maxImages = 4;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private DomSanitizationService: DomSanitizer,
  ) {}

  loadMoreImages() {
    this.maxImages += 4;
  }

  async onSelectBackgroundImage(
    img: GetHrInterviewImagesResponse['images'][number],
  ) {
    $('#backgrounds-modal').modal('hide');
    setTimeout(async () => {
      const res = await Utils.sendRequest(
        'Select Background image',
        API.setHrInterviewImage(
          this.id,
          {},
          {
            data: img.name,
            type: img.type,
          },
        ),
      );

      if (res) {
        this.reloadList();
      }
    }, 100);
  }

  generatePreviewUrl() {
    const url = this.getImageUrl(this.data.basicData.image);
    return this.DomSanitizationService.bypassSecurityTrustUrl(url);
  }

  openImagePreview() {
    $('#preview-background-modal').modal('show');
  }

  async editImage() {
    const { value: option } = await Swal.fire({
      title: 'Select image type',
      text:
        'Select what kind of image do you want to use on your interview page.',
      input: 'select',
      inputOptions: {
        provided: 'Provided by Unsplash',
        custom: 'Upload your own image',
        externalUrl: 'Enter image URL',
      },
      inputPlaceholder: 'Select type',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (!value) {
            resolve('You need to select some type.');
          } else {
            resolve();
          }
        });
      },
    });

    if (option === 'provided') {
      this.maxImages = 4;
      setTimeout(() => {
        $('#backgrounds-modal').modal('show');
      }, 100);
    } else if (option === 'externalUrl') {
      const { value: name } = await Swal.fire({
        title: 'Enter image URL',
        text:
          'Please keep in mind, this image may stop working when owner of external image decides to remove it.',
        input: 'text',
        inputPlaceholder: 'Enter external URL',
      });

      if (name) {
        const res = await Utils.sendRequest(
          'File Upload',
          API.setHrInterviewImage(
            this.id,
            {},
            {
              type: 'externalUrl',
              data: name,
            },
          ),
        );

        if (res) {
          this.reloadList();
        }
      }
    } else if (option === 'custom') {
      const { value: file } = await Swal.fire({
        title: 'Select image File',
        input: 'file',
        inputAttributes: {
          accept: 'image/x-png,image/gif,image/jpeg',
          'aria-label': 'Upload your image File',
        },
      });

      if (file) {
        const reader = new FileReader();
        reader.onload = async (e: any) => {
          const data = e.target.result;

          const res = await Utils.sendRequest(
            'File Upload',
            API.setHrInterviewImage(
              this.id,
              {},
              {
                type: 'customImage',
                data,
              },
            ),
          );

          if (res) {
            this.reloadList();
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  async editColor() {
    const { value: color } = await Swal.fire({
      title: 'Select interview page color',
      input: 'select',
      inputOptions: {
        blue: 'Blue',
        purple: 'Purple',
        orange: 'Orange',
        red: 'Red',
      },
      inputValue: this.data.basicData.color,
      inputPlaceholder: 'Select color',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (!value) {
            resolve('You need to select some color.');
          } else {
            resolve();
          }
        });
      },
    });

    if (color) {
      const res = await Utils.sendRequestToast(
        'Interview Color',
        API.setHrInterviewColor(
          this.id,
          {},
          {
            color,
          },
        ),
      );

      if (res) {
        this.reloadList();
      }
    }
  }

  shortImageData(data: string) {
    if (data.length < 55) {
      return data;
    }

    return data.substring(0, 50) + '...';
  }

  getImageUrl(data: string) {
    if (data.startsWith('apiurl:')) {
      return environment.api + '/public/backgrounds/' + data.substring(7);
    } else if (data.startsWith('externalUrl:')) {
      return data.substring(12);
    } else if (data.startsWith('customImage:')) {
      return data.substring(12);
    }

    return data;
  }

  async ngOnInit() {
    await this.reloadList();
  }

  async reloadList() {
    try {
      this.id = +this.route.snapshot.params.intId;
      this.data = await API.getHrInterview(this.id.toString());
      this.images = (await API.getHrInterviewImages()).images;

      this.data.types = this.data.types.filter((t) => {
        if (t.usages.includes('normal')) {
          return true;
        }
        return false;
      });

      this.dataDynamic = { ...this.data };

      if (this.data.basicData.posId) {
        this.selectPosId(this.data.basicData.posId);
      } else {
        this.formData = [];
      }

      this.totalSetupSteps = 0;
      this.totalFinished = 0;

      this.data.types.forEach((t) => {
        const d = this.getAdvancedData(t.name);
        if (t.staticDate) {
          this.totalSetupSteps++;
          if (d && d.date !== null) {
            this.totalFinished++;
          }
        }

        this.totalSetupSteps++;
        if (d && d.mailId !== null) {
          this.totalFinished++;
        }
      });

      this.totalSetupSteps += 3;
      if (this.data.basicData.posId) {
        this.totalFinished++;
      }
      if (this.data.basicData.formId) {
        this.totalFinished++;
      }
      if (this.data.basicData.prelog) {
        this.totalFinished++;
      }
    } catch (exp) {
      Swal.fire({
        type: 'error',
        title: 'Cant load data',
        text: Utils.getErrorMessage(exp),
      });
    }
  }

  async onSwitchBackgroundColor() {
    const currentVal = this.data.basicData.dark;
    const newVal = !currentVal;

    const res = await Utils.sendRequest(
      'Select Background color',
      API.setHrInterviewBackgroundColor(
        this.id,
        {},
        {
          isDark: newVal,
        },
      ),
    );

    if (res) {
      this.reloadList();
    }
  }

  async onCustomWeight(medal: any) {
    const { value: newVal } = await Swal.fire({
      title: 'Enter Custom Medal Weight',
      input: 'number',
      inputValue: medal.weight,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!';
        }

        if (isNaN(value)) {
          return 'Weight must be a number!';
        }
      },
    });

    if (newVal) {
      medal.weight = +newVal;
    }
  }

  onRangeChange(newVal: string, medal: any) {
    medal.weight = +newVal;
  }

  getAdvancedData(type: string) {
    const data = this.data.advancedData.find((d) => {
      return d.type === type;
    });

    if (data == null) {
      return null;
    }

    return data;
  }

  getColor(type: string, data = null) {
    if (type === 'pos-pos') {
      return this.data.basicData.posId ? 'color-yes' : 'color-no';
    }

    if (type === 'prelog') {
      return this.data.basicData.prelog ? 'color-yes' : 'color-no';
    }

    if (type === 'pos-form') {
      return this.data.basicData.formId ? 'color-yes' : 'color-no';
    }

    if (type === 'pos-all') {
      return this.data.basicData.posId && this.data.basicData.formId
        ? 'color-yes'
        : 'color-no';
    }

    if (type === 'advanced-email') {
      const aData = this.getAdvancedData(data.name);

      if (!aData) {
        return 'color-no';
      }

      if (!aData.mailId || aData.mailId === -1) {
        return 'color-no';
      }

      return 'color-yes';
    }

    if (type === 'advanced-date') {
      const aData = this.getAdvancedData(data.name);

      if (!aData) {
        return 'color-no';
      }

      if (!aData.date || aData.date === '-1') {
        return 'color-no';
      }

      return 'color-yes';
    }

    if (type === 'advanced-all') {
      const aData = this.getAdvancedData(data.name);

      if (!aData) {
        return 'color-no';
      }

      if (!aData.mailId || aData.mailId === -1) {
        return 'color-no';
      }

      const isStatic = this.data.types.find((t) => t.name === data.name)
        .staticDate;

      if (isStatic) {
        if (!aData.date || aData.date === '-1') {
          return 'color-no';
        }
      }

      return 'color-yes';
    }

    return 'color-wtf';
  }

  async onEmailChange(typeObj: MailType, e) {
    const type = typeObj.name;
    const mailId = +e.target.value;

    await Utils.sendRequestToast(
      'Job Interview Mail',
      API.editHrInterviewEmail(
        this.id.toString(),
        {},
        {
          emailId: mailId,
          type,
        },
      ),
    );

    this.reloadList();
  }

  isSelected(id: number, type: string) {
    const data = this.data.advancedData.find((d) => {
      return d.type === type;
    });

    if (!data) {
      if (id === -1) {
        return true;
      }

      return false;
    }

    if (data.mailId === null) {
      if (id === -1) {
        return true;
      }

      return false;
    }

    if (data.mailId === id) {
      return true;
    }

    return false;
  }

  async onDateChange(typeObj: MailType, e) {
    const type = typeObj.name;
    const newVal = e.value;

    await Utils.sendRequestToast(
      'Job Interview Date',
      API.editHrInterviewDate(
        this.id.toString(),
        {},
        {
          date: newVal,
          type,
        },
      ),
    );

    this.reloadList();
  }

  async onPosChange(id: number) {
    await Utils.sendRequestToast(
      'Job Position Settings',
      API.editHrInterviewPosition(
        this.id.toString(),
        {},
        {
          formId: -1,
          posId: id,
        },
      ),
    );

    this.reloadList();
  }

  async onFormChange(id: number) {
    await Utils.sendRequestToast(
      'Job Position Settings',
      API.editHrInterviewPosition(
        this.id.toString(),
        {},
        {
          posId: this.data.basicData.posId,
          formId: id,
        },
      ),
    );

    this.reloadList();
  }

  selectPosId(id: number) {
    this.formData = this.data.settings.jobs.positions.find(
      (p) => p.id === id,
    ).forms;
  }

  getDate(type: string) {
    const data = this.data.advancedData.find((d) => d.type === type);

    if (!data) {
      return null;
    }

    return data.date;
  }

  getMails(type: string) {
    const data = this.data.settings.emails.find((d) => d.type === type);

    if (!data) {
      return null;
    }

    return data.values;
  }

  editInt() {
    Swal.fire({
      title: 'Edit interview name',
      input: 'text',
      inputValue: this.data.basicData.name,
      inputPlaceholder: 'Enter interview name',
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: (newName) => {
        return API.editHrInterview({}, { id: this.id, name: newName })
          .then((data) => {
            return data;
          })
          .catch((err) => {
            Swal.showValidationMessage(`Whoops! ${Utils.getErrorMessage(err)}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          type: 'success',
          title: `Edit interview`,
          text: result.value.message,
        });

        this.reloadList();
      }
    });
  }

  async onSavePrelog(e: any) {
    const txt = e.value;

    await Utils.sendRequestToast(
      'Job Position Settings',
      API.editHrInterviewPrelog(
        this.id,
        {},
        {
          prelog: txt,
        },
      ),
    );

    this.reloadList();
  }

  goBack() {
    this.router.navigate(['/hr', 'interview']);
  }
}
