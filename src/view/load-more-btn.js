import {createElement} from "../utils";

export default class LoadMoreBtn {

  constructor() {
    this._element = null;
  }

  createTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }

  getTemplate() {
    return this.createTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
