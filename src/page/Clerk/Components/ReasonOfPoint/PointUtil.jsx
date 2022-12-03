//여러 파일에서 사용할 함수 모음
const compareName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};
const compareRanking = (a, b) => {
  if (a.totalMerit === b.totalMerit) {
    return a.totalDemerit > b.totalDemerit;
  }
  return a.totalMerit < b.totalMerit;
};
function getNow() {
  //오늘 날짜 반환
  return new Date().toISOString().substring(0, 10);
}

export { compareName, compareRanking, getNow };
