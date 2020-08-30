import moment from "moment";

const formattedDate = (date, options) => {
  if (!(date instanceof Date)) {
    return ``;
  }
  return moment(date).format(options);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export {formattedDate, getRandomInteger};
