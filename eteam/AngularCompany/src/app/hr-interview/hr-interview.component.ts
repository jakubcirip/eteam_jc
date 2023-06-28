import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import API, { Interview } from 'src/services/API';
import { Utils } from 'src/services/Utils';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs';

declare var Swal: any;

@Component({
  selector: 'app-hr-interview',
  templateUrl: './hr-interview.component.html',
  styleUrls: ['./hr-interview.component.scss'],
})
export class HrInterviewComponent implements OnInit, OnDestroy {
  interviews: Interview[] = null;

  socketType = 'interviewList';
  sub: Subscription;

  created: Interview[] = null;
  pending: Interview[] = null;
  finished: Interview[] = null;

  constructor(private router: Router, private socket: SocketService) {}

  async ngOnInit() {
    await this.reloadList();

    this.sub = this.socket.onChange.subscribe((type) => {
      if (type === this.socketType) {
        this.reloadList();
      }
    });
  }

  goToResults(id) {
    this.router.navigate(['/hr', 'interview', id, 'results']);
  }

  getDate(date: string): Date {
    return new Date(date);
  }

  async ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  async reloadList() {
    try {
      this.interviews = (await API.getHrInterviews()).interviews;

      this.created = this.interviews.filter((i) => i.state === 'created');
      this.pending = this.interviews.filter((i) => i.state === 'pending');
      this.finished = this.interviews.filter((i) => i.state === 'finished');
    } catch (exp) {
      Swal.fire({
        type: 'error',
        title: 'Cant load data',
        text: Utils.getErrorMessage(exp),
      });
    }
  }

  newInterview() {
    Swal.fire({
      title: 'Create new intreview',
      input: 'text',
      inputPlaceholder: 'Enter interview name',
      showCancelButton: true,
      confirmButtonText: 'Create',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        return API.addHrInterview(
          {},
          {
            name,
            isNonstop: false,
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
          title: `Create new interivew`,
          text: result.value.message,
        });

        this.socket.change(this.socketType);
        this.reloadList();
      }
    });
  }

  editInt(id, name) {
    Swal.fire({
      title: 'Edit interview',
      input: 'text',
      inputValue: name,
      inputPlaceholder: 'Enter interview name',
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: (newName) => {
        return API.editHrInterview({}, { id, name: newName })
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
        this.socket.change(this.socketType);
        this.reloadList();
      }
    });
  }

  deleteInt(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'If you delete this interview, its permanent!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return API.deleteHrInterview({}, { id })
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

  moveIntoInt(id: number) {
    this.router.navigate(['/hr', 'interview', id]);
  }

  moveIntoPeople(id: number) {
    this.router.navigate(['/hr', 'interview', id, 'people']);
  }

  moveIntoSummary(id: number) {
    this.router.navigate(['/hr', 'interview', id, 'summary']);
  }
}
