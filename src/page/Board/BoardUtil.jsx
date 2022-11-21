import categoryMapper from './Components/categoryMapper';

function getDateWithFormat(boardDate) {
  return boardDate.substring(2, 16).replace('T', ' ');
}
function getDiffTimeWithFormat(boardDate) {
  //24시간 이내에 등록된 경우
  let now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000; //현재 시간의 UTC 시간
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000; //UTC 시간과 KST 시간 차(밀리초)
  const korNow = new Date(utc + KR_TIME_DIFF); //항상 현재 시간이 한국 시간 기준으로 측정되도록
  //console.log(korNow);
  let board = new Date(boardDate.substring(0, 16).split('T'));
  var sec = (korNow.getTime() - board.getTime()) / 1000;
  if (sec < 60 * 60 * 24) {
    if (sec < 60) {
      return parseInt(sec) + '초 전';
    }
    var min = parseInt(sec / 60);
    if (min < 60) {
      return min + '분 전';
    }
    var hour = parseInt(min / 60);
    return hour + '시간 전';
  }
  return boardDate.substring(2, 16).split('T')[0];
}
function getDiffTimeWithFormat2(boardDate) {
  //시간까지 가져오기(댓글에 사용)
  let now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000; //현재 시간의 UTC 시간
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000; //UTC 시간과 KST 시간 차(밀리초)
  const korNow = new Date(utc + KR_TIME_DIFF); //항상 현재 시간이 한국 시간 기준으로 측정되도록
  let board = new Date(boardDate.substring(0, 16).split('T'));
  var sec = (korNow.getTime() - board.getTime()) / 1000;
  if (sec < 60 * 60 * 24) {
    if (sec < 60) {
      return parseInt(sec) + '초 전';
    }
    var min = parseInt(sec / 60);
    if (min < 60) {
      return min + '분 전';
    }
    var hour = parseInt(min / 60);
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
