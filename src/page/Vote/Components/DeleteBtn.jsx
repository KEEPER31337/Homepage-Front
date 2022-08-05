import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-awesome-modal';
import ctfAPI from 'API/v1/ctf';
import { connect } from 'react-redux';

const DeleteBtn = ({ challengeId }) => {
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
      className="w-6 h-6 checked:bg-gray-500 text-gray-600 bg-gray-100 rounded-md border-gray-400 focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(DeleteBtn);
