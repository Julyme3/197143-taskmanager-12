import AbstractView from "./abstract";
import {formattedDate} from "../utils/common";
import {isTaskRepeating, isTaskExpired} from "../utils/task";

export default class Task extends AbstractView {

  constructor(task) {
    super();
    this._task = task;
    this._editClickHandler = this._editClickHandler.bind(this); // потому что теряется контекст this
    this._clickInArchiveHandler = this._clickInArchiveHandler.bind(this);
    this._clickInFavoriteHandler = this._clickInFavoriteHandler.bind(this);
  }

  createTemplate(task) {
    const {color, description, dueDate, isFavorite, isArchive, repeatingDays} = task;
    const date = dueDate !== null
      ? formattedDate(dueDate, {days: `numeric`, month: `long`})
      : ``;
    const dueDateclassName = isTaskExpired(dueDate) ? `card--deadline` : ``;
    const favoriteClassNameDisable = isFavorite ? `card__btn--disabled` : ``;
    const archiveClassNameDisable = isArchive ? `card__btn--disabled` : ``;
    const repeateClassName = isTaskRepeating(repeatingDays)
      ? `card--repeat`
      : ``;

    return `<article class="card card--${color} ${dueDateclassName} ${repeateClassName}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive ${archiveClassNameDisable}">
              archive
            </button>
            <button type="button" class="card__btn card__btn--favorites ${favoriteClassNameDisable}">
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`;
  }

  getTemplate() {
    return this.createTemplate(this._task);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _clickInArchiveHandler(evt) {
    evt.preventDefault();
    this._callback.clickInArchive();
  }

  _clickInFavoriteHandler(evt) {
    evt.preventDefault();
    this._callback.clickInFavorite();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, this._editClickHandler);
  }

  setClickInArchiveHandler(callback) {
    this._callback.clickInArchive = callback;
    this.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, this._clickInArchiveHandler);
  }

  setClickInFavoriteHandler(callback) {
    this._callback.clickInFavorite = callback;
    this.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, this._clickInFavoriteHandler);
  }
}
