import { Component, OnInit } from '@angular/core';
import { LangRoutes } from 'src/app/services/router.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
// password reset formular wrapper by wrapper used on public page where company login/register/...
export class ForgotPasswordComponent implements OnInit {
  // so we can access it in html template
  LangRoutes = LangRoutes;

  constructor() {}

  ngOnInit(): void {}
}
