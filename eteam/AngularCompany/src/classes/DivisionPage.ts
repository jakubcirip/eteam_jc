import { SocketService } from 'src/app/socket.service';

export class DivisionPage {
  constructor(
    private socket: SocketService,
    public name: string,
    public cb: () => void,
  ) {}
}
