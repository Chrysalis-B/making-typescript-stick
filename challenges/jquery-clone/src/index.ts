import fetch from "node-fetch";

class SelectorResult {
  #elements;
  on<K extends keyof HTMLElementEventMap>(eventName: K,
    cb: (event: HTMLElementEventMap[K]) => void) {
    this.#elements.forEach(elem => {
      const htmlElem = elem as HTMLElement;
      htmlElem.addEventListener(eventName, cb)
    });
  }
  show() {
    this.#elements.forEach(elem => {
      const htmlElem = elem as HTMLElement;
      htmlElem.style.visibility = 'visible';
    });
  }
  hide() {
    this.#elements.forEach(elem => {
      const htmlElem = elem as HTMLElement;
      htmlElem.style.visibility = 'hidden';
    });
  }
  html(contents: string) {
    this.#elements.forEach(elem => {
      elem.innerHTML = contents;
    });
  }
  constructor(elements: NodeListOf<Element>) {
    this.#elements = elements;
  }
}

function $(selector: string) {
  return new SelectorResult(document.querySelectorAll(selector));
}

namespace $ {
  export function ajax(
    { url, successCb }:
      { url: string, successCb: (data: any) => void }): any {
    return fetch(url)
      .then(resp => resp.json())
      .then(successCb);
  }
}

export default $;
