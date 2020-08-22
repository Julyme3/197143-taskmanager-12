import {COLORS} from "../const";
import {getRandomInteger} from "../utils/common";


const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateDescription = () => {
  const description = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ];

  const random = getRandomInteger(0, description.length - 1);
  return description[random];
};

const generateDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const currentDate = new Date();
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  currentDate.setDate(currentDate.getDate() + daysGap);
  currentDate.setHours(23, 59, 59, 999);
  return new Date(currentDate);
};

const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: Boolean(getRandomInteger(0, 1)),
    th: false,
    fr: Boolean(getRandomInteger(0, 1)),
    sa: false,
    su: false,
  };
};

const generateColor = () => {
  const random = getRandomInteger(0, COLORS.length - 1);
  return COLORS[random];
};

const generateTask = () => {
  const dueDate = generateDate();
  const repeatingDays = dueDate === null
    ? generateRepeating()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    };

  return {
    description: generateDescription(),
    dueDate,
    repeatingDays,
    color: generateColor(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isArchive: Boolean(getRandomInteger(0, 1)),
    id: generateId(),
  };
};
export {generateTask};
