const render = (container, template, place) => container.insertAdjacentHTML(place, template);

const isTaskRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);// возвращаем false даже если 1 день без повторения (т.е. false)
};

const getCurrentDate = () => {
  let currentDate = new Date();
  currentDate.setHours(23, 59, 99, 999);
  return new Date(currentDate);
};

const isTaskExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }
  const currentDate = getCurrentDate();
  return currentDate.getTime() > dueDate.getTime();
};

const isTaskExpiredToday = (dueDate) => {
  if (dueDate === null) {
    return false;
  }
  const currentDate = getCurrentDate();
  return currentDate.getTime() === dueDate.getTime();
};

const formattedDate = (date, options) => date.toLocaleString(`en-US`, {day: options.days, month: options.month});

export {render, isTaskRepeating, isTaskExpired, isTaskExpiredToday, formattedDate};
