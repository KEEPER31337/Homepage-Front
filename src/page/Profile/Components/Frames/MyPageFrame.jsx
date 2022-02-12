import React from 'react';
import MyPageNav from '../MyPageNav';
import PropTypes from 'prop-types';

const MyPageFrame = ({ renderHead, items, itemHeads }) => {
  const defaultHead = () => <></>;

  return (
    <div className="bg-mainWhite dark:bg-mainBlack pt-20 overflow-auto flex-row">
      <div className="flex justify-start mx-auto w-[900px] bg-backGray dark:bg-darkPoint rounded-3xl shadow-2xl overflow-auto p-5">
        <MyPageNav />
        <div className="w-full h-full mr-5">
          {renderHead != null ? renderHead() : defaultHead()}
        </div>
      </div>
    </div>
  );
};

MyPageFrame.prototype = {
  renderHead: PropTypes.func,
  items: PropTypes.array.isRequired,
  itemHeads: PropTypes.array.isRequired,
};

MyPageFrame.defaultProps = {
  renderHead: null,
};

export default MyPageFrame;
