import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Marquee from 'react-fast-marquee';

//local
import memberImage from 'assets/img/memberCircle.svg';
import CheckBox from './CheckBox';

const ContentLG = ({ memberList, checkedItemHandler, currentItem }) => {
  const handleErrorImg = (e) => {
    e.target.src = memberImage;
  }; // 회원의 이미지가 없을때 보여줄 프로필사진
  return (
    <div className="hidden lg:block w-fit bg-slate-50  dark:bg-darkPoint border-gray-500 border-2 rounded-b-md rounded-tr-md">
      {/* 사람 체크 리스트  */}
      <div className="h-6 w-full bg-gray-500"></div>
      <div className="w-fit p-2">
        <div className="grid grid-cols-4 gap-2 m-2">
          {memberList?.map((member, index) => (
            <div
              key={index}
              className="flex flex-row justify-center items-center dark:bg-darkPoint dark:border-2  dark:border-slate-700 dark:text-white  bg-white rounded-lg px-2"
            >
              <img
                src={member.thumbnailPath ? member.thumbnailPath : memberImage}
                alt="profile"
                onError={handleErrorImg}
                className=" w-10 rounded-md object-center object-cover group-hover:opacity-75"
              />
              <div className="flex flex-col p-2 text-left">
                <div className="text-lg font-medium truncate w-28">
                  {member.nickName}
                </div>
                <div className="text-sm ">
                  {`Keeper ${
                    member.generation === null ? '?' : member.generation
                  }기`}
                </div>
              </div>
              <CheckBox
                members={member}
                checkedItemHandler={checkedItemHandler}
                currentItem={currentItem}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(ContentLG);
