import React from 'react';
import { Link } from 'react-router-dom';

const navList = [
  { title: '스크랩 게시물 조회', link: '../clipping' },
  { title: '글쓰기 임시저장', link: '../drafts' },
  { title: '작성글 조회', link: '../posts' },
  { title: '친구 관리', link: '../friends' },
  { title: '포인트 내역', link: '../points' },
];

const MyPageNav = () => {
  return (
    <div className="w-[300px]  bg-divisionGray dark:bg-darkComponent rounded-tr-3xl mr-10 p-5">
      <ul>
        {navList.map((nav) => (
          <li className="my-5 mx-2 text-base hover:text-lg">
            <Link to={nav.link}>{nav.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPageNav;
