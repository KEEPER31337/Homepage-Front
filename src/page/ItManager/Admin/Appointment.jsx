import React, { useEffect, useState, useRef } from 'react';
import AuthUser from 'shared/AuthUser';

import { connect } from 'react-redux';

import Job from '../Components/Appointment/Job';
import ChangeMemberJob from '../Components/Appointment/ChangeMemberJob';

//api
import itmanagerAPI from 'API/v1/itmanager';

const Appointment = ({ member }) => {
  const [allMemberList, setAllMemberList] = useState([
    {
      memberId: 1327,
      nickName: '이다은',
      generation: 11,
      profileImagePath: 'http://localhost:8080/v1/util/thumbnail/1399',
      hasJobs: [
        {
          id: 1,
          name: 'ROLE_회장',
          badgePath: 'https://keeper.or.kr/v1/util/thumbnail/11',
        },
        {
          id: 1,
          name: 'ROLE_회장',
          badgePath: 'https://keeper.or.kr/v1/util/thumbnail/11',
        },
      ],
    },
  ]);

  useEffect(() => {
    //TODO api 이름 현재파일이랑 통일
    itmanagerAPI
      .getAllRoleMemberList({
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setAllMemberList(data.list);
        }
        console.log(data);
      });
  }, []);

  //Member 컴포넌트에서 전달받은 정보 -> 2번째 박스에 넣어줄거임
  const [job, setJob] = useState(1);

  return (
    <AuthUser>
      <div className="font-basic flex flex-1 md:flex-row flex-col items-center justify-between p-2">
        <div className="bg-violet-50 p-2 md:w-3/12 w-11/12 h-full flex flex-col text-center ">
          {allMemberList.map((list) => (
            <Job key={list.memberId} list={list} job={job} setJob={setJob} />
          ))}
        </div>
        <div className="bg-violet-50 ml-2 md:w-9/12 w-full h-full flex flex-col text-center">
          {/* type선택 헤더로 나누기 */}
          {/* <div className="bg-violet-300 flex flex-row justify-end w-full h-fit p-1">
            <div className="h-fit w-fit  flex flex-row border-b-2 border-violet-200 bg-white hover:bg-violet-100 rounded-lg ">
              <div className="flex items-center justify-center w-full p-1">
                활동인원
              </div>
            </div>
            <div className="h-fit w-fit  flex flex-row border-b-2 border-violet-200 bg-white hover:bg-violet-100 rounded-lg ">
              <div className="flex items-center justify-center w-full p-1">
                휴면
              </div>
            </div>
          </div> */}

          {/* <ChangeMemberJob
            // key={selectedMemberInfo.memberId}
            job={job}
            // setAllMemberList={setAllMemberList}
          /> */}
        </div>
      </div>
    </AuthUser>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Appointment);
