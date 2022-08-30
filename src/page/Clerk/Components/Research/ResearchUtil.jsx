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
const getProgress = (startDate, startTime, endDate, endTime) => {
  //현재 종료됐는지 진행중인지 예정인지 여부
  const now = new Date();
  const start = new Date(startDate + 'T' + startTime);
  const end = new Date(endDate + 'T' + endTime);
  if (now < start) return 'P'; //예정
  else if (now > end) return 'E'; //종료
  else return 'R';
};
export { makeSurveyName, makeTime, getNow, getTime, isClerk, getProgress };
