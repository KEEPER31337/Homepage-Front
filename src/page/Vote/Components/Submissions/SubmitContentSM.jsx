import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Marquee from 'react-fast-marquee';

//local
import CheckContent from './CheckContent';

const ContentSM = ({ memberList, checkedItemHandler, currentItem }) => {
  return (
    <div className="md:hidden w-fit bg-slate-50 border-gray-500 border-2 rounded-b-md rounded-tr-md">
      {/* 사람 체크 리스트  */}
      <div className="h-6 w-full bg-gray-500"></div>
      <div className="w-fit p-2">
        <div className="grid grid-cols-4 gap-2 m-2">
          {memberList?.map((member, index) => (
            <CheckContent
              key={index}
              member={member}
              checkedItemHandler={checkedItemHandler}
              currentItem={currentItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(ContentSM);
