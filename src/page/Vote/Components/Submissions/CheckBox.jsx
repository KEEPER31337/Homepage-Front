import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

const CheckBox = ({ members, checkedItemHandler, currentItem }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(currentItem?.has(members.memberId));
  }, [currentItem]);

  const checkHandler = ({ target }) => {
    setChecked(!checked);
    checkedItemHandler(members, target.checked);
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => checkHandler(e)}
      className="w-6 h-6 checked:bg-gray-500 text-gray-600 bg-gray-100 rounded-md border-gray-400 focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
  );
};
const mapStateToProps = (state) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(CheckBox);
