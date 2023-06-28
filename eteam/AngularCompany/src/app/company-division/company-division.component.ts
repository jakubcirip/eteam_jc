import { Component, OnInit } from '@angular/core';
import API, { Division } from 'src/services/API';
import { AlertTypes, Utils } from 'src/services/Utils';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

declare var Swal: any;
declare var document: any;

@Component({
  selector: 'app-company-division',
  templateUrl: './company-division.component.html',
  styleUrls: ['./company-division.component.scss'],
})
export class CompanyDivisionComponent implements OnInit {
  divs: Division[] = [];
  mailuIp = environment.mailu;

  constructor(private router: Router) {}

  ngOnInit() {
    this.fetchDivisions();
  }

  async fetchDivisions() {
    try {
      this.divs = await API.getDivisions();
    } catch (exp) {
      Utils.showAlert(
        AlertTypes.ERROR,
        'Load Division',
        Utils.getErrorMessage(exp),
      );
    }
  }

  newDivision() {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2'],
    })
      .queue([
        {
          title: 'Create new division',
          input: 'text',
          inputPlaceholder: 'Division name',
          text: 'Enter division name below',
          inputValidator: value => {
            return new Promise(resolve => {
              if (value) {
                resolve();
              } else {
                resolve('Division name is required');
              }
            });
          },
        },
        {
          title: 'Create new division',
          input: 'text',
          inputPlaceholder: 'Division tag',
          text: 'Enter division tag below',
          inputValidator: value => {
            return new Promise(resolve => {
              if (value) {
                resolve();
              } else {
                resolve('Division tag is required');
              }
            });
          },
        },
      ])
      .then(async result => {
        if (result.value) {
          const name = result.value[0];
          const tag = result.value[1];

          await Utils.sendRequest(
            'Create new division',
            API.createDivision(
              {},
              {
                name,
                tag,
              },
            ),
          );

          await this.fetchDivisions();
        }
      });
  }

  async changeMailPass(divId) {
    const { value: formValues } = await Swal.fire({
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
      title: 'Change Mail Password',
      html:
        '<input type="password" placeholder="Enter new password" id="swal-mailu-input1" class="swal2-input">' +
        '<input type="password" placeholder="Enter new password again" id="swal-mailu-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-mailu-input1').value,
          document.getElementById('swal-mailu-input2').value,
        ];
      },
    });

    if (formValues) {
      const [newPass, newPassAgain] = formValues;

      await Utils.sendRequest(
        'Change Mail Password',
        API.changeDivisionMailPassword(
          divId,
          {},
          {
            newPass,
            newPassAgain,
          },
        ),
      );
    }
  }

  showMailPass(divId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will show plain password!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, show it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return API.getDivisionMailPassword(divId)
          .then(data => {
            return data;
          })
          .catch(err => {
            Swal.showValidationMessage(`Whoops! ${Utils.getErrorMessage(err)}`);
          });
      },
    }).then(result => {
      if (result.value) {
        Swal.fire('Mail password', result.value.message, 'info');
      }
    });
  }

  moreInfoDiv(divId) {
    this.router.navigate(['/company', 'divisions', divId]);
  }

  editDiv(divId, divName) {
    Swal.fire({
      title: 'Edit division',
      input: 'text',
      inputValue: divName,
      inputPlaceholder: 'Enter division name',
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: name => {
        return API.updateDivision(
          divId,
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
          title: `Edit new division`,
          text: result.value.message,
        });

        this.fetchDivisions();
      }
    });
  }

  deleteDiv(divId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'If you delete this division its permanent!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return API.deleteDivision(divId)
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
        this.fetchDivisions();
      }
    });
  }
}
