import {render} from "./utils";
import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";
import {createMenuTemplate} from "./view/menu";
import {createFilterTemplate} from "./view/filter";
import {createBoardTemplate} from "./view/board";
import {createSortingTemplate} from "./view/sort";
import {createTaskTemplate} from "./view/task";
import {createEditTaskTemplate} from "./view/task-edit";
import {createLoadMoreBtnTemplate} from "./view/load-more-btn";

const TASK_COUNT_GAP = 8;
const TASK_COUNT = 20;
const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

render(headerElement, createMenuTemplate(), `beforeend`);
render(mainElement, createFilterTemplate(filters), `beforeend`);
render(mainElement, createBoardTemplate(), `beforeend`);

const boardElement = mainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);

render(boardElement, createSortingTemplate(), `afterbegin`);
render(taskListElement, createEditTaskTemplate(tasks[0]), `afterbegin`);

for (let i = 1; i < Math.min(TASK_COUNT, TASK_COUNT_GAP); i++) {
  render(taskListElement, createTaskTemplate(tasks[i]), `beforeend`);
}

if (tasks.length > TASK_COUNT_GAP) {
  render(boardElement, createLoadMoreBtnTemplate(), `beforeend`);
  const loadMoreBtn = boardElement.querySelector(`.load-more`);
  let renderedTasksCount = TASK_COUNT_GAP; // количество отрисованных тасков

  loadMoreBtn.addEventListener(`click`, () => {
    tasks
      .slice(renderedTasksCount, renderedTasksCount + TASK_COUNT_GAP)
      .forEach((task) => {
        render(taskListElement, createTaskTemplate(task), `beforeend`);
      });

    renderedTasksCount += TASK_COUNT_GAP;
    if (renderedTasksCount > tasks.length) {
      loadMoreBtn.remove();
    }
  });
}
