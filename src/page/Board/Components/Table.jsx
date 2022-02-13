import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { SearchIcon } from '@heroicons/react/solid';
//local
import testData from 'page/Board/testData';
import postAPI from 'API/v1/post';
import {
  getDateWithFormat,
  getDiffTimeWithFormat,
  isNewPost,
} from '../BoardUtil';

const MAX_POSTS = 5; //한 페이지당 노출시킬 최대 게시글 수
const MAX_PAGES = 6; //한 번에 노출시킬 최대 페이지 버튼 개수
const pageN = Math.ceil(testData.maxNo / MAX_POSTS); //전체 페이지 수

const setPageButton = (currentPage, page) => {
  //현재 페이지
  if (currentPage == page)
    return 'z-10 bg-mainWhite border-mainYellow text-mainYellow dark:bg-mainBlack';
  else
    return 'bg-mainWhite border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-mainBlack dark:text-mainWhite';
};
const hiddenPrevious = (currentPage) => {
  //현재 페이지가 맨 앞 페이지인지
  if (currentPage == 1) return 'hidden';
  return '';
};
const hiddenNext = (currentPage) => {
  //현재 페이지가 맨 뒤 페이지인지
  if (currentPage == pageN) return 'hidden';
  return '';
};
const getStartEndPage = (currentPage) => {
  //currentPage-MAX_PAGES/2~currentPage+MAX_PAGES/2-1
  //전체 페이지가 최대 노출 가능 페이지 개수를 넘을 경우(7개 이상)
  var startPage = currentPage - MAX_PAGES / 2;
  var endPage = currentPage + (MAX_PAGES / 2 - 1);
  if (startPage <= 0) {
    //범위가 0 이하로 오버될 경우
    endPage = endPage - startPage + 1;
    startPage = 1;
  } else if (endPage > pageN) {
    startPage = startPage - (endPage - pageN);
    endPage = pageN;
  }
  return { startPage, endPage };
};

