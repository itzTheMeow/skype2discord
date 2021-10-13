export default class HistoryManager {
  public history: string[] = [];

  constructor() {}

  public reset() {
    this.history = [];
  }
  public undo() {
    return this.history.pop();
  }
  public add(text: string) {
    this.history.push(text);
  }
}
