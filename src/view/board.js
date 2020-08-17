import AbstractView from "./abstract.js";

export default class Board extends AbstractView {

  createTemplate() {
    return `<section class="board container"></section>`;
  }

  getTemplate() {
    return this.createTemplate();
  }
}
