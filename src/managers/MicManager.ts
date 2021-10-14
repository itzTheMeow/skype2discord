export default class MicManager {
  public instance: any;
  public inputStream: any;
  public started: boolean = false;
  public onComplete: () => null;

  constructor() {}

  setMic(inst: any, str: any) {
    this.instance = inst;
    this.inputStream = str;
    this.started = true;

    let mm = this;
    this.inputStream.on("stopComplete", function () {
      this.onComplete();
      mm.started = false;
    });
  }
}
