import axios from 'axios';
import React, { useEffect, useState } from 'react';
const theadList = ['번호', '게시판', '제목', '날짜', '조회수', '추천수'];

const dumyPostList = [
  {
    postId: '1',
    postBoard: 'testBoard1',
    postTitle: 'testPost1',
    createdAt: new Date(),
    showCnt: 12,
    recoCnt: 2,
  },
  {
    postId: '2',
    postBoard: 'testBoard2',
    postTitle: 'testPost2',
    createdAt: new Date(),
    showCnt: 14,
    recoCnt: 4,
  },
  {
    postId: '3',
    postBoard: 'testBoard3',
    postTitle: 'testPost3',
    createdAt: new Date(),
    showCnt: 10,
    recoCnt: 1,
  },
];

export default function PostList(props) {
  const [postList, setPostList] = useState(new Array());

  useEffect(async () => {
    try {
      setPostList(dumyPostList);
      console.log(postList);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="w-full h-full inline-block rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="h-10">
            {theadList.map((thead) => (
              <th className="bg-[#c0c0c0]">{thead}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {postList.map((post) => (
            <tr className="w-full h-10">
              <td>{post.postId}</td>
              <td>{post.postBoard}</td>
              <td>{post.postTitle}</td>
              <td>date</td>
              <td>{post.showCnt}</td>
              <td>{post.recoCnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
