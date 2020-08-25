import {SortType} from "../const";
import {render, remove} from "../utils/render";
import {sortByDateDown, sortByDateUp, updateItem} from "../utils/task";
import NoTask from "../view/no-task";
import SortView from "../view/sort";
import BoardView from "../view/board";
import TaskListView from "../view/task-list";
import LoadMoreBtnView from "../view/load-more-btn";
import TaskPresenter from "../presenter/task";

const TASK_COUNT_GAP = 8;

export default class Board {
  constructor(container) {
    this._boardContainer = container;
    this._renderedTaskCount = TASK_COUNT_GAP;
    this._currentSortType = SortType.DEFAULT;

    this._boardComponent = new BoardView();
    this._noTaskComponent = new NoTask();
    this._sortComponent = new SortView();
    this._taskListComponent = new TaskListView();
    this._loadMoreBtnComponent = new LoadMoreBtnView();
    this._taskPresenter = {};
    this._handleTaskChange = this._handleTaskChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleChangeModeTask = this._handleChangeModeTask.bind(this);
  }

  init(tasks) {
    this._boardTasks = tasks;
    render(this._boardContainer, this._boardComponent, `beforeend`);
    render(this._boardComponent, this._taskListComponent, `beforeend`);
    this._sourcedBoardTasks = tasks.slice(); // храним исходную копию массива с тасками
    this._renderBoard();
  }

  _handleTaskChange(updatedTask) {
    this._boardTasks = updateItem(this._boardTasks, updatedTask);
    this._sourcedBoardTasks = updateItem(this._sourcedBoardTasks, updatedTask);
    this._taskPresenter[updatedTask.id].update(updatedTask);
  }

  _tasksSort(sortType) {
    switch (sortType) {
      case SortType.DATE_UP:
        this._boardTasks.sort(sortByDateUp);
        break;
      case SortType.DATE_DOWN:
        this._boardTasks.sort(sortByDateDown);
        break;
      default:
        this._boardTasks = this._sourcedBoardTasks.slice(); // записываем копию массива-источника
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }

    this._tasksSort(sortType);
    this._clearBoardTasks();
    this._renderTaskList();
  }

  _handleChangeModeTask() {
    Object.values(this._taskPresenter).forEach((taskPresener) => taskPresener.resetView());
  }

  _renderSort() {
    render(this._boardComponent, this._sortComponent, `afterbegin`);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderNoTask() {
    render(this._boardComponent, this._noTaskComponent, `beforeend`);
  }

  _renderTask(task) {
    const taskPresenter = new TaskPresenter(this._taskListComponent, this._handleTaskChange, this._handleChangeModeTask);
    taskPresenter.init(task);

    this._taskPresenter[task.id] = taskPresenter;
  }

  _renderTasks(from, to) {
    this._boardTasks
    .slice(from, to)
    .forEach((boardTask) => this._renderTask(boardTask));
  }

  _renderTaskList() {
    this._renderTasks(0, Math.min(this._boardTasks.length, TASK_COUNT_GAP));

    if (this._boardTasks.length > TASK_COUNT_GAP) {
      this._renderLoadMoreBtn();
    }
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

  _clearBoardTasks() {
    Object.values(this._taskPresenter)
      .forEach((task) => task.destroy());
    this._taskPresenter = {};
    this._renderedTaskCount = TASK_COUNT_GAP;
  }

  _renderBoard() {

    if (this._boardTasks.every((task) => task.isArchive)) {
      this._renderNoTask();
      return;
    } else {
      this._renderSort();
    }

    this._renderTaskList();
  }
}
