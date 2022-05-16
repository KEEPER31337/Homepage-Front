const add0 = (num, maxDigits) => {
  let digits = 10;
  let result = num.toString();
  for (let i = 1; i < maxDigits; i++) {
    if (parseInt(num / digits) == 0) result = '0' + result;
    digits *= 10;
  }
  return result;
};

const stringfyDate = (dateClass) => ({
  year: add0(dateClass.getFullYear(), 4),
  month: add0(dateClass.getMonth() + 1, 2),
  date: add0(dateClass.getDate(), 2),
});

export const formatDate = ({ origin, separator }) => {
  if (!origin) return;
  const { year, month, date } = stringfyDate(new Date(origin));
  return [year, month, date].join(separator);
};
