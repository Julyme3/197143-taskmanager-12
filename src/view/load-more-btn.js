import AbstractView from "./abstract";

export default class LoadMoreBtn extends AbstractView {

  constructor() {
    super();
    this._btnClickHandler = this._btnClickHandler.bind(this);
  }

  createTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }

  getTemplate() {
    return this.createTemplate();
  }

  _btnClickHandler(evt) {
    evt.preventDefault();
    this._callback.btnClick();
  }

  setBtnClickHandler(callback) {
    this._callback.btnClick = callback;
    this.getElement().addEventListener(`click`, this._btnClickHandler);
  }
}
