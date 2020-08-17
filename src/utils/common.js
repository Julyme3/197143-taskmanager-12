const formattedDate = (date, options) => date.toLocaleString(`en-US`, {day: options.days, month: options.month});

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export {formattedDate, getRandomInteger};
