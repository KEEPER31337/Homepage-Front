//여러 파일에서 사용할 함수 모음
const compareName = (a, b) => {
  if (a.realName < b.realName) {
    return -1;
  }
  if (a.realName > b.realName) {
    return 1;
  }
  return 0;
};
const compareRanking = (a, b) => {
  if (a.totalMerit === b.totalMerit) {
    if (a.totalDemerit === b.totalDemerit) {
      return compareName(a, b);
    }
    return a.totalDemerit - b.totalDemerit;
  }
  return b.totalMerit - a.totalMerit;
};
function getNow() {
  //오늘 날짜 반환
  return new Date().toISOString().substring(0, 10);
}

export { compareName, compareRanking, getNow };
