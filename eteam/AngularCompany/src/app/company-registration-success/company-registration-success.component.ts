import { Component, OnInit } from '@angular/core';
import API from 'src/services/API';
import { ActivatedRoute } from '@angular/router';
import { Utils } from 'src/services/Utils';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-company-registration-success',
  templateUrl: './company-registration-success.component.html',
  styleUrls: ['./company-registration-success.component.scss'],
})
export class CompanyRegistrationSuccessComponent implements OnInit {
  errMsg = '';
  wasSuccess = false;
  loading = true;

  constructor(private route: ActivatedRoute, private auth: AuthService) {}

  async ngOnInit() {
    try {
      const key = this.route.snapshot.params.key;
      const activateRes = await API.activateCompany(key);
      this.loading = false;
      this.wasSuccess = true;

      this.auth.setKey(activateRes.key);
    } catch (exp) {
      this.loading = false;
      this.wasSuccess = false;
      this.errMsg = Utils.getErrorMessage(exp);
    }
  }
}
