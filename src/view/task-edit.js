import SmartView from "./smart";
import {COLORS} from "../const";
import {formattedDate} from "../utils/common";
import {isTaskRepeating} from "../utils/task";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

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

export default class TaskEdit extends SmartView {

  constructor(task = DEFAULT_TASK) {
    super();
    this._data = TaskEdit.parseTaskToData(task);
    this._datepicker = null;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._dueDateToggleHandler = this._dueDateToggleHandler.bind(this);
    this._repeatingToggleHandler = this._repeatingToggleHandler.bind(this);
    this._descriptionInputHandler = this._descriptionInputHandler.bind(this);
    this._colorChangeHandler = this._colorChangeHandler.bind(this);
    this._repeatingChangeHandler = this._repeatingChangeHandler.bind(this);
    this._dueDateChangeHandler = this._dueDateChangeHandler.bind(this);

    this._setDatepicker();
    this._setInnerHandlers();
  }

  createDateTemplate(dueDate, isDueDate) {
    return `<button class="card__date-deadline-toggle" type="button">
        date: <span class="card__date-status">${isDueDate ? `yes` : `no`}</span>
      </button>

      ${isDueDate ? `<fieldset class="card__date-deadline">
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text" placeholder=""
            name="date"
            value="${formattedDate(dueDate, `D MMMM`)}"
          />
        </label>
      </fieldset>` : ``}`
    ;
  }

  createRepeatingTemplate(repeating, isRepeating) {
    return `<button class="card__repeat-toggle" type="button">
        repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
      </button>
      ${isRepeating ? `<fieldset class="card__repeat-days">
        <div class="card__repeat-days-inner">
          ${Object.entries(repeating).map(([day, repeat]) => `<input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-${day}"
            name="repeat"
            value="${day}"
            ${repeat ? `checked` : ``}
          />
          <label class="card__repeat-day" for="repeat-${day}"
            >${day}</label
          >`).join(``)}
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

  createTemplate(data) {
    const {color, description, dueDate, repeatingDays, isDueDate, isRepeating} = data;
    const dateTemplate = this.createDateTemplate(dueDate, isDueDate);
    const repeatingTemplate = this.createRepeatingTemplate(repeatingDays, isRepeating);
    const colorsTemplate = this.createColorsTemplate(color);

    const repeateClassName = isRepeating ? `card--repeat` : ``;
    const isSubmitDisabled = (isDueDate && dueDate === null) || (isRepeating && !isTaskRepeating(repeatingDays));

    return `<article class="card card--edit card--${color} ${repeateClassName}">
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
              <button class="card__save" type="submit" ${isSubmitDisabled ? `disabled` : ``}>save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>`
    ;
  }

  getTemplate() {
    return this.createTemplate(this._data);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(TaskEdit.parceDataToTask(this._data)); // передаем данные формы редактирования
  }

  _dueDateToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isDueDate: !this._data.isDueDate,
      isRepeating: !this._data.isDueDate && false
    });
  }

  _repeatingToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isRepeating: !this._data.isRepeating,
      isDueDate: !this._data.isRepeating && false
    });
  }

  _descriptionInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      description: evt.target.value
    }, true);

  }

  _colorChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      color: evt.target.value
    });
  }

  _repeatingChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      repeatingDays: Object.assign({},
          this._data.repeatingDays,
          {
            [evt.target.value]: evt.target.checked
          }
      )
    });
  }

  _dueDateChangeHandler([userDate]) {
    userDate.setHours(23, 59, 59, 999);
    this.updateData({
      dueDate: userDate
    });
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    if (this._data.isDueDate) {
      this._datepicker = flatpickr(
          this.getElement().querySelector(`.card__date`),
          {
            dateFormat: `j F`,
            defaultDate: this._data.dueDate,
            onChange: this._dueDateChangeHandler
          });
    }
  }

  static parseTaskToData(task) {
    return Object.assign({},
        task,
        {
          isDueDate: task.dueDate !== null,
          isRepeating: isTaskRepeating(task.repeatingDays)
        }
    );
  }

  static parceDataToTask(data) {
    data = Object.assign({}, data);

    if (!data.isDueDate) {
      data.dueDate = null;
    }

    if (!data.isRepeating) {
      data.repeatingDays = {
        mo: false,
        tu: false,
        we: false,
        th: false,
        fr: false,
        sa: false,
        su: false
      };
    }

    delete data.isDueDate;
    delete data.isRepeating;

    return data;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit); // восстанавливаем колбэк
    this._setDatepicker();
  }

  _setInnerHandlers() { // внутренние обработчики
    this.getElement().querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._dueDateToggleHandler);
    this.getElement().querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._repeatingToggleHandler);
    this.getElement().querySelector(`.card__text`).addEventListener(`input`, this._descriptionInputHandler);
    this.getElement().querySelector(`.card__colors-wrap`).addEventListener(`change`, this._colorChangeHandler);

    if (this._data.isRepeating) {
      this.getElement().querySelector(`.card__repeat-days-inner`).addEventListener(`change`, this._repeatingChangeHandler);
    }
  }

  reset(task) {
    this.updateData(TaskEdit.parseTaskToData(task));
  }
}
