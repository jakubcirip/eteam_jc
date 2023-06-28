import { Component, OnInit } from '@angular/core';
import API from 'src/services/API';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Hiroo';

  constructor() {}

  ngOnInit() {
    API.setBaseUrl(environment.api);
  }
}
