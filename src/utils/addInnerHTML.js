export function addInnerHTML(selector, HTML, replace) {
  const element = document.querySelector(selector);
  if (!element) throw new Error('Selector doesn`t exist');

  if (replace) element.innerHTML = HTML;
  else element.insertAdjacentHTML('beforeend', HTML);
}
