import { Socket } from "socket.io-client";

export default class SocketManager {
  public socket: Socket;

  constructor() {}

  set(sock: Socket) {
    this.socket = sock;
  }
}
