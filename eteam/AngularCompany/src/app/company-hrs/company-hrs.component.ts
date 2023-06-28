import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import API from 'src/services/API';
import { Utils } from 'src/services/Utils';

declare var Swal: any;
declare var document: any;

@Component({
  selector: 'app-company-hrs',
  templateUrl: './company-hrs.component.html',
  styleUrls: ['./company-hrs.component.scss'],
})
export class CompanyHrsComponent implements OnInit {
  division = null;

  divId = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  async ngOnInit() {
    const divisionId = this.route.snapshot.params.division_id;
    this.divId = divisionId;
    this.fetchPersons();
  }

  async fetchPersons() {
    this.division = await API.getDivision(this.divId);
  }

  newPerson() {
    Swal.fire({
      title: 'Add new person',
      showCancelButton: true,
      confirmButtonText: 'Create',
      showLoaderOnConfirm: true,
      html:
        '<input placeholder="Enter person name" type="text" id="swal-input1" class="swal2-input">' +
        '<input placeholder="Enter person email" type="email" id="swal-input2" class="swal2-input">',
      focusConfirm: false,

      preConfirm: () => {
        const data = [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
        ];

        return API.addPerson(
          this.divId,
          {},
          {
            name: data[0],
            email: data[1],
          },
        )
          .then(d => {
            return d;
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
          title: 'Add new person',
          text: result.value.message,
        });

        this.fetchPersons();
      }
    });
  }

  goBack() {
    this.router.navigate(['/company', 'divisions']);
  }

  deleteHr(hrId) {
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
        return API.deletePerson(hrId)
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
        this.fetchPersons();
      }
    });
  }
}
