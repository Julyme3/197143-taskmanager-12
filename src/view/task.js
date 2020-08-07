import {isTaskRepeating, isTaskExpired, formattedDate} from "../utils";

const createTaskTemplate = (task) => {
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
};
export {createTaskTemplate};
