import React, { useState } from 'react';
import firstGradeBadge from 'assets/img/profileImg/badge/profile_badge_grade_first.png';
import secondGradeBadge from 'assets/img/profileImg/badge/profile_badge_grade_second.png';
import graduateBadge from 'assets/img/profileImg/badge/profile_badge_state_graduate.png';
import quitBadge from 'assets/img/profileImg/badge/profile_badge_state_quit.png';
import reqularBadge from 'assets/img/profileImg/badge/profile_badge_state_regular.png';
import sleepBadge from 'assets/img/profileImg/badge/profile_badge_state_sleep.png';
import defaultBadge from 'assets/img/profileImg/badge/profile_badge_default.png';

const roles = {
  ROLE_회장: { name: '회장', img: defaultBadge },
  ROLE_부회장: { name: '부회장', img: defaultBadge },
  ROLE_대외부장: { name: '대외부장', img: defaultBadge },
  ROLE_학술부장: { name: '학술부장', img: defaultBadge },
  ROLE_전산관리자: { name: '전산관리자', img: defaultBadge },
  ROLE_서기: { name: '서기', img: defaultBadge },
  ROLE_총무: { name: '총무', img: defaultBadge },
  ROLE_사서: { name: '사서', img: defaultBadge },
};
const states = {
  정회원: { name: '정회원', img: reqularBadge },
  비회원: { name: '비회원', img: defaultBadge },
  휴면회원: { name: '휴면회원', img: sleepBadge },
  졸업회원: { name: '졸업회원', img: graduateBadge },
  탈퇴: { name: '탈퇴', img: quitBadge },
};
const grades = {
  우수회원: { name: '우수회원', img: firstGradeBadge },
  일반회원: { name: '일반회원', img: secondGradeBadge },
};
const testGrups = {
  ROLE_회원: { name: '회원', img: firstGradeBadge },
  일반회원: { name: '일반회원', img: quitBadge },
  비회원: { name: '비회원', img: reqularBadge },
};
const groups = { ...roles, ...states, ...grades, ...testGrups };

export default function Group(props) {
  const group = groups[props.groupName];
  const [tooltip, setTooltip] = useState(false);
  return (
    <div>
      <img
        className="float-left rounded bg-mainWhite"
        src={group?.img ? group.img : defaultBadge}
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
      />
      {tooltip && (
        <div role="tooltip" className="relative text-sm">
          <div className="absolute bottom-2 ">
            <div
              className="bg-amber-400 w-[80px] h-[40px] bg-opacity-75 
                              rounded-md flex justify-center items-center 
                              shadow shadow-zinc-400/40 "
            >
              {group?.name}
            </div>
            <div
              className="absolute w-0 h-0 border-opacity-75
               
                            border-r-[6px] border-r-transparent 
                            border-l-[6px] border-l-transparent
                            border-t-[7px] border-t-amber-400 
                            top-[100%] right-[70%]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
