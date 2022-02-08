import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  SearchIcon,
  PhotographIcon,
  DocumentTextIcon,
} from '@heroicons/react/solid';
//local
import testData from 'page/Board/testData';

const MAX_POSTS = 3; //한 페이지당 노출시킬 최대 게시글 수
const pageN = Math.ceil(testData.maxNo / MAX_POSTS); //페이지 수

const setPageButton = (currentPage, page) => {
  //현재 페이지
  if (currentPage == page)
    return 'z-10 bg-mainWhite border-mainYellow text-mainYellow dark:bg-mainBlack';
  else
    return 'bg-mainWhite border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-mainBlack dark:text-mainWhite';
};
const hiddenPrevious = (currentPage) => {
  //맨 앞 페이지인지
  if (currentPage == 1) return 'hidden';
  return '';
};
const hiddenNext = (currentPage) => {
  //맨 뒤 페이지인지
  if (currentPage == pageN) return 'hidden';
  return '';
};

const Table = (selected = null) => {
  const [boardContent, setBoardContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //console.log(currentPage); //현재 페이지
  const { no } = useParams();

  const getCurrentBoard = (no, currentNo) => {
    //현재 게시글
    if (no == currentNo) return 'text-mainYellow  rounded-lg';
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
    <div className="dark:bg-mainBlack dark:text-mainWhite ">
      <p>
        Total <span className="text-mainYellow">{testData.maxNo}</span>
      </p>

      <table className="w-full mb-5">
        <thead>
          <tr className="bg-mainYellow ">
            <th className="border-x border-mainWhite p-1 rounded-tl-xl dark:border-mainBlack">
              No.
            </th>
            <th className="border-x border-mainWhite p-1  w-3/5 dark:border-mainBlack">
              제목
            </th>
            <th className="border-x border-mainWhite p-1 dark:border-mainBlack">
              글쓴이
            </th>
            <th className="border-x border-mainWhite p-1 dark:border-mainBlack">
              날짜
            </th>
            <th className="border-x border-mainWhite p-1 rounded-tr-xl dark:border-mainBlack">
              조회수
            </th>
          </tr>
        </thead>
        <tbody>
          {boardContent.map((board) => (
            <tr
              key={board.no}
              className={
                'border-b-2 hover:bg-slate-100 hover:shadow-lg dark:hover:bg-darkComponent ' +
                getCurrentBoard(board.no, no)
              }
            >
              <td className="border-r border-divisionGray text-center dark:border-darkComponent">
                {board.no}
              </td>

              <td className="p-2 dark:border-darkComponent">
                <Link
                  to={{
                    pathname: `/board/${board.no}`,
                    state: { test: 'test' },
                  }}
                >
                  <p className="text-ellipsis overflow-hidden">
                    {board.title}
                    {board.image ? (
                      <PhotographIcon className="inline-block h-5 w-5 " />
                    ) : (
                      ''
                    )}
                    {board.file ? (
                      <DocumentTextIcon className="inline-block h-5 w-5" />
                    ) : (
                      ''
                    )}
                  </p>
                </Link>
              </td>

              <td className=" text-center dark:border-darkComponent">
                {board.user}
              </td>
              <td className=" text-center dark:border-darkComponent">
                {board.date}
              </td>
              <td className="text-center dark:border-darkComponent">
                {board.watch}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div class=" px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 dark:border-darkComponent">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700  hover:bg-gray-50"
          >
            {' '}
            Previous{' '}
          </button>
          <button
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
          >
            {' '}
            Next{' '}
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-divisionGray">
              Showing
              <span class="font-medium">
                {' ' + ((currentPage - 1) * MAX_POSTS + 1) + ' '}
              </span>
              to
              <span class="font-medium">
                {' ' +
                  (currentPage == pageN
                    ? testData.maxNo
                    : currentPage * MAX_POSTS) +
                  ' '}
              </span>
              of
              <span class="font-medium">{' ' + testData.maxNo + ' '}</span>
              results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
                class={
                  hiddenPrevious(currentPage) +
                  ' relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:text-white dark:hover:bg-darkComponent'
                }
              >
                <span class="sr-only">Previous</span>

                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              {[...Array(pageN).keys()].map((pageNum) => (
                <button
                  key={pageNum}
                  className={
                    setPageButton(currentPage, pageNum + 1) +
                    ' relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                  }
                  onClick={() => {
                    setCurrentPage(pageNum + 1);
                  }}
                >
                  {pageNum + 1}
                </button>
              ))}

              <button
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
                class={
                  hiddenNext(currentPage) +
                  ' relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:text-mainWhite dark:hover:bg-darkComponent'
                }
              >
                <span class="sr-only">Next</span>

                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
      <div name="bottom" className="">
        <div name="search">
          <select
            className="border focus:outline-mainYellow dark:border-darkPoint dark:bg-darkComponent dark:text-mainWhite"
            name="search rule"
          >
            <option value="제목+내용">제목+내용</option>
            <option value="제목">제목</option>
            <option value="내용">내용</option>
            <option value="작성자">작성자</option>
          </select>
          <input
            type="text"
            className="border-2 m-2 rounded-md dark:bg-darkComponent focus:outline-mainYellow dark:border-darkComponent dark:text-white"
            placeholder="검색어"
          ></input>
          <button className="border-2 border-mainYellow rounded-lg  m-2 px-2 shadow-lg active:mr-1 active:ml-3 active:shadow-none ">
            <SearchIcon className="inline-block h-5 w-5 text-mainYellow" />
            검색
          </button>
        </div>
      </div>
    </div>
  );
};
//className={'border-2 text-2xl m-1 rounded-lg px-1  ' +setPageButton(currentPage, pageNum + 1)}
export default Table;
