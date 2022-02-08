import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

//local
import testData from 'page/Board/testData';

const MAX_POSTS = 3; //한 페이지당 노출시킬 최대 게시글 수
const pageN = Math.ceil(testData.maxNo / MAX_POSTS); //페이지 수

const setPageButton = (currentPage, page) => {
  if (currentPage == page) return 'text-mainYellow border-mainYellow';
  else return 'text-mainBlack dark:text-mainWhite';
};

const Table = (selected = null) => {
  const [boardContent, setBoardContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //console.log(currentPage); //현재 페이지
  const { no } = useParams();

  const getCurrentBoard = (no, currentNo) => {
    if (no == currentNo) return 'border-2 border-mainYellow';
    return;
  };

  useEffect(() => {
    var end = 0;
    if (currentPage * MAX_POSTS > testData.maxNo) end = testData.maxNo;
    else end = currentPage * MAX_POSTS;
    const boards = testData.boards.slice((currentPage - 1) * MAX_POSTS, end); //나중에 이 부분을 특정 개수의 게시글 데이터를 DB에서 직접 불러오는 것으로 수정
    setBoardContent(boards);
  }, [currentPage]); //currentPage 값이 변경될 때마다

  return (
    <div className="border-4 border-black dark:bg-mainBlack dark:text-mainWhite ">
      <p>
        Total <span className="text-mainYellow">{testData.maxNo}</span>
      </p>
      <table className="border-collaps border border-slate-400 w-full mb-5">
        <thead>
          <tr className="bg-mainYellow ">
            <th className="p-1 border border-slate-300 rounded-tl-xl">No.</th>
            <th className="border border-slate-300 w-3/5">제목</th>
            <th className="border border-slate-300">글쓴이</th>
            <th className="border border-slate-300">날짜</th>
            <th className="border border-slate-300 rounded-tr-xl">조회수</th>
          </tr>
        </thead>
        <tbody>
          {boardContent.map((board) => (
            <tr
              key={board.no}
              className={
                'hover:text-mainYellow hover:shadow-lg ' +
                getCurrentBoard(board.no, no)
              }
            >
              <td className="border border-slate-300 text-center">
                {board.no}
              </td>

              <td className="p-2 border border-slate-300 ">
                <Link
                  to={{
                    pathname: `/board/${board.no}`,
                    state: { test: 'test' },
                  }}
                >
                  <p className="">
                    {board.title + (board.file ? ' (F) ' : '')}
                  </p>
                </Link>
              </td>

              <td className="border border-slate-300 text-center">
                {board.user}
              </td>
              <td className="border border-slate-300 text-center">
                {board.date}
              </td>
              <td className="border border-slate-300 text-center">
                {board.watch}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div name="bottom" className="border border-red-400">
        <div name="search">
          <select className="border text-mainBlack" name="search rule">
            <option value="제목+내용">제목+내용</option>
            <option value="제목">제목</option>
            <option value="내용">내용</option>
            <option value="작성자">작성자</option>
          </select>
          <input type="text" className="border" placeholder="검색어"></input>
          <button className="border-2 border-mainYellow rounded-lg  m-2 shadow-lg p-2 active:mr-1 active:ml-3 active:shadow-none ">
            검색
          </button>
        </div>
        <p className="text-center">
          {[...Array(pageN).keys()].map((pageNum) => (
            <button
              key={pageNum}
              className={
                'border-2 text-2xl m-1 rounded-lg px-1  ' +
                setPageButton(currentPage, pageNum + 1)
              }
              onClick={() => {
                setCurrentPage(pageNum + 1);
              }}
            >
              {pageNum + 1}
            </button>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Table;
