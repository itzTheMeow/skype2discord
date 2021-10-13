export default class ScrollManager {
  public value: number = 0;

  constructor() {}

  public reset() {
    this.value = 0;
  }
  public up() {
    this.value++;
  }
  public down() {
    this.value--;
  }
}
