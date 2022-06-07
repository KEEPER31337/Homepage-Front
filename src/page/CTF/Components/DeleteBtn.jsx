import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-awesome-modal';
import ctfAPI from 'API/v1/ctf';
import { connect } from 'react-redux';

const DeleteBtn = ({ challengeId, checkedItemHandler }) => {
  // 탈퇴 눌렀을때 뜨는 모달
  const [bChecked, setChecked] = useState(false);
  //   const [checkedItems, setCheckedItems] = useState(new Set());

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemHandler(challengeId, target.checked);
  };

  return (
    <input
      type="checkbox"
      checked={bChecked}
      onChange={(e) => checkHandler(e)}
      className="w-6 h-6 checked:bg-amber-300 text-yellow-400 bg-gray-100 rounded-md border-gray-300 focus:ring-amber-500 dark:focus:ring-amber-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(DeleteBtn);
