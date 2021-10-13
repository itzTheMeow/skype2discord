type Server = any;

export default class ServerManager {
  public server: Server;

  constructor() {}

  public data(server: Server) {
    this.server = server;
  }
}
