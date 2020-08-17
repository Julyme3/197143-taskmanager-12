import AbstractView from "./abstract";

export default class Filter extends AbstractView {

  constructor(filters) {
    super();
    this._filters = filters;
  }

  createItemTemplate(filter, isChecked) {
    const {title, count} = filter;
    return `<input
        type="radio"
        id="filter__${title}"
        class="filter__input visually-hidden"
        name="filter"
        ${count ? `` : `disabled`}
        ${isChecked ? `checked` : ``}
      />
      <label for="filter__${title}" class="filter__label">${title}
        <span class="filter__all-count">${count}</span>
      </label>`
    ;
  }

  createTemplate(filters) {
    return `<section class="main__filter filter container">
        ${filters.map((filter, idx) => this.createItemTemplate(filter, idx === 0)).join(``)}
      </section>`
    ;
  }

  getTemplate() {
    return this.createTemplate(this._filters);
  }

}
