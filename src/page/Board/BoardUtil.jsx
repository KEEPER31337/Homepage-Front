function getDateWithFormat(boardDate) {
  return boardDate.substring(2, 16).replace('T', ' ');
}
function getDiffTimeWithFormat(boardDate) {
  //24시간 이내에 등록된 경우
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
function getDiffTimeWithFormat2(boardDate) {
  //시간까지 가져오기
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
  return getDateWithFormat(boardDate);
}
function isNewPost(boardDate) {
  let now = new Date();
  let board = new Date(boardDate.substring(0, 16).split('T'));
  if (now.getTime() - board.getTime() < 1000 * 60 * 60 * 24) {
    return true;
  }
  return false;
}
const formatFileSize = (size) => {
  //파일 크기의 단위 처리
  const kb = parseInt(size / 1000);
  if (kb < 10000) {
    return kb + 'KB';
  } else {
    const mb = parseInt(kb / 1000);
    if (mb < 10000) {
      return mb + 'MB';
    }
    return parseInt(mb / 1000) + 'GB';
  }
};

export {
  getDateWithFormat,
  getDiffTimeWithFormat,
  isNewPost,
  formatFileSize,
  getDiffTimeWithFormat2,
};
