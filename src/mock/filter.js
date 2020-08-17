import {isTaskExpired, isTaskRepeating, isTaskExpiredToday} from "../utils/task";

const isNotArchiveTask = (task) => {
  return !task.isArchive;
};

const generateFilter = (tasks) => {
  return [
    {
      title: `all`,
      count: tasks.filter(isNotArchiveTask).length
    },
    {
      title: `overdue`,
      count: tasks
        .filter(isNotArchiveTask)
        .filter((task) => isTaskExpired(task.dueDate)).length,
    },
    {
      title: `today`,
      count: tasks
        .filter(isNotArchiveTask)
        .filter((task) => isTaskExpiredToday(task.dueDate)).length
    },
    {
      title: `favorites`,
      count: tasks
        .filter(isNotArchiveTask)
        .filter((task) => task.isFavorite).length
    },
    {
      title: `repeating`,
      count: tasks
        .filter(isNotArchiveTask)
        .filter((task) => isTaskRepeating(task.repeatingDays)).length
    },
    {
      title: `archive`,
      count: tasks.filter(isNotArchiveTask).length
    }
  ];
};

export {generateFilter};
