function getDateWithFormat(boardDate) {
  return boardDate.substring(2, 16).replace('T', ' ');
}

export { getDateWithFormat };
