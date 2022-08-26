import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import memberAPI from 'API/v1/member';
const ChangeMemberJob = ({ member, job }) => {
  //해당 job에 해당하는 인원 목록 띄워주기
  const [jobMember, setJobMember] = useState([
    {
      memberId: 0,
      nickName: '회장-이다은',
      realName: 'RealName4a8cc1312845',
      generation: 13,
      thumbnailPath: 'https://keeper.or.kr/v1/util/thumbnail/1',
      hasJobs: [
        {
          id: 2,
          name: 'ROLE_부회장',
          badgePath: 'http://localhost:8080/v1/util/thumbnail/12',
        },
      ],
    },
  ]);

  const [checkedItems, setCheckedItems] = useState(new Set('1', '2'));
  // const checkedItemHandler = (challengeId, isChecked) => {
  //   if (isChecked) {
  //     checkedItems.add(challengeId);
  //     setCheckedItems(checkedItems);
  //   } else if (!isChecked && checkedItems.has(challengeId)) {
  //     checkedItems.delete(challengeId);
  //     setCheckedItems(checkedItems);
  //   }
  // };

  const [current, setCurrent] = useState(new Set());
  //후보자 인원 가져옴. ex) 이다은

  useEffect(() => {
    console.log(checkedItems);
    //TODO jobid가지고, 인원 목록 불러오기 -> 여러명일때 신경써줘야함,
    //TODO API!!
    // itmanagerAPI
    //   .getAllRoleMemberList({
    //     token: member.token,
    //   })
    //   .then((data) => {
    //     if (data.success) {
    //     }
    //     console.log(data);
    //   });

    memberAPI.getAllMembers().then((data) => {
      setJobMember(data.list);
    });
  }, [job]);

  return (
    <div className="flex flex-col items-center justify-between bg-violet-100 w-full h-full">
      <div className="bg-violet-50 grid grid-cols-4 w-full h-full p-1">
        {jobMember.map((member) => (
          <div className="bg-white border-b border-violet-200 flex flex-row justify-start  mt-1 mx-[2px] text-slate-800 rounded">
            <div className="p-1">
              <img src={member.thumbnailPath} className="h-9 w-9 rounded" />
            </div>
            <div className="flex  items-center">
              <div className="text-sm text-slate-400">{member.id}기</div>
              <div className="px-2 ">{member.nickName}</div>
            </div>
          </div>
          //    <DeleteBtn
          //    challengeId={info.challengeId}
          //    checkedItemHandler={checkedItemHandler}
          //  />
        ))}
      </div>
      <div></div>
      <div className="bg-violet-100 w-full h-fit flex justify-end p-2">
        <button className="bg-white hover:bg-violet-50 border-violet-200 hover:border-b-2 w-fit h-fit px-4 py-1 border-b-4 rounded-md">
          확인
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(ChangeMemberJob);
