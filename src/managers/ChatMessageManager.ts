export default class ChatMessageManager {
  public message: string;

  constructor() {}

  set(text: string) {
    this.message = text;
  }
}
