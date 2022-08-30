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
const getTime = () => {
  return new Date().toISOString().substring(11, 19);
};
const isClerk = (jobs) => {
  //관리자인지 여부
  if (
    jobs.filter((job) => job === 'ROLE_회장' || job === 'ROLE_서기').length > 0
  )
    return true;
  return false;
};
export { makeSurveyName, makeTime, getNow, getTime, isClerk };
