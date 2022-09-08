import React, { useEffect, useState, useRef } from 'react';
import AuthUser from 'shared/AuthUser';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Appointment/Header';
import Content from '../Components/Appointment/Content';
import getContentData from '../Components/Appointment/GetContentData';

// api
import clerkAPI from 'API/v1/clerk';

const NON = 1; //비회원
const REGULAR = 2; // 정회원
const SLEEP = 3; // 휴면회원
const GRADUATE = 4; // 졸업
const QUIT = 5; //탈퇴

const Appointment = ({ member }) => {
  const [gen, setGen] = useState(13); // 2 == 초기엔 활동인원
  const [non, regular, sleep, graduate, quit] = getContentData({ member, gen });
  console.log(non, regular, sleep, graduate, quit);
  const navigate = useNavigate();

  const reviseClick = () => {
    navigate('/clerk/revise');
  };
  return (
    <AuthUser>
      <div className="bg-white dark:bg-darkPoint font-basic flex shadow-md rounded-md flex-1 flex-col items-center justify-between m-2">
        <Header setGen={setGen} />
        <div className="bg-white dark:bg-darkPoint w-full h-[60vh] scrollbar-hide overflow-y-scroll flex flex-col text-center ">
          <div className=" grid grid-cols-4 md:grid-cols-5 p-2 w-full h-fit text-center">
            <Content type={NON} typeMemberList={non} />
          </div>
          <div className=" grid grid-cols-4 md:grid-cols-5 p-2 w-full h-fit text-center">
            <Content type={REGULAR} typeMemberList={regular} />
          </div>
          <div className=" grid grid-cols-4 md:grid-cols-5 p-2 w-full h-fit text-center">
            <Content type={SLEEP} typeMemberList={sleep} />
          </div>
          <div className=" grid grid-cols-4 md:grid-cols-5 p-2 w-full h-fit text-center">
            <Content type={GRADUATE} typeMemberList={graduate} />
          </div>
        </div>
        <div className="w-full bg-white dark:bg-darkPoint rounded-md items-center flex justify-end p-2">
          <div
            className="text-center dark:bg-violet-200 dark:hover:bg-violet-300 dark:border-violet-400 bg-amber-200 hover:bg-amber-300 border-b-4  border-amber-400 w-20 p-1 rounded-md cursor-pointer"
            onClick={reviseClick}
          >
            수정
          </div>
        </div>{' '}
      </div>
    </AuthUser>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Appointment);
