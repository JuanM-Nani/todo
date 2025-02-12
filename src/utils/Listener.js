export class Listener {
  constructor(selector, event, callback) {
    this.selector = selector;
    this.event = event;
    this.callback = callback;
  }

  addEventListener() {
    const element = document.querySelector(this.selector);
    if (!element) throw new Error('Selector doesn`t exist');
    element.addEventListener(this.event, this.callback);
  }
}
