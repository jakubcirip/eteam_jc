import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import API, {
  JobPositionForms,
  FormTemplate,
  HrCanEditJobFormularResponse,
  GetSupportedLanguagesResponse,
} from 'src/services/API';
import { Utils } from 'src/services/Utils';
import { Subscription } from 'rxjs';
import { SocketService } from '../socket.service';

declare var Swal: any;

@Component({
  selector: 'app-hr-job-positions-form',
  templateUrl: './hr-job-positions-form.component.html',
  styleUrls: ['./hr-job-positions-form.component.scss'],
})
export class HrJobPositionsFormComponent implements OnInit, OnDestroy {
  data: JobPositionForms;
  langs: GetSupportedLanguagesResponse['languages'];
  private positionId;

  socketType = 'positionsFormList';
  sub: Subscription;

  templateData: FormTemplate[] = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private socket: SocketService,
  ) {}

  newTemplateForm() {
    const templateObj = {};

    this.templateData.forEach((d) => {
      templateObj[d.id] = d.name;
    });

    Swal.mixin({
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2'],
    })
      .queue([
        {
          title: 'Enter template name',
          inputPlaceholder: 'Name',
          inputValue: name,
          input: 'text',
        },
        {
          title: 'Select Template',
          input: 'select',
          inputOptions: templateObj,
          inputPlaceholder: 'Select Teamplate',
        },
      ])
      .then(async (result) => {
        const [name, templateId] = result.value;

        const res = await Utils.sendRequest(
          'Create Template',
          API.addFormTemplates(
            this.positionId,
            {},
            {
              name,
              templateId: +templateId,
            },
          ),
        );

        if (res) {
          this.socket.change(this.socketType);
          this.reloadList();
        }
      });
  }

  async ngOnInit() {
    await this.reloadList();

    this.sub = this.socket.onChange.subscribe((type) => {
      if (type === this.socketType) {
        this.reloadList();
      }
    });
  }

  async ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  getLanguageVerbose(lang: string) {
    if (!this.langs) {
      return '';
    }

    const langObj = this.langs.find((l) => l.code === lang);
    if (!langObj) {
      return '';
    }
    return `${langObj.name} (${langObj.code})`;
  }

  async reloadList() {
    try {
      const positionId = this.route.snapshot.params.positionId;
      this.positionId = positionId;
      this.data = await API.getJobPositionForms(positionId);
      this.langs = (await API.getSupportedLanguages()).languages;

      this.templateData = (
        await API.getFormTemplates(this.positionId)
      ).templates;
    } catch (exp) {
      Swal.fire({
        type: 'error',
        title: 'Cant load data',
        text: Utils.getErrorMessage(exp),
      });
    }
  }

  newForm() {
    const obj = {};

    this.langs.forEach((l) => {
      obj[l.code] = `${l.name} (${l.code})`;
    });

    let templateName = '';
    let langCode = '';

    Swal.mixin({
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2'],
    })
      .queue([
        {
          title: 'Create new template',
          text:
            'Name your template, this is internal - only you will see this.',
          input: 'text',
          inputPlaceholder: 'Enter template name',
          preConfirm: (resData) => {
            templateName = resData;
          },
        },
        {
          title: 'Create new template',
          text:
            'Select default language for template, you can change specific question language later.',
          input: 'select',
          inputOptions: obj,
          inputPlaceholder: 'Select Language',

          showLoaderOnConfirm: true,
          preConfirm: (resData) => {
            langCode = resData;

            console.log(templateName, langCode);
            return API.addJobPositionForm(
              this.positionId,
              {},
              { name: templateName, langCode },
            )
              .then((data) => {
                return data;
              })
              .catch((err) => {
                Swal.showValidationMessage(
                  `Whoops! ${Utils.getErrorMessage(err)}`,
                );
              });
          },
          allowOutsideClick: () => !Swal.isLoading(),
        },
      ])
      .then((result) => {
        if (result.value) {
          Swal.fire({
            type: 'success',
            title: `Create new template`,
            text: result.value.message,
          });

          this.socket.change(this.socketType);
          this.reloadList();
        }
      });
  }

  async beforeEditForm(id, name, lang) {
    let canEdit = true;
    const res: HrCanEditJobFormularResponse = await Utils.sendRequestSilent(
      'Validate Template',
      API.hrCanEditJobFormular(this.positionId, id),
    );
    console.log(id, res);
    if (res) {
      canEdit = res.canEdit;
    }

    if (canEdit) {
      this.editForm(id, name, lang);
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Validate Template',
        text:
          'You cant edit template while it is being used by one or more of your active interviews. Wait for interview end please.',
      });
    }
  }

  editForm(id, name, lang) {
    const inputOptions = {};
    this.langs.forEach((l) => {
      inputOptions[l.code] = `${l.name} (${l.code})`;
    });

    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2'],
    })
      .queue([
        {
          title: 'Edit job template',
          input: 'text',
          inputValue: name,
          inputPlaceholder: 'Enter new template name',
        },
        {
          title: 'Edit job template',
          input: 'select',
          inputValue: lang,
          inputOptions,
          inputPlaceholder: 'Select new template languge',
        },
      ])
      .then(async (result) => {
        if (result.value) {
          const [newName, newLangCode] = result.value;

          const res: any = await Utils.sendRequest(
            'Edit job template',
            API.editJobPositionForm(
              this.positionId,
              {},
              {
                id,
                newName,
                newLangCode,
              },
            ),
          );
          if (res) {
            Swal.fire({
              type: 'success',
              title: `Edit job template`,
              text: res.message,
            });
            this.socket.change(this.socketType);
            this.reloadList();
          }
        }
      });
  }

  async beforeDeleteForm(id) {
    let canDelete = true;
    const res: HrCanEditJobFormularResponse = await Utils.sendRequestSilent(
      'Validate Template',
      API.hrCanEditJobFormular(this.positionId, id),
    );
    console.log(id, res);
    if (res) {
      canDelete = res.canDelete;
    }

    if (canDelete) {
      this.deleteForm(id);
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Validate Template',
        text:
          'You cant delete template while it is being used by one or more of your formulars. Edit or delete the formular in the first place.',
      });
    }
  }

  deleteForm(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'If you delete this template, its permanent!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return API.deleteJobPositionForm(this.positionId, {}, { id })
          .then((data) => {
            return data;
          })
          .catch((err) => {
            Swal.showValidationMessage(`Whoops! ${Utils.getErrorMessage(err)}`);
          });
      },
    }).then((result) => {
      if (result.value) {
        Swal.fire('Deleted!', result.value.message, 'success');

        this.socket.change(this.socketType);
        this.reloadList();
      }
    });
  }

  async beforeMoveIntoForm(id) {
    let canEdit = true;
    const res: HrCanEditJobFormularResponse = await Utils.sendRequestSilent(
      'Validate Template',
      API.hrCanEditJobFormular(this.positionId, id),
    );
    console.log(id, res);
    if (res) {
      canEdit = res.canEdit;
    }

    if (canEdit) {
      this.moveIntoForm(id);
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Validate Template',
        text:
          'You cant edit template while it is being used by one or more of your active interviews. Wait for interview end please.',
      });
    }
  }

  async beforeMoveIntoMedal(id) {
    let canEdit = true;
    const res: HrCanEditJobFormularResponse = await Utils.sendRequestSilent(
      'Validate Template',
      API.hrCanEditJobFormular(this.positionId, id),
    );
    console.log(id, res);
    if (res) {
      canEdit = res.canEdit;
    }

    if (canEdit) {
      this.moveIntoMedal(id);
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Validate Template',
        text:
          'You cant edit template while it is being used by one or more of your active interviews. Wait for interview end please.',
      });
    }
  }

  moveIntoForm(id) {
    Swal.close();
    const jobId = this.route.snapshot.params.positionId;
    this.router.navigate(['/hr', 'jobs', jobId, 'templates', id, 'editor']);
  }

  moveIntoMedal(id) {
    Swal.close();
    const jobId = this.route.snapshot.params.positionId;
    this.router.navigate(['/hr', 'jobs', jobId, 'templates', id, 'medals']);
  }

  goBack() {
    this.router.navigate(['/hr', 'jobs']);
  }
}
