import AbstractView from "./abstract";

export default class Sort extends AbstractView {

  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  createTemplate() {
    return `<div class="board__filter-list">
      <a href="#" class="board__filter" data-sort-type="default">SORT BY DEFAULT</a>
      <a href="#" class="board__filter" data-sort-type="date-up">SORT BY DATE up</a>
      <a href="#" class="board__filter" data-sort-type="date-down">SORT BY DATE down</a>
    </div>`;
  }

  getTemplate() {
    return this.createTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.changeSortType(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.changeSortType = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
