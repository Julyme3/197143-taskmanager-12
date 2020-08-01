import {render} from "./utils";
import {createMenuTemplate} from "./view/menu";
import {createFilterTemplate} from "./view/filter";
import {createBoardTemplate} from "./view/board";
import {createSortingTemplate} from "./view/sort";
import {createTaskTemplate} from "./view/task";
import {createEditTaskTemplate} from "./view/task-edit";
import {createLoadMoreBtnTemplate} from "./view/load-more-btn";

const TASK_COUNT = 3;

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

render(headerElement, createMenuTemplate(), `beforeend`);
render(mainElement, createFilterTemplate(), `beforeend`);
render(mainElement, createBoardTemplate(), `beforeend`);

const boardElement = mainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);

render(boardElement, createSortingTemplate(), `afterbegin`);
render(taskListElement, createEditTaskTemplate(), `afterbegin`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskTemplate(), `beforeend`);
}

render(boardElement, createLoadMoreBtnTemplate(), `beforeend`);
