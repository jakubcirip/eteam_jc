import { Component, OnInit } from '@angular/core';
import API, {
  InterviewData,
  InterviewSettingsForms,
  MailType,
  InterviewCandidatesData,
  InterviewPeople,
} from 'src/services/API';
import { Router, ActivatedRoute } from '@angular/router';
import { Utils } from 'src/services/Utils';
import { environment } from 'src/environments/environment';

declare var Swal: any;

@Component({
  selector: 'app-hr-interview-candidats',
  templateUrl: './hr-interview-candidats.component.html',
  styleUrls: ['./hr-interview-candidats.component.scss'],
})
export class HrInterviewCandidatsComponent implements OnInit {
  data: InterviewCandidatesData = null;
  people: any = null;
  intData: any = null;
  divisionData: any = null;

  id: number;
  constructor(private router: Router, private route: ActivatedRoute) {}

  async ngOnInit() {
    await this.reloadList();

    try {
      this.people = await API.getInterviewPeopleForAdding();
    } catch (exp) {
      Swal.fire({
        type: 'error',
        title: 'Cant load data',
        text: Utils.getErrorMessage(exp),
      });
    }
  }

  getMailUidUrl(uid: string) {
    return `${environment.mailu}/?_task=mail&_uid=${uid}&_mbox=INBOX&_action=show`;
  }

  async reloadList() {
    try {
      this.id = +this.route.snapshot.params.intId;
      this.data = await API.getHrInterviewCandidates(this.id.toString());
      this.intData = await API.getHrInterview(this.id.toString());
      this.divisionData = await API.getHrSettings();
    } catch (exp) {
      Swal.fire({
        type: 'error',
        title: 'Cant load data',
        text: Utils.getErrorMessage(exp),
      });
    }
  }

  editCandidate(canId: number) {
    Swal.fire({
      title: 'Edit candidate',
      text:
        'To edit candidate, you have to edit infomation in candidates section.',
      type: 'info',
    });
  }

  deleteCandidate(canId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'If you delete this candidate its permanent!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return API.removeHrInterviewCandidate(
          this.id.toString(),
          canId.toString(),
        )
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
        this.reloadList();
      }
    });
  }

  async addCandidate() {
    const inputOptions = {};

    this.people.people.forEach((p) => {
      inputOptions[p.id] = `${p.name} (${p.email}) | ${p.type}`;
    });

    const { value: personId } = await Swal.fire({
      title: 'Assign candidate',
      input: 'select',
      inputOptions,
      inputPlaceholder: 'Select a person',
      showCancelButton: true,
    });

    const res = await Utils.sendRequest(
      'Assing candidate',
      API.createHrInterviewCandidate(
        this.id.toString(),
        {},
        {
          personId: +personId,
        },
      ),
    );

    if (res) {
      this.reloadList();
    }
  }

  goBack() {
    this.router.navigate(['/hr', 'interview']);
  }
}
