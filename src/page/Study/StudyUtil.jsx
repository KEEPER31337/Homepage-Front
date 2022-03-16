function getCurrentYear() {
  //24시간 이내에 등록된 경우
  let now = new Date();
  let month = now.getMonth() + 1;
  //console.log(now.getFullYear());
  if (month > 0 && month < 3) return now.getFullYear() - 1;
  return now.getFullYear();
}
function getCurrentSeason() {
  let now = new Date();
  let month = now.getMonth() + 1;
  if (month > 0 && month < 3) return 4;
  if (month > 2 && month < 7) return 1;
  if (month > 6 && month < 9) return 2;
  else return 3;
}

export { getCurrentYear, getCurrentSeason };
