import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-company-auth-check',
  templateUrl: './company-auth-check.component.html',
  styleUrls: ['./company-auth-check.component.scss'],
})
export class CompanyAuthCheckComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    const key = this.auth.getParameterByName('secret');
    if (key) {
      this.router.navigate(['/company']);
    }
  }
}
