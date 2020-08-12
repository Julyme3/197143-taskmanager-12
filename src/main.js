import {render} from "./utils";
import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";
import MenuView from "./view/menu";
import FIlterView from "./view/filter";
import BoardView from "./view/board";
import SortView from "./view/sort";
import TaskListView from "./view/task-list";
import TaskView from "./view/task";
import TaskEditView from "./view/task-edit";
import LoadMoreBtnView from "./view/load-more-btn";

const TASK_COUNT_GAP = 8;
const TASK_COUNT = 20;
const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);

  render(taskListElement, taskComponent.getElement(), `beforeend`);

  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });
};

render(headerElement, new MenuView().getElement(), `beforeend`);
render(mainElement, new FIlterView(filters).getElement(), `beforeend`);

const boardComponent = new BoardView();
render(mainElement, boardComponent.getElement(), `beforeend`);
render(boardComponent.getElement(), new SortView().getElement(), `beforeend`);

const taskListComponent = new TaskListView();
render(boardComponent.getElement(), taskListComponent.getElement(), `beforeend`);

const boardElement = mainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);

for (let i = 0; i < Math.min(TASK_COUNT, TASK_COUNT_GAP); i++) {
  renderTask(taskListElement, tasks[i]);
}

if (tasks.length > TASK_COUNT_GAP) {
  const loadMoreBtnComponent = new LoadMoreBtnView();
  render(boardElement, loadMoreBtnComponent.getElement(), `beforeend`);
  let renderedTasksCount = TASK_COUNT_GAP; // количество отрисованных тасков

  loadMoreBtnComponent.getElement().addEventListener(`click`, () => {
    tasks
      .slice(renderedTasksCount, renderedTasksCount + TASK_COUNT_GAP)
      .forEach((task) => {
        renderTask(taskListElement, task);
      });

    renderedTasksCount += TASK_COUNT_GAP;
    if (renderedTasksCount > tasks.length) {
      loadMoreBtnComponent.getElement().remove();
      loadMoreBtnComponent.removeElement();
    }
  });
}