const Table = (props) => {
  const [boardContent, setBoardContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //console.log(currentPage); //현재 페이지
  const { no } = useParams();
  const currentCategoryId = props.state.category.current.id;
  const { startPage, endPage } = getStartEndPage(currentPage);

  const getCurrentBoard = (id, currentId) => {
    //현재 게시글
    if (id == currentId) return 'text-mainYellow  rounded-lg';
    return;
  };

  useEffect(() => {
    //console.log(props.state.member.memberId);
    var end = 0;
    // TODO 카테고리별 게시물 최대 개수 불러오기
    if (currentPage * MAX_POSTS > testData.maxNo) end = testData.maxNo;
    else end = currentPage * MAX_POSTS;
    postAPI
      .getList({
        category: currentCategoryId,
        page: currentPage - 1,
        size: MAX_POSTS,
      })
      .then((res) => {
        setBoardContent(res?.list);
      });
  }, [currentPage, currentCategoryId]); //currentPage 값이 변경될 때마다

  return (
    <div className="dark:bg-mainBlack dark:text-mainWhite ">
      <p className="text-xl my-2">
        Total <span className="text-mainYellow">{testData.maxNo}</span>
      </p>

      <table className="w-full mb-5">
        <thead>
          <tr className="bg-mainYellow ">
            <th className="border-x border-mainWhite p-1 rounded-tl-xl dark:border-mainBlack">
              No.
            </th>
            <th className="border-x border-mainWhite p-1 rounded-tr-xl sm:rounded-none dark:border-mainBlack ">
              제목
            </th>
            <th className="border-x border-mainWhite p-1 hidden sm:table-cell dark:border-mainBlack">
              글쓴이
            </th>
            <th className="border-x border-mainWhite p-1 hidden sm:table-cell dark:border-mainBlack ">
              작성 일시
            </th>
            <th className="border-x border-mainWhite p-1 rounded-tr-xl hidden sm:table-cell dark:border-mainBlack">
              조회수
            </th>
          </tr>
        </thead>
        <tbody>
          {boardContent?.map((board, index) => (
            <tr
              key={board.id}
              className={
                'border-b-2 hover:bg-slate-100 hover:shadow-lg dark:hover:bg-darkComponent dark:border-darkComponent ' +
                getCurrentBoard(board.id, no)
              }
            >
              <td className="w-[3em] border-r border-divisionGray text-center dark:border-darkComponent">
                {MAX_POSTS * (currentPage - 1) + index + 1}
              </td>

              <td className="p-2 dark:border-darkComponent">
                <Link
                  to={{
                    pathname: `/board/${board.id}`,
                    state: { test: 'test' },
                  }}
                >
                  <div className=" w-60 ">
                    <p className="truncate w-4/5 text-md ">
                      <strong>{board.title}</strong>
                      {/* TODO: 이미지, 첨부파일 정보 가져오기
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
                      {board.commentN != 0 ? (
                        <strong className="text-mainYellow">
                          {'(' + board.commentN + ')'}
                        </strong>
                      ) : (
                        ''
                      )} */}
                      {isNewPost(board.registerTime) ? (
                        <strong className="inline-block rounded-full w-5 h-5 align-middle text-center text-xs m-1 bg-red-500 shadow-lg border-2 border-red-200 text-mainWhite dark:text-mainBlack">
                          n
                        </strong>
                      ) : (
                        ''
                      )}
                    </p>
                  </div>

                  <p className="mt-2 text-xs sm:hidden">
                    글쓴이 : <strong>{board.writer} </strong>| 작성일시 :
                    <strong>{getDateWithFormat(board.registerTime)} </strong>|{' '}
                    <span className="inline-block">
                      조회수 : <strong>{board.visitCount} </strong>
                    </span>
                  </p>
                </Link>
              </td>

              <td className="min-w-[4em] text-center dark:border-darkComponent hidden sm:table-cell">
                {board.writer}
              </td>
              <td className="min-w-[6em] text-center dark:border-darkComponent hidden sm:table-cell">
                {/*getDateWithFormat(board.registerTime)
                <br />*/}
                {getDiffTimeWithFormat(board.registerTime)}
              </td>
              <td className="min-w-[4em] text-center dark:border-darkComponent hidden sm:table-cell">
                {board.visitCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div class=" px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 dark:border-darkComponent">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            name="모바일 previous 버튼"
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700  hover:bg-gray-50"
          >
            {' '}
            Previous{' '}
          </button>
          <button
            name="모바일 next 버튼"
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
                <strong name="현재 보여지는 게시글들 중 첫 게시글 번호">
                  {' ' + ((currentPage - 1) * MAX_POSTS + 1) + ' '}
                </strong>
              </span>
              to
              <span class="font-medium">
                <strong name="현재 보여지는 게시글들 중 마지막 게시글 번호">
                  {' ' +
                    (currentPage == pageN
                      ? testData.maxNo
                      : currentPage * MAX_POSTS) +
                    ' '}
                </strong>
              </span>
              of
              <span class="font-medium">
                <strong name="전체 게시글 개수">
                  {' ' + testData.maxNo + ' '}
                </strong>
              </span>
              results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                name="Previous 버튼(기본)"
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

              {/*[...Array(pageN).keys()].map((pageNum) => (
                <button
                  name="각 페이지 번호"
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
                ))*/}
              {startPage > 1 ? (
                <button
                  name="첫 페이지"
                  className="bg-mainWhite border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-mainBlack dark:text-mainWhite relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  onClick={() => {
                    setCurrentPage(1);
                  }}
                >
                  1
                </button>
              ) : (
                ''
              )}
              {startPage > 2 ? (
                <button className="w-10 bg-mainWhite border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-mainBlack dark:text-mainWhite relative inline-flex items-center px-3 py-2 border text-sm font-medium">
                  ...
                </button>
              ) : (
                ''
              )}
              {[...Array(pageN > MAX_PAGES ? MAX_PAGES : pageN).keys()].map(
                (pageNum) => (
                  <button
                    name="각 페이지 번호"
                    key={pageNum}
                    className={
                      setPageButton(currentPage, pageNum + startPage) +
                      ' w-10 relative inline-flex items-center px-3 py-2 border text-sm font-medium'
                    }
                    onClick={() => {
                      setCurrentPage(pageNum + startPage);
                    }}
                  >
                    {pageNum + startPage}
                  </button>
                )
              )}
              {endPage < pageN - 1 ? (
                <button className="w-10 bg-mainWhite border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-mainBlack dark:text-mainWhite relative inline-flex items-center px-3 py-2 border text-sm font-medium">
                  ...
                </button>
              ) : (
                ''
              )}
              {endPage < pageN ? (
                <button
                  name="마지막 페이지"
                  className="bg-mainWhite border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-mainBlack dark:text-mainWhite relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  onClick={() => {
                    setCurrentPage(pageN);
                  }}
                >
                  {pageN}
                </button>
              ) : (
                ''
              )}

              <button
                name="Next 버튼(기본)"
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
            className="border text-xs focus:ring-mainYellow focus:border-mainYellow dark:border-darkPoint dark:bg-darkComponent dark:text-mainWhite"
            name="search rule"
          >
            <option value="제목+내용">제목+내용</option>
            <option value="제목">제목</option>
            <option value="내용">내용</option>
            <option value="작성자">작성자</option>
          </select>
          <input
            type="text"
            className="border-2 border-divisionGray m-2 p-1 rounded-md focus:ring-mainYellow focus:border-mainYellow dark:bg-darkComponent dark:border-darkComponent dark:text-white"
            placeholder="검색어"
          ></input>
          <button className="border-2 border-mainYellow rounded-lg  m-2 px-2 shadow-lg text-mainYellow active:mr-1 active:ml-3 active:shadow-none">
            <SearchIcon className="inline-block h-5 w-5" />
            검색
          </button>
        </div>
      </div>
    </div>
  );
};
//className={'border-2 text-2xl m-1 rounded-lg px-1  ' +setPageButton(currentPage, pageNum + 1)}
const mapStateToProps = (state, OwnProps) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(Table);
