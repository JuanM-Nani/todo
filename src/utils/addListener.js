import { Listener } from './Listener.js';
export function addListeners(...listeners) {
  listeners.forEach(l => {
    if (!(l instanceof Listener)) throw new Error('Selector doesn`t exist');
    const element = document.querySelector(l.selector);
    element.addEventListener(l.event, l.callback);
  });
}
