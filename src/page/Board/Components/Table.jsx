import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  SearchIcon,
  ViewGridIcon,
  ViewListIcon,
  DocumentTextIcon,
  PhotographIcon,
} from '@heroicons/react/solid';
//local
import testData from 'page/Board/testData';
import Gallary from './Gallary';
import postAPI from 'API/v1/post';
import {
  getDateWithFormat,
  getDiffTimeWithFormat,
  isNewPost,
} from '../BoardUtil';

const MAX_POSTS = 1; //한 페이지당 노출시킬 최대 게시글 수
const MAX_PAGES = 6; //한 번에 노출시킬 최대 페이지 버튼 개수
const styleList = ['text', 'gallary'];

const setPageButton = (currentPage, page) => {
  //현재 페이지
  if (currentPage == page)
    return 'z-10 bg-mainWhite border-mainYellow text-mainYellow dark:bg-mainBlack';
  else
    return 'bg-mainWhite border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-mainBlack dark:text-mainWhite';
};

const getStyleIcon = (item) => {
  if (item == styleList[0]) {
    return <ViewListIcon className="inline-block h-5 w-5" />;
  } else {
    return <ViewGridIcon className="inline-block h-5 w-5" />;
  }
};

const Table = (props) => {
  const [boardContent, setBoardContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewStyle, setViewStyle] = useState('text');
  const { no } = useParams();
  const [pageN, setPageN] = useState(0); //전체 페이지 수
  const [searchFlag, setSearchFlag] = useState(false); //전체 페이지 수
  const [selectedSearchVal, SetSelectedSearchVal] = useState('TC');

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

  const getCurrentBoard = (id, currentId) => {
    //현재 게시글
    if (id == currentId) return 'text-mainYellow  rounded-lg';
    return;
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

  const currentCategoryId = props.state.category.current.id;
  const { startPage, endPage } = getStartEndPage(currentPage);
  const postingSearchRef = useRef(null);

  const searchHandler = () => {
    if (currentCategoryId) {
      postAPI
        .search({
          type: selectedSearchVal,
          keyword: postingSearchRef.current?.value,
          category: currentCategoryId,
          page: 0,
          size: MAX_POSTS,
        })
        .then((res) => {
          setSearchFlag(true);
          if (res?.list?.length == 0) {
            setPageN(0);
            setCurrentPage(0);
          } else {
            setPageN(
              Math.ceil(
                (res?.list?.length != 0 ? res.list[0]?.size : 0) / MAX_POSTS
              )
            );
            setCurrentPage(1);
          }
          setBoardContent(res?.list);
        });
    }
  };

  useEffect(() => {
    // 카테고리 값 변화에 따른 현재 페이지 번호, 총 페이지 개수 갱신
    if (currentCategoryId) {
      postAPI
        .getList({
          category: currentCategoryId,
          page: currentPage - 1,
          size: MAX_POSTS,
        })
        .then((res) => {
          setSearchFlag(false);
          if (res?.list?.length == 0) {
            setPageN(0);
            setCurrentPage(0);
          } else {
            setPageN(
              Math.ceil(
                (res?.list?.length != 0 ? res.list[0]?.size : 0) / MAX_POSTS
              )
            );
            setCurrentPage(1);
          }
          setBoardContent(res?.list);
        });
    }
  }, [currentCategoryId]);

  useEffect(() => {
    // 현재 페이지 변화에 따른 총 페이지 개수 갱신
    // 검색중이면 페이지네이션을 검색으로, 검색중이 아니면 기본으로 설정
    if (searchFlag) {
      postAPI
        .search({
          type: selectedSearchVal,
          keyword: postingSearchRef.current?.value,
          category: currentCategoryId,
          page: currentPage - 1,
          size: MAX_POSTS,
        })
        .then((res) => {
          setPageN(
            Math.ceil(
              (res?.list?.length != 0 ? res.list[0]?.size : 0) / MAX_POSTS
            )
          );
          setBoardContent(res?.list);
        });
    } else {
      if (currentCategoryId) {
        postAPI
          .getList({
            category: currentCategoryId,
            page: currentPage - 1,
            size: MAX_POSTS,
          })
          .then((res) => {
            setPageN(
              Math.ceil(
                (res?.list?.length != 0 ? res.list[0]?.size : 0) / MAX_POSTS
              )
            );
            setBoardContent(res?.list);
          });
      }
    }
  }, [currentPage, viewStyle]); //currentPage 값이 변경될 때마다

  return (
    <div className="dark:bg-mainBlack dark:text-mainWhite ">
      <div
        name="전체 게시글 수 및 스타일 옵션"
        className="items-end flex justify-between"
      >
        <div className="inline-block text-xl my-2">
          Total{' '}
          <span className="text-mainYellow">
            {boardContent?.length != 0 ? boardContent[0]?.size : 0}
          </span>
        </div>
        <div className="m-2 inline-block w-1/8">
          <p className="text-center m-2 border-b-2 border-divisionGray dark:border-darkComponent">
            Style
          </p>
          <div>
            {styleList.map((item) => (
              <span key={item} className="m-1">
                <input
                  type="radio"
                  className="bg-mainYellow hidden peer"
                  id={item}
                  name="viewStyle"
                  checked={viewStyle === item}
                  onChange={() => {
                    setViewStyle(item);
                  }}
                ></input>
                <label
                  htmlFor={item}
                  className="border-2 rounded-lg  peer-checked:border-mainYellow peer-checked:text-mainYellow dark:border-darkComponent dark:text-divisionGray"
                >
                  {getStyleIcon(item)}
                  {/*item*/}
                </label>
              </span>
            ))}
          </div>
        </div>
      </div>
      {viewStyle == 'text' ? (
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
                작성자
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
                  (board.isNotice ? 'bg-slate-100 dark:bg-gray-900' : '') +
                  ' border-b-2 hover:bg-slate-200 hover:shadow-lg dark:hover:bg-darkComponent dark:border-darkComponent ' +
                  getCurrentBoard(board.id, no)
                }
              >
                {/*console.log(board)*/}
                <td className="w-[3em] border-r border-divisionGray text-center dark:border-darkComponent">
                  {board.isNotice
                    ? '공지'
                    : MAX_POSTS * (currentPage - 1) + index + 1}
                </td>
                <td className="p-2 dark:border-darkComponent">
                  <Link to={`/board/${board.id}`} state={{ test: 'test' }}>
                    <div className="max-w-[50vw] md:max-w-[40vw] sm:max-w-[20vw] inline-block">
                      <p className="truncate text-md ">
                        <strong
                          className={board.isSecret ? 'text-slate-400' : ''}
                        >
                          {board.title}
                        </strong>
                      </p>
                    </div>
                    {!board.isSecret && board.thumbnail ? (
                      <PhotographIcon className="inline-block h-5 w-5 m-1 text-slate-500 " />
                    ) : (
                      ''
                    )}
                    {!board.isSecret && board.files.length != 0 ? (
                      <DocumentTextIcon className="inline-block h-5 w-5 text-slate-500" />
                    ) : (
                      ''
                    )}
                    {!board.isSecret && board.commentCount != 0 ? (
                      <strong className="text-mainYellow">
                        {'(' + board.commentCount + ')'}
                      </strong>
                    ) : (
                      ''
                    )}
                    {isNewPost(board.registerTime) ? (
                      <strong className="inline-block rounded-full w-5 h-5 align-middle text-center text-xs m-1 bg-red-500 shadow-lg border-2 border-red-200 text-mainWhite dark:text-mainBlack">
                        n
                      </strong>
                    ) : (
                      ''
                    )}
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
      ) : (
        <Gallary boards={boardContent} />
      )}

      <div
        name="페이지네이션"
        class=" px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 dark:border-darkComponent"
      >
        <div
          name="모바일 previous, next 버튼"
          class={
            (currentPage == 1 ? 'justify-end' : 'justify-between') +
            ' flex-1 flex  sm:hidden'
          }
        >
          <button
            name="모바일 previous 버튼"
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
            class={
              hiddenPrevious(currentPage) +
              ' relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700  hover:bg-gray-50'
            }
          >
            {' '}
            Previous{' '}
          </button>
          <button
            name="모바일 next 버튼"
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
            class={
              hiddenNext(currentPage) +
              ' ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50'
            }
          >
            {' '}
            Next{' '}
          </button>
        </div>
        <div
          name="컴 화면 페이지네이션"
          className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
        >
          <div className="hidden md:block">
            <p class="text-sm text-gray-700 dark:text-divisionGray">
              Showing
              <span class="font-medium">
                <strong name="현재 보여지는 게시글들 중 첫 게시글 번호">
                  {' ' + Math.max(0, (currentPage - 1) * MAX_POSTS + 1) + ' '}
                </strong>
              </span>
              to
              <span class="font-medium">
                <strong name="현재 보여지는 게시글들 중 마지막 게시글 번호">
                  {' ' +
                    (currentPage == pageN
                      ? boardContent?.length != 0
                        ? boardContent[0]?.size
                        : 0
                      : currentPage * MAX_POSTS) +
                    ' '}
                </strong>
              </span>
              of
              <span class="font-medium">
                <strong name="전체 게시글 개수">
                  {' '}
                  {boardContent?.length != 0 ? boardContent[0]?.size : 0}{' '}
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
              {
                /**/ pageN <= MAX_PAGES ? (
                  <div>
                    {[...Array(pageN).keys()].map((pageNum) => (
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
                    ))}
                  </div>
                ) : (
                  <div>
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
                    {[
                      ...Array(pageN > MAX_PAGES ? MAX_PAGES : pageN).keys(),
                    ].map((pageNum) => (
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
                    ))}
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
                  </div>
                )
              }

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
            onChange={(e) => SetSelectedSearchVal(e.target.value)}
          >
            <option value="TC">제목+내용</option>
            <option value="T">제목</option>
            <option value="C">내용</option>
            <option value="W">작성자</option>
          </select>
          <input
            ref={postingSearchRef}
            type="text"
            className="border-2 border-divisionGray m-2 p-1 rounded-md focus:ring-mainYellow focus:border-mainYellow dark:bg-darkComponent dark:border-darkComponent dark:text-white"
            placeholder="검색어"
          ></input>
          <button
            className="border-2 border-mainYellow rounded-lg  m-2 px-2 shadow-lg text-mainYellow active:mr-1 active:ml-3 active:shadow-none"
            onClick={searchHandler}
          >
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
