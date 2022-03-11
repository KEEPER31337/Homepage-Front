import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  DocumentTextIcon,
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

const Gallary = ({ notices, boards, linkHandler }) => {
  const { categoryId } = useParams();
  const [thumbnails, setThumbnails] = [];
  useEffect(() => {}, []);
  return (
    <div className=" max-w-2xl mx-auto py-8 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
      {notices.length != 0 ? (
        <div className="block mb-5">
          <div name="공지사항" className="relative my-3 mt-5">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t-2 border-mainYellow" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-lg font-medium text-gray-900 dark:bg-mainBlack dark:text-mainWhite">
                공지사항
              </span>
            </div>
          </div>

          <div className=" mt-2 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {notices.map((board, index) => (
              <div
                key={board.id}
                className={
                  'bg-slate-100 dark:bg-slate-800 border-l border-b border-r rounded-lg p-2 group shadow-lg dark:border-gray-600'
                }
              >
                <Link
                  to={`/post/${categoryId}/${board.id}`}
                  onClick={(e) => {
                    if (board.isSecret) linkHandler(e, board);
                  }}
                >
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
                    {isNewPost(board.registerTime) ? (
                      <strong className="inline-block absolute top-[-20px] right-[-20px] rounded-full shadow-md shadow-red-500/50 m-1 w-7 h-7 align-middle text-center text-base bg-red-500 border-2 text-mainWhite dark:text-mainBlack">
                        N
                      </strong>
                    ) : (
                      ''
                    )}

                    <div className="relative mt-4">
                      <div className="max-w-[75%] inline-block">
                        <h3 className="text-sm font-medium truncate bold text-gray-900 dark:text-mainWhite">
                          {board.title}
                        </h3>
                      </div>

                      {board.files.length != 0 ? (
                        <DocumentTextIcon className="inline-block h-5 w-5 text-slate-500" />
                      ) : (
                        ''
                      )}
                      <strong className="text-mainYellow">
                        <ChatAltIcon className="inline-block h-5 w-5" />
                        {board.commentCount}
                      </strong>

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
          <div name="공지사항" className="relative my-3 mt-5">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t-2 border-mainYellow" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-lg font-medium text-gray-900 dark:bg-mainBlack dark:text-mainWhite"></span>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {/*=====================================================================*/}
      <div className=" mt-2 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {boards?.map((board, index) => (
          <div
            key={board.id}
            className={
              ' border-l border-b border-r rounded-lg p-2 group shadow-lg dark:border-gray-600'
            }
          >
            <Link
              to={`/board/${board.id}`}
              state={{ test: 'test' }}
              onClick={(e) => {
                if (board.isSecret) linkHandler(e, board);
              }}
            >
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
                {isNewPost(board.registerTime) ? (
                  <strong className="inline-block absolute top-[-20px] right-[-20px] rounded-full shadow-md shadow-red-500/50 m-1 w-7 h-7 align-middle text-center text-base bg-red-500 border-2 text-mainWhite dark:text-mainBlack">
                    N
                  </strong>
                ) : (
                  ''
                )}
                <div className="relative mt-4">
                  <div className="max-w-[75%] inline-block">
                    <h3 className="text-sm font-medium truncate bold text-gray-900 dark:text-mainWhite">
                      {board.title}
                    </h3>
                  </div>
                  {board.files.length != 0 ? (
                    <DocumentTextIcon className="inline-block h-5 w-5 text-slate-500" />
                  ) : (
                    ''
                  )}

                  <strong className="text-mainYellow">
                    <ChatAltIcon className="inline-block h-5 w-5" />
                    {board.commentCount}
                  </strong>

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
