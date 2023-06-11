import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-auth-left',
  templateUrl: './auth-app-left.component.html',
  styleUrls: ['./auth-app-left.component.scss'],
})
export class AuthAppLeftComponent implements OnInit {
  @HostBinding('class') @Input('class') classList: string =
    'col-md-6 bg-primary';

  constructor() {}

  ngOnInit() {}
}
