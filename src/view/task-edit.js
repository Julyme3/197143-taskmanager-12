import {COLORS} from "../const";
import {createElement, isTaskRepeating, isTaskExpired, formattedDate} from "../utils";

const DEFAULT_TASK = {
  color: COLORS[0],
  description: ``,
  dueDate: null,
  repeatingDays: {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false,
  },
};

export default class TaskEdit {

  constructor(task = DEFAULT_TASK) {
    this._task = task;
    this._element = null;
  }

  createDateTemplate(dueDate) {
    return `<button class="card__date-deadline-toggle" type="button">
        date: <span class="card__date-status">${dueDate !== null ? `yes` : `no`}</span>
      </button>

      ${dueDate !== null ? `<fieldset class="card__date-deadline">
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text" placeholder=""
            name="date"
            value="${formattedDate(dueDate, {days: `numeric`, month: `long`})}"
          />
        </label>
      </fieldset>` : ``}`
    ;
  }

  createRepeatingTemplate(repeating) {
    return `<button class="card__repeat-toggle" type="button">
        repeat:<span class="card__repeat-status">${isTaskRepeating(repeating) ? `yes` : `no`}</span>
      </button>

      ${isTaskRepeating(repeating) ? `<fieldset class="card__repeat-days">
        <div class="card__repeat-days-inner">
          <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-mo-4"
            name="repeat"
            value="mo"
          />
          <label class="card__repeat-day" for="repeat-mo-4">mo</label>
          <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-tu-4"
            name="repeat"
            value="tu"
            checked=""
          />
          <label class="card__repeat-day" for="repeat-tu-4">tu</label>
          <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-we-4"
            name="repeat"
            value="we"
          />
          <label class="card__repeat-day" for="repeat-we-4">we</label>
          <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-th-4"
            name="repeat"
            value="th"
          />
          <label class="card__repeat-day" for="repeat-th-4">th</label>
          <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-fr-4"
            name="repeat"
            value="fr"
            checked=""
          />
          <label class="card__repeat-day" for="repeat-fr-4">fr</label>
          <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            name="repeat"
            value="sa"
            id="repeat-sa-4"
          />
          <label class="card__repeat-day" for="repeat-sa-4">sa</label>
          <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-su-4"
            name="repeat"
            value="su"
            checked=""
          />
          <label class="card__repeat-day" for="repeat-su-4">su</label>
        </div>
      </fieldset>` : ``}`
    ;
  }

  createColorsTemplate(currentColor) {
    return COLORS.map((color) => `<input
        type="radio"
        id="color-${color}-4"
        class="card__color-input card__color-input--${color} visually-hidden"
        name="color"
        value="${color}"
        ${currentColor === color ? `checked` : ``}
      />
      <label for="color-${color}-4" class="card__color card__color--${color}">${color}</label>
    `).join(``);
  }

  createTemplate(task) {
    const {color, description, dueDate, repeatingDays} = task;
    const dateTemplate = this.createDateTemplate(dueDate);
    const repeatingTemplate = this.createRepeatingTemplate(repeatingDays);
    const colorsTemplate = this.createColorsTemplate(color);

    const dueDateclassName = isTaskExpired(dueDate) ? `card--deadline` : ``;
    const repeateClassName = isTaskRepeating(repeatingDays)
      ? `card--repeat`
      : ``;

    return `<article class="card card--edit card--${color} ${dueDateclassName} ${repeateClassName}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                <textarea class="card__text"
                  placeholder="Start typing your text here..."
                  name="text">${description}
                </textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  ${dateTemplate}
                  ${repeatingTemplate}
                </div>
              </div>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  ${colorsTemplate}
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>`
    ;
  }

  getTemplate() {
    return this.createTemplate(this._task);
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
