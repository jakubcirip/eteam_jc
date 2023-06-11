import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Utils } from 'src/services/Utils';
import API, {
  JobPositionForm,
  UpdateHrJobPositiomFormMedalsParamBody,
} from 'src/services/API';

declare const Swal: any;

@Component({
  selector: 'app-hr-job-positions-form-medals',
  templateUrl: './hr-job-positions-form-medals.component.html',
  styleUrls: ['./hr-job-positions-form-medals.component.scss'],
})
export class HrJobPositionsFormMedalsComponent implements OnInit {
  name: string = null;
  medalCats: JobPositionForm['medalCategories'] = null;

  didChange = false;
  saveText = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  async ngOnInit() {
    const posId = this.route.snapshot.params.positionId;
    const formId = this.route.snapshot.params.formId;

    const [data] = await Promise.all([API.getJobPositionForm(posId, formId)]);

    this.medalCats = data.medalCategories;
    this.name = data.name;
  }

  leavePage() {
    const jobId = this.route.snapshot.params.positionId;
    this.router.navigate(['/hr', 'jobs', jobId, 'templates']);
  }

  goBack() {
    this.leavePage();
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
      this.doChange();
    }
  }

  onRangeChange(newVal: string, medal: any) {
    medal.weight = +newVal;
    this.doChange();
  }

  async save() {
    const posId = this.route.snapshot.params.positionId;
    const formId = this.route.snapshot.params.formId;

    this.saveText = 'Saving..';

    const medalsBody: UpdateHrJobPositiomFormMedalsParamBody = { medals: [] };

    this.medalCats.forEach((c) => {
      c.medals.forEach((m) => {
        medalsBody.medals.push({
          weight: m.weight,
          qpUuid: m.qpUuid ? m.qpUuid : undefined,
          medalId: m.medalId,
        });
      });
    });

    const res = await Utils.sendRequest(
      'Template save',
      API.updateHrJobPositiomFormMedals(posId, formId, {}, medalsBody),
    );

    if (res) {
      this.leavePage();

      this.saveText = null;
      this.didChange = false;
    } else {
      this.saveText = 'Retry Save';
    }
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
}
