import React, { useEffect, useState } from 'react';
import memberAPI from 'API/v1/member';

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
  {
    postId: '4',
    postBoard: 'testBoard4',
    postTitle: 'testPost4',
    createdAt: new Date(),
    showCnt: 12,
    recoCnt: 2,
  },
  {
    postId: '5',
    postBoard: 'testBoard5',
    postTitle: 'testPost5',
    createdAt: new Date(),
    showCnt: 14,
    recoCnt: 4,
  },
  {
    postId: '6',
    postBoard: 'testBoard6',
    postTitle: 'testPost6',
    createdAt: new Date(),
    showCnt: 10,
    recoCnt: 1,
  },
  {
    postId: '7',
    postBoard: 'testBoard7',
    postTitle: 'testPost7',
    createdAt: new Date(),
    showCnt: 12,
    recoCnt: 2,
  },
  {
    postId: '8',
    postBoard: 'testBoard8',
    postTitle: 'testPost8',
    createdAt: new Date(),
    showCnt: 14,
    recoCnt: 4,
  },
  {
    postId: '9',
    postBoard: 'testBoard9',
    postTitle: 'testPost9',
    createdAt: new Date(),
    showCnt: 10,
    recoCnt: 1,
  },
  {
    postId: '10',
    postBoard: 'testBoard10',
    postTitle: 'testPost10',
    createdAt: new Date(),
    showCnt: 10,
    recoCnt: 1,
  },
];

function add0(num, maxDigits) {
  let digits = 10;
  let result = num.toString();
  for (let i = 1; i < maxDigits; i++) {
    if (parseInt(num / digits) == 0) result = '0' + result;
    digits *= 10;
  }
  return result;
}

function dateFormat(date) {
  return `${add0(date.getFullYear(), 4)}.${add0(date.getMonth() + 1, 2)}.${add0(
    date.getDate(),
    2
  )}`;
}

export default function PostList(props) {
  const token = props.token;
  const [postList, setPostList] = useState(new Array());

  useEffect(() => {
    const page = 0;
    const size = 10;
    memberAPI.getUsersPosts({ token, page, size }).then((result) => {
      if (result.success) {
        setPostList(
          result.list.map((item, index) => ({
            postId: index,
            postBoard: item.category,
            postTitle: item.title,
            createdAt: item.registerTime,
            showCnt: item.visitCount,
            recoCnt: item.likeCount,
          }))
        );
      }
    });
  }, []);

  if (postList.length == 0) {
    return (
      <div
        className="w-full min-h-[20vh] rounded-lg 
                      overflow-hidden text-pointYellow flex
                      justify-center items-center"
      >
        <div className="h-10 text-xl">작성한 게시글이 없습니다</div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full inline-block rounded-lg overflow-hidden dark:text-mainWhite">
        <table className="w-full">
          <thead>
            <tr className="h-10">
              {theadList.map((thead) => (
                <th className="bg-mainYellow">{thead}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {postList.map((post) => (
              <tr
                className="w-full h-10 hover:bg-divisionGray dark:hover:bg-[#0b1523] select-none"
                onClick={() => {
                  console.log(post.postId);
                }}
              >
                <td className="text-center">{post.postId}</td>
                <td className="text-center">{post.postBoard}</td>
                <td className="text-center">{post.postTitle}</td>
                <td className="text-center">{dateFormat(post.createdAt)}</td>
                <td className="text-center">{post.showCnt}</td>
                <td className="text-center">{post.recoCnt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
