import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { SearchIcon, ViewGridIcon, ViewListIcon } from '@heroicons/react/solid';
//local
import Table from './Table';
import Gallary from './Gallary';
import postAPI from 'API/v1/post';
import SecretPwdInput from './Modals/SecretPwdInput';
import actionBoardStyle from '../../../redux/action/boardStyle';

const MAX_POSTS = 4 * 2; //한 페이지당 노출시킬 최대 게시글 수(갤러리 style을 고려하여 2의 배수로 설정)
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
    return <ViewListIcon className="inline-block h-5 w-5 -mt-[2px] mb-[2px]" />;
  } else {
    return <ViewGridIcon className="inline-block h-5 w-5 -mt-[2px] mb-[2px]" />;
  }
};

const Boards = ({ categoryId, commentChangeFlag, state, changeMode }) => {
  const [boardContent, setBoardContent] = useState([]);
  const [noticeBoardContent, setNoticeBoardContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageN, setPageN] = useState(0); //전체 페이지 수
  const [searchFlag, setSearchFlag] = useState(false); //전체 페이지 수
  const [selectedSearchVal, SetSelectedSearchVal] = useState('TC');
  const [secretBoardId, setSecretBoardId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const { no } = useParams();
  const viewStyle = state.boardStyle.mode;

  const openModal = () => {
    //비밀번호 입력창 열기
    setModalOpen(true);
  };
  const closeModal = () => {
    //비밀번호 입력창 닫기
    setModalOpen(false);
  };
  const linkHandler = (e, board) => {
    //비밀글 링크 클릭 시 발동
    e.preventDefault(); //해당 게시글 링크로 이동하는 걸 막음
    //console.log(e.target);
    setSecretBoardId(board.id); //열람하려는 게시글의 id 저장(url로 쓸 수 있도록)
    //console.log(boardId);
    openModal(); //비밀번호 입력창 열기
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

  const currentCategoryId = categoryId;
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
      postAPI //공지사항 가져오기
        .getNoticeList({
          category: currentCategoryId,
        })
        .then((res) => {
          if (res.success) setNoticeBoardContent(res?.list.reverse());
        });

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
    closeModal();
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
        postAPI //공지사항 가져오기
          .getNoticeList({
            category: currentCategoryId,
          })
          .then((res) => {
            if (res.success) setNoticeBoardContent(res?.list);
          });

        postAPI //일반 글 가져오기
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
  }, [currentPage, viewStyle, commentChangeFlag]); //currentPage 값이 변경될 때마다

  return (
    <div className="w-full dark:bg-mainBlack dark:text-mainWhite ">
      {noticeBoardContent.length === 0 && boardContent.length === 0 ? (
        <div className="text-center text-slate-400 text-xl h-[400px] pt-[150px]">
          <strong className="text-3xl">
            - 게시글이 존재하지 않는 게시판입니다. -
          </strong>
          <br />- It's an empty bulletin board. -
        </div>
      ) : (
        <div className="space-y-4">
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
                        changeMode(item);
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
          <SecretPwdInput
            open={modalOpen}
            close={closeModal}
            categoryId={categoryId}
            id={secretBoardId}
          />
          {viewStyle == 'text' ? (
            <Table
              notices={noticeBoardContent}
              boards={boardContent}
              currentPage={currentPage}
              MAX_POSTS={MAX_POSTS}
              linkHandler={linkHandler}
            />
          ) : (
            <Gallary
              notices={noticeBoardContent}
              boards={boardContent}
              linkHandler={linkHandler}
            />
          )}

          <div
            name="페이지네이션"
            className="px-4 pt-2 flex items-center justify-between border-t border-gray-200 sm:px-6 dark:border-darkComponent"
          >
            <div
              name="모바일 previous, next 버튼"
              className={
                (currentPage == 1 ? 'justify-end' : 'justify-between') +
                ' flex-1 flex  sm:hidden'
              }
            >
              <button
                name="모바일 previous 버튼"
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
                className={
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
                className={
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
                <p className="text-sm text-gray-700 dark:text-divisionGray">
                  Showing
                  <span className="font-medium">
                    <strong name="현재 보여지는 게시글들 중 첫 게시글 번호">
                      {' ' +
                        Math.max(0, (currentPage - 1) * MAX_POSTS + 1) +
                        ' '}
                    </strong>
                  </span>
                  to
                  <span className="font-medium">
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
                  <span className="font-medium">
                    <strong name="전체 게시글 개수">
                      {' '}
                      {boardContent?.length != 0
                        ? boardContent[0]?.size
                        : 0}{' '}
                    </strong>
                  </span>
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    name="Previous 버튼(기본)"
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                    }}
                    className={
                      hiddenPrevious(currentPage) +
                      ' relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:text-white dark:hover:bg-darkComponent'
                    }
                  >
                    <span className="sr-only">Previous</span>

                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
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
                          ...Array(
                            pageN > MAX_PAGES ? MAX_PAGES : pageN
                          ).keys(),
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
                    className={
                      hiddenNext(currentPage) +
                      ' relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:text-mainWhite dark:hover:bg-darkComponent'
                    }
                  >
                    <span className="sr-only">Next</span>

                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          <div name="search" className="flex flex-col gap-y-2 sm:block">
            <select
              className="border mx-1 w-fit text-xs focus:ring-mainYellow focus:border-mainYellow dark:border-darkPoint dark:bg-darkComponent dark:text-mainWhite"
              name="search rule"
              onChange={(e) => SetSelectedSearchVal(e.target.value)}
            >
              <option value="TC">제목+내용</option>
              <option value="T">제목</option>
              <option value="C">내용</option>
              <option value="W">작성자</option>
            </select>
            <div className="inline-block">
              <input
                ref={postingSearchRef}
                type="text"
                className="border-2 border-divisionGray mx-1 mb-2 p-1 w-fit rounded-md focus:ring-mainYellow focus:border-mainYellow dark:bg-darkComponent dark:border-darkComponent dark:text-white"
                placeholder="검색어"
              ></input>
              <button
                className="border-[3px] border-mainYellow mx-1 mb-2 px-2 pb-1 w-fit rounded-lg shadow-lg text-mainYellow active:mr-1 active:ml-3 active:shadow-none"
                onClick={searchHandler}
              >
                <SearchIcon className="inline-block h-5 w-5" />
                검색
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
//className={'border-2 text-2xl m-1 rounded-lg px-1  ' +setPageButton(currentPage, pageNum + 1)}
const mapStateToProps = (state, OwnProps) => {
  return {
    state,
  };
};
const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    changeMode: (mode) => {
      dispatch(actionBoardStyle.changeMode(mode));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Boards);
