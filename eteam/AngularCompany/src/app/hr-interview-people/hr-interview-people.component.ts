import { Component, OnInit, OnDestroy } from '@angular/core';
import API, { HrCanEditPersonResponse } from 'src/services/API';
import { Router } from '@angular/router';
import { Utils } from 'src/services/Utils';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs';

declare var Swal: any;

@Component({
  selector: 'app-hr-interview-people',
  templateUrl: './hr-interview-people.component.html',
  styleUrls: ['./hr-interview-people.component.scss'],
})
export class HrInterviewPeopleComponent implements OnInit, OnDestroy {
  people: any[] = null;

  socketType = 'peopleList';
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
      this.people = (await API.getInterviewPeopleForAdding()).people;
    } catch (exp) {
      Swal.fire({
        type: 'error',
        title: 'Cant load data',
        text: Utils.getErrorMessage(exp),
      });
    }
  }

  addPerson() {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2'],
    })
      .queue([
        {
          title: 'Enter new person full name',
          inputPlaceholder: 'Name Surname',
        },
        {
          title: 'Enter new person email',
          inputPlaceholder: 'email@domain.com',
        },
      ])
      .then(async (result) => {
        if (result.value) {
          const [name, email] = result.value;

          await Utils.sendRequest(
            'Add new person',
            API.addInterviewPerson(
              {},
              {
                name,
                email,
              },
            ),
          );

          this.socket.change(this.socketType);
          this.reloadList();
        }
      });
  }

  async beforeEditPerson(id, name, email) {
    let canEdit = true;
    const res: HrCanEditPersonResponse = await Utils.sendRequestSilent(
      'Validate Candidate',
      API.hrCanEditPerson(id),
    );
    console.log(id, res);
    if (res) {
      canEdit = res.canEdit;
    }

    if (canEdit) {
      this.editPerson(id, name, email);
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Validate Candidate',
        text: 'You cant edit person while he is attending an interview.',
      });
    }
  }

  editPerson(id, name, email) {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2'],
    })
      .queue([
        {
          title: 'Enter new person full name',
          inputPlaceholder: 'Name Surname',
          inputValue: name,
        },
        {
          title: 'Enter new person email',
          inputPlaceholder: 'email@domain.com',
          inputValue: email,
        },
      ])
      .then(async (result) => {
        if (result.value) {
          const [newName, newEmail] = result.value;

          await Utils.sendRequest(
            'Edit person',
            API.editInterviewPerson(
              id,
              {},
              {
                name: newName,
                email: newEmail,
              },
            ),
          );

          this.socket.change(this.socketType);
          this.reloadList();
        }
      });
  }

  async beforeDeletePerson(id) {
    let canDelete = true;
    const res: HrCanEditPersonResponse = await Utils.sendRequestSilent(
      'Validate Candidate',
      API.hrCanEditPerson(id),
    );
    console.log(id, res);
    if (res) {
      canDelete = res.canDelete;
    }

    if (canDelete) {
      this.deletePerson(id);
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Validate Candidate',
        text: 'You cant delete person while he going to attend an interview.',
      });
    }
  }

  deletePerson(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'If you delete this person its permanent!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return API.deleteInterviewPerson({}, { id })
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

  /*
  newPosition() {
    Swal.fire({
      title: 'Add new person',
      input: 'text',
      inputPlaceholder: 'Enter job position name',
      showCancelButton: true,
      confirmButtonText: 'Create',
      showLoaderOnConfirm: true,
      preConfirm: name => {
        return API.addJobPosition(
          {},
          {
            name,
          },
        )
          .then(data => {
            return data;
          })
          .catch(err => {
            Swal.showValidationMessage(`Whoops! ${Utils.getErrorMessage(err)}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(result => {
      if (result.value) {
        Swal.fire({
          type: 'success',
          title: `Create new position`,
          text: result.value.message,
        });

        this.fetchPositions();
      }
    });
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
      preConfirm: newName => {
        return API.editJobPosition({}, { id, newName })
          .then(data => {
            return data;
          })
          .catch(err => {
            Swal.showValidationMessage(`Whoops! ${Utils.getErrorMessage(err)}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(result => {
      if (result.value) {
        Swal.fire({
          type: 'success',
          title: `Edit job position`,
          text: result.value.message,
        });

        this.fetchPositions();
      }
    });
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
          .then(data => {
            return data;
          })
          .catch(err => {
            Swal.showValidationMessage(`Whoops! ${Utils.getErrorMessage(err)}`);
          });
      },
    }).then(result => {
      if (result.value) {
        Swal.fire('Deleted!', result.value.message, 'success');
        this.fetchPositions();
      }
    });
  }

  moveIntoPos(id) {
    this.router.navigate(['/hr', 'jobs', id, 'templates']);
  }
  */
}
