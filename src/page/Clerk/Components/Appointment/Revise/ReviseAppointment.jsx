import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Content from './Content';
import getContentData from './ReviseGetContentData';

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

  //선택한 사람들 직책 변경
  const [changeItems, setChangeItems] = useState(new Set());

  const navigate = useNavigate();

  const reviseClick = () => {
    setChangeItems(changeItems);
    changeItems.forEach((item) =>
      clerkAPI
        .changeType({
          token: member.token,
          memberId: item.memberId,
          typeId: item.type,
        })
        .then((data) => {
          if (data.success) {
            console.log('--');
          }
        })
    );

    navigate('/clerk');
    // window.location.reload();
  };

  return (
    <div className="font-basic flex shadow-md rounded-md flex-1 flex-col items-center justify-between m-2">
      <Header setGen={setGen} />
      <div className="bg-white w-full h-[60vh] scrollbar-hide overflow-y-scroll flex flex-col text-center ">
        <div className=" grid grid-cols-4 md:grid-cols-5 p-2 w-full h-fit text-center">
          <Content
            type={NON}
            typeMemberList={non}
            changeItems={changeItems}
            //  AllmemberList={currentMemberList}
          />
        </div>
        <div className=" grid grid-cols-4 md:grid-cols-5 p-2 w-full h-fit text-center">
          <Content
            type={REGULAR}
            typeMemberList={regular}
            changeItems={changeItems}
            //  AllmemberList={currentMemberList}
          />
        </div>
        <div className=" grid grid-cols-4 md:grid-cols-5 p-2 w-full h-fit text-center">
          <Content
            type={SLEEP}
            typeMemberList={sleep}
            changeItems={changeItems}
            //  AllmemberList={currentMemberList}
          />
        </div>
        <div className=" grid grid-cols-4 md:grid-cols-5 p-2 w-full h-fit text-center">
          <Content
            type={GRADUATE}
            typeMemberList={graduate}
            changeItems={changeItems}
            //  AllmemberList={currentMemberList}
          />
        </div>
      </div>
      <div className="w-full bg-white rounded-md items-center flex justify-end p-2">
        <div className="px-2 pl-4">완료 버튼을 눌러주세요!</div>
        <div
          className="text-center bg-amber-200 hover:bg-amber-300 border-b-4  border-amber-400 w-20 p-1 rounded-md cursor-pointer"
          onClick={reviseClick}
        >
          완료
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Appointment);
