import {render, replace, remove} from "../utils/render";
import NoTask from "../view/no-task";
import SortView from "../view/sort";
import BoardView from "../view/board";
import TaskListView from "../view/task-list";
import TaskView from "../view/task";
import TaskEditView from "../view/task-edit";
import LoadMoreBtnView from "../view/load-more-btn";

const TASK_COUNT_GAP = 8;

export default class Board {
  constructor(container) {
    this._boardContainer = container;
    this._renderedTaskCount = TASK_COUNT_GAP;
    this._boardComponent = new BoardView();
    this._noTaskComponent = new NoTask();
    this._sortComponent = new SortView();
    this._taskListComponent = new TaskListView();
    this._loadMoreBtnComponent = new LoadMoreBtnView();
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(tasks) {
    this._boardTasks = tasks;
    render(this._boardContainer, this._boardComponent, `beforeend`);
    render(this._boardComponent, this._taskListComponent, `beforeend`);
    this._renderBoard();
  }

  _renderSort() {
    render(this._boardComponent, this._sortComponent, `afterbegin`);
  }

  _renderNoTask() {
    render(this._boardComponent, this._noTaskComponent, `beforeend`);
  }

  _renderTask(task) {
    const taskComponent = new TaskView(task);
    const taskEditComponent = new TaskEditView(task);

    render(this._taskListComponent, taskComponent, `beforeend`);

    const replaceCardToForm = () => {
      replace(taskEditComponent, taskComponent);
    };

    const replaceFormToCard = () => {
      replace(taskComponent, taskEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
  }

  _renderTasks(from, to) {
    this._boardTasks
    .slice(from, to)
    .forEach((boardTask) => this._renderTask(boardTask));
  }

  _handleLoadMoreButtonClick() {
    this._renderTasks(this._renderedTaskCount, this._renderedTaskCount + TASK_COUNT_GAP);

    this._renderedTaskCount += TASK_COUNT_GAP;
    if (this._renderedTaskCount >= this._boardTasks.length) {
      remove(this._loadMoreBtnComponent);
    }
  }

  _renderLoadMoreBtn() {
    render(this._boardComponent, this._loadMoreBtnComponent, `beforeend`);
    this._loadMoreBtnComponent.setBtnClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderBoard() {

    if (this._boardTasks.every((task) => task.isArchive)) {
      this._renderNoTask();
      return;
    } else {
      this._renderSort();
    }

    this._renderTasks(0, Math.min(this._boardTasks.length, TASK_COUNT_GAP));

    if (this._boardTasks.length > TASK_COUNT_GAP) {
      this._renderLoadMoreBtn();
    }
  }
}
