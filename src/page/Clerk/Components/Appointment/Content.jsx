import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Marquee from 'react-fast-marquee';

const Content = ({ typeMemberList }) => {
  useEffect(() => {
    console.log(typeMemberList);
  }, [typeMemberList]);

  return (
    <div className="bg-violet-50 px-2 w-full h-full flex flex-col text-center ">
      <div className="grid grid-cols-6 w-full h-fit  text-center ">
        {typeMemberList.map((member) => (
          <div className="bg-white border-b h-fit border-violet-200 flex flex-row justify-start  mt-1 mx-[2px] text-slate-800 rounded">
            <div className="p-1">
              <img src={member.profileImagePath} className="h-9 w-9 rounded" />
            </div>
            <div className="flex  items-center">
              <div className="text-sm text-slate-400">
                {`${member.generation === null ? '?' : member.generation}기`}
              </div>
              <div className="px-2 ">{member.nickName}</div>
            </div>
          </div>
          //   <CheckContent
          //   key={index}
          //   member={member}
          //   checkedItemHandler={checkedItemHandler}
          //   currentItem={currentItem}
          // />
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Content);
