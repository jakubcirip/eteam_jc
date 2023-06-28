import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/services/Utils';
import API, {
  MailsResponse,
  MailType,
  HrCanEditEmailResponse,
} from 'src/services/API';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs';

declare var Swal: any;

@Component({
  selector: 'app-hr-emails',
  templateUrl: './hr-emails.component.html',
  styleUrls: ['./hr-emails.component.scss'],
})
export class HrEmailsComponent implements OnInit, OnDestroy {
  emails: any;
  types: any = {};

  socketType = 'emailsList';
  sub: Subscription;

  constructor(private router: Router, private socket: SocketService) {}

  async ngOnInit() {
    await this.reloadList();
    await this.fetchTypes();

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

  async reloadList() {
    try {
      this.emails = await API.getHrEmails();
    } catch (exp) {
      Swal.fire({
        type: 'error',
        title: 'Cant load data',
        text: Utils.getErrorMessage(exp),
      });
    }
  }

  async fetchTypes() {
    try {
      const data = await API.getHrEmailTypes();
      const types = data.types;

      this.types = {};
      types.forEach((type) => {
        this.types[type.name] = type.title;
      });
    } catch (exp) {
      Swal.fire({
        type: 'error',
        title: 'Cant load data',
        text: Utils.getErrorMessage(exp),
      });
    }
  }

  newEmail() {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2'],
    })
      .queue([
        {
          title: 'Enter new e-mail name',
          inputPlaceholder: 'Name',
        },
        {
          title: 'Enter e-mail type',
          input: 'select',
          inputOptions: this.types,
        },
      ])
      .then(async (result) => {
        if (result.value) {
          const [name, type] = result.value;

          await Utils.sendRequest(
            'Create new e-mail',
            API.addHrEmail({}, { name, type }),
          );

          this.socket.change(this.socketType);
          this.reloadList();
        }
      });
  }

  async beforeEditEmail(id, name, type) {
    let canEdit = true;
    const res: HrCanEditEmailResponse = await Utils.sendRequestSilent(
      'Validate Email',
      API.hrCanEditEmail(id),
    );
    console.log(id, res);
    if (res) {
      canEdit = res.canEdit;
    }

    if (canEdit) {
      this.editEmail(id, name, type);
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Validate Email',
        text:
          'You cant edit email while it is being used by one or more of your active interviews. Wait for interview end please.',
      });
    }
  }

  editEmail(id, name, type) {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2'],
    })
      .queue([
        {
          title: 'Enter new e-mail name',
          inputPlaceholder: 'Name',
          inputValue: name,
        },
        {
          title: 'Enter e-mail type',
          input: 'select',
          inputOptions: this.types,
          inputValue: type,
        },
      ])
      .then(async (result) => {
        if (result.value) {
          const [resName, resType] = result.value;

          if (resName !== name || resType !== type) {
            await Utils.sendRequest(
              'Edit e-mail',
              API.editHrEmail(id, {}, { name: resName, type: resType }),
            );

            this.socket.change(this.socketType);
            this.reloadList();
          } else {
            Swal.fire({
              type: 'info',
              title: 'Edit e-mail',
              text: 'Nothing changed',
            });
          }
        }
      });
  }

  async beforeDeleteEmail(id) {
    let canDelete = true;
    const res: HrCanEditEmailResponse = await Utils.sendRequestSilent(
      'Validate Email',
      API.hrCanEditEmail(id),
    );
    console.log(id, res);
    if (res) {
      canDelete = res.canDelete;
    }

    if (canDelete) {
      this.deleteEmail(id);
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Validate Email',
        text:
          'You cant delete email while it is being used by one or more of your interviews. Edit or delete the interview in the first place.',
      });
    }
  }

  deleteEmail(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'If you delete this email, its permanent!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return API.deleteHrEmail(id)
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

  async beforeMoveIntoEmail(id) {
    let canEdit = true;
    const res: HrCanEditEmailResponse = await Utils.sendRequestSilent(
      'Validate Email',
      API.hrCanEditEmail(id),
    );
    console.log(id, res);
    if (res) {
      canEdit = res.canEdit;
    }

    if (canEdit) {
      this.moveIntoEmail(id);
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Validate Email',
        text:
          'You cant edit email while it is being used by one or more of your active interviews. Wait for interview end please.',
      });
    }
  }

  moveIntoEmail(id) {
    Swal.close();
    this.router.navigate(['/hr', 'emails', id, 'edit']);
  }
}
