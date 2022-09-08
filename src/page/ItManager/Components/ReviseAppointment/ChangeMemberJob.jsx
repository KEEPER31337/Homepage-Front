import React from 'react';
import CreateBtn from './CreateBtn';
const ChangeMemberJob = ({
  selectJob,
  genMemberList,
  jobMemberList,
  setJobMemberList,
}) => {
  return (
    <div className="flex flex-col items-center justify-between  bg-white w-full h-full">
      <div className="bg-white grid grid-cols-3  lg:grid-cols-5 w-full h-fit p-1">
        {genMemberList.map((member) => (
          <CreateBtn
            key={member.id}
            selectJob={selectJob}
            member={member}
            jobMemberList={jobMemberList}
            setJobMemberList={setJobMemberList}
          />
        ))}
      </div>
    </div>
  );
};

export default ChangeMemberJob;
