const createItemFilterTemplate = (filter, isChecked) => {
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
    </label>
  `;
};

const createFilterTemplate = (filters) =>
  `<section class="main__filter filter container">
    ${filters.map((filter, idx) => createItemFilterTemplate(filter, idx === 0)).join(``)}
  </section>`
;
export {createFilterTemplate};
