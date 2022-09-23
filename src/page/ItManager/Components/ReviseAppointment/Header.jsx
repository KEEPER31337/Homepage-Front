import React from 'react';
import DeleteBtn from './DeleteBtn';
import GenerationSelect from './GenerationSelect';
const Header = ({
  selectJob,
  gen,
  setGen,
  jobMemberList,
  setJobMemberList,
  isDark,
}) => {
  return (
    <div
      className={
        isDark
          ? 'flex flex-row items-center justify-between rounded-t-lg bg-amber-200 w-full'
          : 'flex flex-row items-center justify-between rounded-t-lg bg-violet-200  w-full'
      }
    >
      <div className=" grid grid-cols-2   lg:grid-cols-4 w-full h-fit p-1">
        {jobMemberList.map((member) => (
          <DeleteBtn
            key={member.memberId}
            member={member}
            isDark={isDark}
            selectJob={selectJob}
            jobMemberList={jobMemberList}
            setJobMemberList={setJobMemberList}
          />
        ))}
      </div>
      <div className="flex w-fit">
        <GenerationSelect gen={gen} setGen={setGen} isDark={isDark} />
      </div>
    </div>
  );
};

export default Header;
