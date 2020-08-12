import {createElement} from "../utils";

export default class TaskList {

  constructor() {
    this._element = null;
  }

  createTemplate() {
    return `<div class="board__tasks"></div>`;
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
