import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const navList = [
  { title: '글쓰기 임시저장', link: '../drafts' },
  { title: '작성글 조회', link: '../posts' },
  { title: '팔로우 목록', link: '../follows' },
  { title: '팔로워 목록', link: '../followers' },
  { title: '포인트 내역', link: '../points' },
  { title: '프로필로 돌아가기', link: null },
];

const MyPageNav = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[300px]  bg-divisionGray dark:bg-darkComponent rounded-tr-3xl mr-10 p-5">
      <ul>
        {navList.map((nav) => (
          <li className="my-5 mx-2 text-base hover:text-lg">
            <button
              onClick={() => {
                if (nav.link) {
                  navigate(nav.link, { replace: true });
                } else {
                  navigate(-1);
                }
              }}
            >
              {nav.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPageNav;
