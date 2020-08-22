import {render, replace, remove} from "../utils/render";
import TaskView from "../view/task";
import TaskEditView from "../view/task-edit";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Task {
  constructor(container, changeData, changeMode) {
    this._container = container;
    this._taskComponent = null;
    this._taskEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._changeData = changeData;
    this._changeMode = changeMode;
    this._handleClickInArchive = this._handleClickInArchive.bind(this);
    this._handleClickInFavorite = this._handleClickInFavorite.bind(this);
    this._handleEditCLick = this._handleEditCLick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._onEscKeyDownHander = this._onEscKeyDownHander.bind(this);
  }

  init(task) {
    this._task = task;

    this._taskComponent = new TaskView(task);
    this._taskEditComponent = new TaskEditView(task);

    this._setInnerHandlers();
    render(this._container, this._taskComponent, `beforeend`);
  }

  update(updatedTask) {
    this._task = updatedTask;
    const updatedTaskComponent = new TaskView(updatedTask);
    const updatedTaskEditComponent = new TaskEditView(updatedTask);

    if (this._mode !== Mode.EDITING) {
      replace(updatedTaskComponent, this._taskComponent);
    }

    if (this._mode !== Mode.DEFAULT) {
      replace(updatedTaskEditComponent, this._taskEditComponent);
    }

    this._taskComponent = updatedTaskComponent;
    this._taskEditComponent = updatedTaskEditComponent;
    this.restoreHandlers(); // восстанавливаем обработчики
  }

  _replaceCardToForm() {
    replace(this._taskEditComponent, this._taskComponent);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._taskComponent, this._taskEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDownHander(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._taskEditComponent.reset(this._task); // возвращаем форму редактирования в исходное состояние
      this._replaceFormToCard();
      document.removeEventListener(`keydown`, this._onEscKeyDownHander);
    }
  }

  _handleEditCLick() {
    this._replaceCardToForm();
    document.addEventListener(`keydown`, this._onEscKeyDownHander);
  }

  _handleFormSubmit(task) {
    this._changeData(task);
    this._replaceFormToCard();
    document.removeEventListener(`keydown`, this._onEscKeyDownHander);
  }

  _handleClickInArchive() {
    this._changeData(Object.assign(
        {},
        this._task,
        {
          isArchive: !this._task.isArchive
        }
    ));
  }

  _handleClickInFavorite() {
    this._changeData(Object.assign(
        {},
        this._task,
        {
          isFavorite: !this._task.isFavorite
        }
    ));
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() { // внутренние обработчики
    this._taskComponent.setEditClickHandler(this._handleEditCLick);
    this._taskEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._taskComponent.setClickInArchiveHandler(this._handleClickInArchive);
    this._taskComponent.setClickInFavoriteHandler(this._handleClickInFavorite);
  }

  resetView() {
    if (this._mode === Mode.EDITING) {
      this._replaceFormToCard();
    }
  }

  destroy() {
    remove(this._taskComponent);
    remove(this._taskEditComponent);
  }
}
