import React, { useEffect, useState, useRef } from 'react';
import AuthUser from 'shared/AuthUser';

const Appointment = () => {
  const index = 0;
  const [voteList, setVoteList] = useState([
    {
      name: '장서윤',
      generation: '1',
    },
  ]);

  return (
    <AuthUser>
      <div className="font-basic flex flex-1 md:flex-row flex-col items-center justify-between p-2">
        <div className="bg-violet-50 p-2 md:w-3/12 w-11/12 h-full flex flex-col text-center ">
          이사했습니다~ 활동인원 관리만 합니다~~
        </div>
      </div>
    </AuthUser>
  );
};

export default Appointment;
