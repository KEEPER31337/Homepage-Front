import NavigationLayout from '../Components/NavigationLayout';
import { connect } from 'react-redux';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Table from '../Components/Table';

import ctfAPI from 'API/v1/ctf';
const Submissions = ({ member, memberSignIn }) => {
  useEffect(() => {
    ctfAPI
      .getSubmitLog({
        token: member.token,
        page: 0,
        size: 7,
      })
      .then((data) => {
        if (data.success) {
          console.log(data);
        }
      });
  }, []);
  const tableHead = [
    '번호',
    '문제이름',
    '팀',
    '제출자',
    '제출한 flag',
    '제출 시간',
    '성공여부',
  ];
  const [tableBody, setTableBody] = useState([
    [
      '1',
      '포렌식-냠냠문제',
      '장서윤 바보팀',
      '장서윤',
      '[flag지롱지롱]',
      '2022-2-7',
      '성공',
    ],
  ]);
  return (
    <div className="bg-mainWhite dark:bg-mainBlack min-h-screen">
      {/* 기존 홈페이지 헤더에 맞추기 위해,  */}
      <div className="max-w-7xl mx-auto flex flex-row">
        {/*사이드바*/}
        <NavigationLayout />
        <div className="md:w-4/5 flex flex-col flex-1 p-3">
          {/* 이제 여기서 추가할 컴포넌트 가져오면 됨!!! */}
          {/* <ScoreBoard/> */}
          <div className="">
            <div className=" w-full container mx-auto justify-center items-center">
              {/* 1. 커스텀 색상 팔레트 */}

              <div className="md:flex p-1 mt-2">
                <div className="w-full m-2 ">
                  <div className="p-1 bg-white">
                    <div className="flex justify-between m-1">
                      <div className="font-extrabold text-4xl m-1">
                        Submission-log
                      </div>
                    </div>
                  </div>
                  {/*구분선*/}
                  <div className="p-[2px] mb-2 bg-gradient-to-r from-amber-500 via-amber-200 to-yellow-300  "></div>
                  {/* 2.  프로필 이미지 + 팔로우 + 포인트 */}

                  <div className="w-full">
                    <Table
                      headList={tableHead}
                      bodyList={[...tableBody].reverse()}
                    ></Table>
                  </div>
                </div>
              </div>
              {/* NOTE 마이페이지 */}
              {/* 1. 마이페이지(작성글) 컴포넌트*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Submissions);
