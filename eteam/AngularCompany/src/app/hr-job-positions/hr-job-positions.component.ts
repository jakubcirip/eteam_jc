import { Component, OnInit, OnDestroy } from '@angular/core';
import API, { HrCanEditJobPositionResponse } from 'src/services/API';
import { Utils } from 'src/services/Utils';
import { Router } from '@angular/router';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs';

declare var Swal: any;

@Component({
  selector: 'app-hr-job-positions',
  templateUrl: './hr-job-positions.component.html',
  styleUrls: ['./hr-job-positions.component.scss'],
})
export class HrJobPositionsComponent implements OnInit, OnDestroy {
  positions = [];

  socketType = 'positionsList';
  sub: Subscription;

  constructor(private router: Router, private socket: SocketService) {}

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

  async reloadList() {
    try {
      this.positions = (await API.getJobPositions()).positions;
    } catch (exp) {
      Swal.fire({
        type: 'error',
        title: 'Cant load data',
        text: Utils.getErrorMessage(exp),
      });
    }
  }

  newPosition() {
    Swal.fire({
      title: 'Create new job position',
      input: 'text',
      inputPlaceholder: 'Enter job position name',
      showCancelButton: true,
      confirmButtonText: 'Create',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        return API.addJobPosition(
          {},
          {
            name,
          },
        )
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
          title: `Create new position`,
          text: result.value.message,
        });

        this.socket.change(this.socketType);
        this.reloadList();
      }
    });
  }

  async beforeEditPos(id, name) {
    let canEdit = true;
    const res: HrCanEditJobPositionResponse = await Utils.sendRequestSilent(
      'Validate Job Position',
      API.hrCanEditJobPosition(id),
    );
    console.log(id, res);
    if (res) {
      canEdit = res.canEdit;
    }

    if (canEdit) {
      this.editPos(id, name);
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Validate Job Position',
        text:
          'You edit delete job position while it contains formulars which are being used in an active interview. Wait for interview to end.',
      });
    }
  }

  editPos(id, name) {
    Swal.fire({
      title: 'Edit job position',
      input: 'text',
      inputValue: name,
      inputPlaceholder: 'Enter position name',
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: (newName) => {
        return API.editJobPosition({}, { id, newName })
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
          title: `Edit job position`,
          text: result.value.message,
        });

        this.socket.change(this.socketType);
        this.reloadList();
      }
    });
  }

  async beforeDeletePos(id) {
    let canDelete = true;
    const res: HrCanEditJobPositionResponse = await Utils.sendRequestSilent(
      'Validate Job Position',
      API.hrCanEditJobPosition(id),
    );
    console.log(id, res);
    if (res) {
      canDelete = res.canDelete;
    }

    if (canDelete) {
      this.deletePos(id);
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Validate Job Position',
        text:
          'You cant delete job position while it contains formulars which are being used in interview. Edit or delete the interview in the first place.',
      });
    }
  }

  deletePos(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'If you delete this job position, its permanent!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return API.deleteJobPosition({}, { id })
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

  moveIntoPos(id) {
    this.router.navigate(['/hr', 'jobs', id, 'templates']);
  }
}
