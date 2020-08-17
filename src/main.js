import {render} from "./utils/render";
import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";
import MenuView from "./view/menu";
import FIlterView from "./view/filter";
import BoardPresenter from "./presenter/board.js";

const TASK_COUNT = 20;
const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);


render(headerElement, new MenuView(), `beforeend`);
render(mainElement, new FIlterView(filters), `beforeend`);

const boardPresenter = new BoardPresenter(mainElement);
boardPresenter.init(tasks);
