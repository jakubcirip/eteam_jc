import { Component, OnInit } from '@angular/core';
import API from 'src/services/API';
import { fadeInAnimation } from './animations';
import { AuthService } from './auth.service';
import { SocketService } from './socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInAnimation],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService, private socket: SocketService) {}

  prepareRoute(outlet: any) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData['anim']
    );
  }

  ngOnInit() {
    API.setBaseUrl(environment.api);
  }
}
