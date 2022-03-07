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

const API_URL = process.env.REACT_APP_API_URL;

const Table = ({ notices, boards, currentPage, MAX_POSTS }) => {
  const { categoryId, no } = useParams();

  const getCurrentBoard = (id, currentId) => {
    //현재 게시글
    if (id == currentId) return 'text-mainYellow  rounded-lg';
    return;
  };

  return (
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
        {notices?.map((board, index) => (
          <tr
            key={board.id}
            className={
              'bg-slate-100 dark:bg-gray-900 border-b-2 hover:bg-slate-200 hover:shadow-lg dark:hover:bg-darkComponent dark:border-darkComponent ' +
              getCurrentBoard(board.id, no)
            }
          >
            {/*console.log(board)*/}
            <td className="w-[3em] border-r border-divisionGray text-center dark:border-darkComponent">
              공지
            </td>
            <td className="p-2 dark:border-darkComponent">
              <Link to={`/post/${categoryId}/${board.id}`}>
                <div className="max-w-[50vw] md:max-w-[40vw] sm:max-w-[20vw] inline-block">
                  <p className="truncate text-md ">
                    <strong className={board.isSecret ? 'text-slate-400' : ''}>
                      {board.title}
                    </strong>
                  </p>
                </div>
                {board.thumbnail ? (
                  <PhotographIcon className="inline-block h-5 w-5 m-1 text-slate-500 " />
                ) : (
                  ''
                )}
                {board.files.length != 0 ? (
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
        {/*=============================================================================================*/}
        {boards?.map((board, index) => (
          <tr
            key={board.id}
            className={
              ' border-b-2 hover:bg-slate-200 hover:shadow-lg dark:hover:bg-darkComponent dark:border-darkComponent ' +
              getCurrentBoard(board.id, no)
            }
          >
            {/*console.log(board)*/}
            <td className="w-[3em] border-r border-divisionGray text-center dark:border-darkComponent">
              {MAX_POSTS * (currentPage - 1) + index + 1}
            </td>
            <td className="p-2 dark:border-darkComponent">
              <Link to={`/post/${categoryId}/${board.id}`}>
                <div className="max-w-[50vw] md:max-w-[40vw] sm:max-w-[20vw] inline-block">
                  <p className="truncate text-md ">
                    {board.isSecret ? (
                      <LockClosedIcon className="inline-block h-5 w-5 m-1 text-slate-400 " />
                    ) : (
                      ''
                    )}
                    <strong className={board.isSecret ? 'text-slate-400' : ''}>
                      {board.title}
                    </strong>
                  </p>
                </div>
                {board.thumbnail ? (
                  <PhotographIcon className="inline-block h-5 w-5 m-1 text-slate-500 " />
                ) : (
                  ''
                )}
                {board.files.length != 0 ? (
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
  );
};
const mapStateToProps = (state, OwnProps) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(Table);
