
const isTaskRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean); // возвращаем false даже если 1 день без повторения (т.е. false)
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

// таски без дат дедлайна ставим в конец списка
const getWeightForNullDate = (dateA, dateB) => {

  if (dateA.dueDate === null && dateB.dueDate === null) {
    return 0;
  }
  if (dateA.dueDate === null) {
    return 1;
  }
  if (dateB.dueDate === null) {
    return -1;
  }

  return null;
};

const sortByDateUp = (dateA, dateB) => {
  const weight = getWeightForNullDate(dateA, dateB);

  if (weight !== null) {
    return weight;
  }

  return dateA.dueDate.getTime() - dateB.dueDate.getTime();
};

const sortByDateDown = (dateA, dateB) => {
  const weight = getWeightForNullDate(dateA, dateB);

  if (weight !== null) {
    return weight;
  }
  return dateB.dueDate.getTime() - dateA.dueDate.getTime();
};

export {isTaskExpired, isTaskRepeating, isTaskExpiredToday, sortByDateUp, sortByDateDown};
