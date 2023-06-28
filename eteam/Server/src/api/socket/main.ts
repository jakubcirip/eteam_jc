import * as socketIO from 'socket.io';
import { SQLManager } from '../managers/SQLManager';

export class SocketCtrl {
  io: any;

  clients = {};

  constructor(http: any) {
    this.io = socketIO(http);
    this.io.on('connection', (c) => {
      this.onConnected(c);
    });
  }

  async loginHr(socketId: string, divId: number, hrId: number) {
    if (this.clients[socketId]) {
      this.clients[socketId].data.divId = divId;
      this.clients[socketId].data.hrId = hrId;
      this.clients[socketId].data.startedAt = Date.now();
      this.clients[socketId].join('d_' + divId);
      this.clients[socketId].emit('auth', { success: true });
    }
  }

  async onDisconnect(c: any) {
    const data = this.clients[c.id].data;

    if (data.startedAt && data.hrId) {
      const dif = Date.now() - data.startedAt;
      const secs = Math.floor(dif / 1000);

      await SQLManager.knex
        .update({})
        .increment('time_tracker', secs)
        .table('hrs')
        .where('id', data.hrId);
    }

    if (this.clients[c.id]) {
      delete this.clients[c.id];
    }
  }

  async onConnected(c: any) {
    c.data = { divId: null };

    this.clients[c.id] = c;
    c.on('disconnect', () => {
      this.onDisconnect(c);
    });

    c.on('change', (data: { type: string }) => {
      const divId = c.data.divId;

      if (divId) {
        this.io.to('d_' + divId).emit('changeRes', { type: data.type });
      }
    });
  }
}
