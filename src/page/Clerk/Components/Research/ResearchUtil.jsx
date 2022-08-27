//여러 파일에서 사용할 함수 모음
const makeSurveyName = (date, time) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};
const makeTime = (date, time) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};
const getNow = () => {
  return new Date().toISOString().substring(0, 10);
};
export { makeSurveyName, makeTime, getNow };
