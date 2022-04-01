import React, { Fragment, useState } from 'react';

import firstGradeBadge from 'assets/img/profileImg/badge/profile_badge_grade_first.gif';
import secondGradeBadge from 'assets/img/profileImg/badge/profile_badge_grade_second.gif';

import graduateBadge from 'assets/img/profileImg/badge/profile_badge_state_graduate.gif';
import quitBadge from 'assets/img/profileImg/badge/profile_badge_state_quit.png';
import reqularBadge from 'assets/img/profileImg/badge/profile_badge_state_regular.gif';
import sleepBadge from 'assets/img/profileImg/badge/profile_badge_state_sleep.gif';

import chairmanBadge from 'assets/img/profileImg/badge/profile_badge_role_chairman.gif';
import clerkBadge from 'assets/img/profileImg/badge/profile_badge_role_clerk.gif';
import externalManagerBadge from 'assets/img/profileImg/badge/profile_badge_role_external_manager.gif';
import generalAffairsBadge from 'assets/img/profileImg/badge/profile_badge_role_general_affairs.gif';
import ITManagerBadge from 'assets/img/profileImg/badge/profile_badge_role_it_manager.gif';
import ITManagerBadge2 from 'assets/img/profileImg/badge/profile_badge_role_it_manager2.gif';
import librarianBadge from 'assets/img/profileImg/badge/profile_badge_role_librarian.gif';
import studyManagerBadge from 'assets/img/profileImg/badge/profile_badge_role_study_manager.gif';
import viceChairmanBadge from 'assets/img/profileImg/badge/profile_badge_role_vice_chairman.gif';

import defaultBadge from 'assets/img/profileImg/badge/profile_badge_default.png';

const roles = {
  ROLE_회원: { name: '회원', img: defaultBadge, visible: false },
  ROLE_회장: { name: '회장', img: chairmanBadge, visible: true },
  ROLE_부회장: { name: '부회장', img: viceChairmanBadge, visible: true },
  ROLE_대외부장: { name: '대외부장', img: externalManagerBadge, visible: true },
  ROLE_학술부장: { name: '학술부장', img: studyManagerBadge, visible: true },
  ROLE_전산관리자: { name: '전산관리자', img: ITManagerBadge, visible: true },
  ROLE_서기: { name: '서기', img: clerkBadge, visible: true },
  ROLE_총무: { name: '총무', img: generalAffairsBadge, visible: true },
  ROLE_사서: { name: '사서', img: librarianBadge, visible: true },
};
const states = {
  정회원: { name: '정회원', img: reqularBadge, visible: true },
  비회원: { name: '비회원', img: defaultBadge, visible: false },
  휴면회원: { name: '휴면회원', img: sleepBadge, visible: true },
  졸업회원: { name: '졸업회원', img: graduateBadge, visible: true },
  탈퇴: { name: '탈퇴', img: quitBadge, visible: false },
};
const grades = {
  우수회원: { name: '우수회원', img: firstGradeBadge, visible: true },
  일반회원: { name: '일반회원', img: secondGradeBadge, visible: true },
};
const defaultGroup = { name: 'UnKnown', img: defaultBadge, visible: false };
const groups = { ...roles, ...states, ...grades };

export default function Group(props) {
  const group = groups[props.groupName]
    ? groups[props.groupName]
    : defaultGroup;
  const [tooltip, setTooltip] = useState(false);
  if (group.visible) {
    return (
      <div className="mr-2" key={group}>
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
  } else {
    return <Fragment key={group} />;
  }
}
