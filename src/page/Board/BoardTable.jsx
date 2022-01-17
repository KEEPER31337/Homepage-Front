import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import testData from 'page/Board/testData';

const MAX_BOARDS = 3; //한 페이지당 노출시킬 최대 게시글 수
const pageN = Math.ceil(testData.maxNo / MAX_BOARDS); //페이지 수

const tags = (pageN) => {
  for (let i = 1; i <= pageN; i++) {
    <button
      className="border text-red-400"
      onClick={() => {
        setCurrentPage({ i });
      }}
    >
      test
    </button>;
  }
};

const BoardTable = (selected = null) => {
  const [boardContent, setBoardContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //console.log(currentPage); //현재 페이지
  const array = Array(pageN);

  useEffect(() => {
    var end = 0;
    if (currentPage * MAX_BOARDS > testData.maxNo) end = testData.maxNo;
    else end = currentPage * MAX_BOARDS;
    const boards = testData.boards.slice((currentPage - 1) * MAX_BOARDS, end);
    setBoardContent(boards);
  }, [currentPage]);

  return (
    <div className="border-4 border-black ">
      <p>
        Total <span className="text-mainYellow">{testData.maxNo}</span>
      </p>
      <table className="border-collaps border border-slate-400 w-full mb-5">
        <thead>
          <tr className="bg-mainYellow">
            <th class="border border-slate-300">No.</th>
            <th class="border border-slate-300 w-3/5">제목</th>
            <th class="border border-slate-300">글쓴이</th>
            <th class="border border-slate-300">날짜</th>
            <th class="border border-slate-300">조회수</th>
          </tr>
        </thead>
        <tbody>
          {boardContent.map((board) => (
            <tr key={board.no}>
              <td class="border border-slate-300 text-center">{board.no}</td>

              <td class="border border-slate-300">
                <Link
                  to={{
                    pathname: `/board/${board.no}`,
                    state: { test: 'test' },
                  }}
                >
                  {board.title + (board.file ? 'file' : '')}
                </Link>
              </td>

              <td class="border border-slate-300 text-center">{board.user}</td>
              <td class="border border-slate-300 text-center">{board.date}</td>
              <td class="border border-slate-300 text-center">{board.watch}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div name="bottom" className="border border-red-400">
        <div name="search">
          <select className="border" name="search rule">
            <option value="제목+내용">제목+내용</option>
            <option value="제목">제목</option>
            <option value="내용">내용</option>
            <option value="작성자">작성자</option>
          </select>
          <input type="text" className="border" placeholder="검색어"></input>
          <button className="border-2 border-mainYellow rounded-lg">
            검색
          </button>
        </div>
        <p className="text-center">
          {tags(pageN)}
          {'<< <'} 1 2 3 4 5 6 7 8 9 10 {'> >>'}
        </p>
        <button
          className="border text-red-400"
          onClick={() => {
            setCurrentPage(1);
          }}
        >
          1페이지
        </button>
        <button
          className="border text-red-400"
          onClick={() => {
            setCurrentPage(2);
          }}
        >
          2페이지
        </button>
      </div>
    </div>
  );
};

export default BoardTable;
