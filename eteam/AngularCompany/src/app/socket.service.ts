import { Injectable } from '@angular/core';
import API from 'src/services/API';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

declare var io: any;

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  int: any;
  socket: any;

  onChange = new Subject<string>();

  constructor() {
    console.log('Socket ', environment.api);
    this.socket = io(environment.api + '/');

    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.auth();
    });

    this.socket.on('auth', () => {
      console.log('Auth Finished');
      clearInterval(this.int);
    });

    this.socket.on('changeRes', (data: { type: string }) => {
      console.log('Recieve change', data);
      this.onChange.next(data.type);
    });
  }

  change(type: string) {
    this.socket.emit('change', { type });
    console.log('Sending change ', type);
  }

  auth() {
    if (!this.int) {
      this._auth();
      this.int = setInterval(() => {
        this._auth();
      }, 5000);
    }
  }

  _auth() {
    console.log('Internal Auth');
    if (this.socket.id) {
      console.log('Internal Auth 2', this.socket.id);
      API.loginSocketHr(
        {},
        {
          socketId: this.socket.id,
        },
      );
    }
  }
}
