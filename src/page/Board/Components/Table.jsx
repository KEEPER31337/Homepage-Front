import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  DocumentTextIcon,
  PhotographIcon,
  LockClosedIcon,
} from '@heroicons/react/solid';
//local
import {
  getDateWithFormat,
  getDiffTimeWithFormat,
  isNewPost,
} from '../BoardUtil';

const Table = ({
  notices,
  boards,
  currentPage,
  MAX_POSTS,
  linkHandler,
  state,
}) => {
  const { categoryName, postId } = useParams();

  const getCurrentBoard = (id, currentId) => {
    //현재 게시글
    if (id == currentId) return 'text-mainYellow  rounded-lg';
    return;
  };
  const row = (board, index, isN) => {
    //isN은 공지글인지 일반 글인지 여부(true=>공지글, false=>일반 글)
    return (
      <tr
        key={board.id}
        className={
          (isN
            ? 'bg-gray-100 dark:bg-gray-900 border-b-2 hover:bg-gray-200 hover:shadow-lg dark:hover:bg-darkComponent dark:border-darkComponent '
            : ' border-b-2 hover:bg-gray-50 hover:shadow-lg dark:hover:bg-darkComponent dark:border-darkComponent ') +
          getCurrentBoard(board.id, postId)
        }
      >
        {/*console.log(board)*/}
        <td className="w-[3em] border-r border-divisionGray text-center dark:border-darkComponent">
          {isN ? '공지' : MAX_POSTS * (currentPage - 1) + index + 1}
        </td>
        <td className="p-2 max-w-0 dark:border-darkComponent">
          <Link
            to={`/post/${categoryName}/${board.id}`}
            onClick={(e) => {
              if (
                board.isSecret &&
                board.writerId != state.member?.memberInfo?.id
              )
                linkHandler(e, board);
            }}
          >
            <div className=" w-full flex items-center">
              <p className="truncate text-md mr-1">
                {board.isSecret ? (
                  <LockClosedIcon className="inline-block h-5 w-5 m-1 text-slate-400 " />
                ) : (
                  ''
                )}
                <strong className={board.isSecret ? 'text-slate-400' : ''}>
                  {board.title}
                </strong>
              </p>
              <div className="flex-1">
                {board.thumbnail ? (
                  <PhotographIcon className="inline-block h-5 w-5 m-1 text-slate-500 " />
                ) : (
                  ''
                )}
                {board.files ? (
                  <DocumentTextIcon className="inline-block h-5 w-5 text-slate-500" />
                ) : (
                  ''
                )}
                {board.commentCount != 0 ? (
                  <strong className="text-mainYellow">
                    {'(' + board.commentCount + ')'}
                  </strong>
                ) : (
                  ''
                )}
                {isNewPost(board.registerTime) ? (
                  <strong
                    className={
                      (isN ? 'dark:text-mainBlack' : '') +
                      ' inline-block rounded-full w-5 h-5 align-middle text-center text-xs my-1 pb-1 bg-red-500 shadow-lg border-2 border-red-200 text-mainWhite'
                    }
                  >
                    N
                  </strong>
                ) : (
                  ''
                )}
              </div>
            </div>
            <p className="mt-2 text-xs md:hidden">
              글쓴이 : <strong>{board.writer} </strong>| 작성일시 :
              <strong>{getDateWithFormat(board.registerTime)} </strong>|{' '}
              <span className="inline-block">
                조회수 : <strong>{board.visitCount} </strong>
              </span>
            </p>
          </Link>
        </td>

        <td className="text-center dark:border-darkComponent hidden md:table-cell">
          {board.writer}
        </td>
        <td className="text-center dark:border-darkComponent hidden md:table-cell">
          {/*getDateWithFormat(board.registerTime)
          <br />*/}
          {getDiffTimeWithFormat(board.registerTime)}
        </td>
        <td className="text-center dark:border-darkComponent hidden md:table-cell">
          {board.visitCount}
        </td>
      </tr>
    );
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-mainYellow ">
          <th className="border-x border-mainWhite p-1 rounded-tl-xl md:w-[3em] dark:border-mainBlack">
            No.
          </th>
          <th className="border-x border-mainWhite p-1 rounded-tr-xl md:rounded-none dark:border-mainBlack ">
            제목
          </th>
          <th className="border-x border-mainWhite p-1 hidden md:table-cell md:w-[4em] md:min-w-[4em] dark:border-mainBlack">
            작성자
          </th>
          <th className="border-x border-mainWhite p-1 hidden md:table-cell md:w-[6em] md:min-w-[6em] dark:border-mainBlack ">
            작성 일시
          </th>
          <th className="border-x border-mainWhite p-1 rounded-tr-xl hidden md:table-cell md:w-[4em] md:min-w-[4em] dark:border-mainBlack">
            조회수
          </th>
        </tr>
      </thead>
      <tbody>
        {notices?.map((board, index) => row(board, index, true))}
        {boards?.map((board, index) => row(board, index, false))}
      </tbody>
    </table>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(Table);
