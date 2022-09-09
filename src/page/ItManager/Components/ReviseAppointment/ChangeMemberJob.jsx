import React from 'react';
import CreateBtn from './CreateBtn';
const ChangeMemberJob = ({
  selectJob,
  genMemberList,
  jobMemberList,
  setJobMemberList,
  isDark,
}) => {
  return (
    <div
      className={
        isDark
          ? 'flex flex-col items-center justify-between  bg-white w-full h-full'
          : 'flex flex-col items-center justify-between  bg-darkPoint w-full h-full'
      }
    >
      <div
        className={
          isDark
            ? 'bg-white grid grid-cols-3  lg:grid-cols-5 w-full h-fit p-1'
            : 'bg-darkPoint grid grid-cols-3  lg:grid-cols-5 w-full h-fit p-1'
        }
      >
        {genMemberList.map((member) => (
          <CreateBtn
            key={member.id}
            selectJob={selectJob}
            member={member}
            jobMemberList={jobMemberList}
            setJobMemberList={setJobMemberList}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
};

export default ChangeMemberJob;
