import React from 'react';
import MemberBtn from './MemberBtn';

const Header = ({ selectJob, jobMemberList }) => {
  return (
    <div className="flex flex-col items-center justify-between bg-violet-100 w-full">
      <div className="bg-violet-200 grid grid-cols-4 w-full h-12 p-2">
        {jobMemberList.map((member) => (
          <MemberBtn
            key={member.memberId}
            member={member}
            selectJob={selectJob}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;
