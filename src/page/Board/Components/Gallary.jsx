import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  SearchIcon,
  ViewGridIcon,
  ViewListIcon,
  DocumentTextIcon,
  PhotographIcon,
  EyeIcon,
  ChatAltIcon,
  LockClosedIcon,
} from '@heroicons/react/solid';
//local
import testData from 'page/Board/testData';
import postAPI from 'API/v1/post';
import utilAPI from 'API/v1/util';
import {
  getDateWithFormat,
  getDiffTimeWithFormat,
  isNewPost,
} from '../BoardUtil';

const API_URL = process.env.REACT_APP_API_URL;

const Gallary = (boards) => {
  const [thumbnails, setThumbnails] = [];
  useEffect(() => {}, []);
  return (
    <div className=" max-w-2xl mx-auto py-8 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className=" mt-2 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {boards.boards?.map((board, index) => (
          <div
            key={board.id}
            className={
              (board.isNotice ? 'bg-slate-100 dark:bg-slate-800' : '') +
              ' border-l border-b border-r rounded-lg p-2 group shadow-lg dark:border-gray-600'
            }
          >
            <Link to={`/board/${board.id}`} state={{ test: 'test' }}>
              <div className={' relative'}>
                <div className="relative w-full h-72 rounded-lg overflow-hidden">
                  {console.log(board.thumbnail.id)}
                  {board.isSecret ? (
                    <div className="border bg-gray-500 bg-opacity-50 text-slate-500 flex items-center text-center w-full h-full object-center object-cover rounded-lg dark:border-gray-600">
                      <div className="w-full">
                        <LockClosedIcon className="inline-block h-10 w-10" />
                        <br />
                        비밀글입니다.
                      </div>
                    </div>
                  ) : board.writerThumbnailId ? (
                    <img
                      src={
                        API_URL +
                        '/v1/util/thumbnail/' +
                        board.writerThumbnailId
                      }
                      alt="썸네일 이미지"
                      className="w-full h-full object-center object-cover rounded-lg"
                    />
                  ) : (
                    <img
                      src={
                        'https://avatars.githubusercontent.com/u/23546441?s=400&u=db7abf2929e5518c12189034dc3fed9bda94f0a6&v=4'
                      }
                      alt="썸네일 이미지"
                      className="w-full h-full object-center object-cover rounded-lg"
                    />
                  )}
                </div>
                <div
                  className={
                    (board.isNotice ? '' : 'hidden') +
                    ' bg-slate-300 absolute top-0 px-5 py-1 rounded-xl dark:bg-slate-600'
                  }
                >
                  공지
                </div>
                <div className="relative mt-4">
                  <div className="max-w-[75%] inline-block">
                    <h3 className="text-sm font-medium truncate bold text-gray-900 dark:text-mainWhite">
                      {board.title}
                    </h3>
                  </div>
                  {!board.isSecret && board.files.length != 0 ? (
                    <DocumentTextIcon className="inline-block h-5 w-5 text-slate-500" />
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
                  {!board.isSecret ? (
                    <strong className="text-mainYellow">
                      <ChatAltIcon className="inline-block h-5 w-5" />
                      {board.commentCount}
                    </strong>
                  ) : (
                    ''
                  )}

                  <p className=" flex justify-between">
                    <span className="mt-1 text-sm text-gray-500">
                      {board.writer}
                    </span>
                    <span className="mt-1 text-sm">
                      {getDiffTimeWithFormat(board.registerTime)}
                    </span>
                  </p>
                </div>
                <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden ">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50 hidden group-hover:block"
                  />
                  <p className="relative text-lg font-semibold text-white hidden group-hover:block">
                    <EyeIcon className="inline-block h-5 w-5 mx-2 text-divisionGray " />
                    {board.visitCount}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(Gallary);
