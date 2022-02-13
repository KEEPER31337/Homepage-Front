function getDateWithFormat(boardDate) {
  return boardDate.substring(2, 16).replace('T', ' ');
}
function getDiffTimeWithFormat(boardDate) {
  let now = new Date();
  let board = new Date(boardDate.substring(0, 16).split('T'));
  var sec = (now.getTime() - board.getTime()) / 1000;
  if (sec < 60 * 60 * 24) {
    var min = parseInt(sec / 60);
    var hour = parseInt(min / 60);
    //console.log(min, hour);
    if (min < 60) {
      return min + '분 전';
    }
    return hour + '시간 전';
  }
  return boardDate.substring(2, 16).split('T')[0];
}
function isNewPost(boardDate) {
  let now = new Date();
  let board = new Date(boardDate.substring(0, 16).split('T'));
  if (now.getTime() - board.getTime() < 1000 * 60 * 60 * 24) {
    return true;
  }
  return false;
}

export { getDateWithFormat, getDiffTimeWithFormat, isNewPost };
