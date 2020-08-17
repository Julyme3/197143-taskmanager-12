import AbstractView from "./abstract";

export default class TaskList extends AbstractView {

  createTemplate() {
    return `<div class="board__tasks"></div>`;
  }

  getTemplate() {
    return this.createTemplate();
  }
}
