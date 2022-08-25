//여러 파일에서 사용할 함수 모음

function getNow() {
  //오늘 날짜 반환
  return new Date().toISOString().substring(0, 10);
}

export { getNow };
