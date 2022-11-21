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
import Horizontable from 'page/Board/Components/Horizontable';
import {
  getDateWithFormat,
  getDiffTimeWithFormat,
  isNewPost,
} from '../BoardUtil';

const Gallary = ({ notices, boards, linkHandler, state }) => {
  const { categoryName } = useParams();
  const [thumbnails, setThumbnails] = [];
  const card = (board, index, isN) => {
    return (
      <div
        key={index}
        className={
          isN
            ? ' min-w-[80vw] sm:min-w-[40vw] lg:min-w-[17vw] bg-mainWhite dark:bg-mainBlack border-[3px] border-mainYellow rounded-t-2xl rounded-b-md p-2 group shadow-md mb-5 dark:border-gray-600 hover:shadow-xl'
            : ' border-l border-b border-r rounded-t-2xl rounded-b-md p-2 group shadow-md dark:border-gray-600 hover:shadow-xl'
        }
      >
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
          <div className={' relative'}>
            <div
              className={
                (isN ? 'overflow-hidden bg-mainYellow' : 'bg-gray-300') +
                ' relative w-full h-72 p-[2px] rounded-lg flex items-center dark:bg-gray-700'
              }
            >
              {board.isSecret ? (
                <div className="bg-gray-300 bg-opacity-50 text-slate-500 flex items-center text-center w-full h-full object-center object-cover rounded-lg dark:text-gray-200">
                  <div className="w-full">
                    <LockClosedIcon className="inline-block h-10 w-10" />
                    <br />
                    비밀글입니다.
                  </div>
                </div>
              ) : (
                <img
                  src={board.thumbnailPath}
                  alt="썸네일 이미지"
                  className="w-full h-full object-center object-cover rounded-lg bg-mainWhite dark:bg-mainBlack"
                />
              )}
            </div>
            {isNewPost(board.registerTime) ? (
              <strong className="inline-block absolute top-[-20px] right-[-20px] rounded-full shadow-md shadow-red-500/50 m-1 w-7 h-7 align-middle text-center text-base bg-red-500 border-2 text-mainWhite ">
                N
              </strong>
            ) : (
              ''
            )}
            <div className="relative mt-4">
              <div className="flex items-center">
                <h3 className="text-sm font-medium truncate bold text-gray-900 dark:text-mainWhite">
                  {board.title}
                </h3>
                <div className="flex-1 min-w-fit ">
                  {board.files && board.files.length != 0 ? (
                    <DocumentTextIcon className="inline-block h-5 w-5 flex-1 text-slate-500" />
                  ) : (
                    ''
                  )}

                  <strong className="text-mainYellow">
                    <ChatAltIcon className="inline-block h-5 w-5" />
                    {board.commentCount}
                  </strong>
                </div>
              </div>
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
                className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50 hidden group-hover:block dark:from-white"
              />
              <p className="relative text-lg font-semibold text-white hidden group-hover:block dark:text-black">
                <EyeIcon className="inline-block h-5 w-5 mx-2 text-divisionGray dark:text-gray-700" />
                {board.visitCount}
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  };
  useEffect(() => {}, []);
  return (
    <>
      {notices.length != 0 ? (
        <div className="border shadow-inner block mb-5 bg-gray-50 px-2 rounded-xl dark:bg-gray-800 dark:border-darkComponent">
          <div name="공지사항" className="relative py-2">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-y-2 border-mainYellow mx-4" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-5 bg-gray-50 text-2xl font-medium text-gray-900 dark:bg-gray-800 dark:text-mainWhite">
                공지
              </span>
            </div>
          </div>
          <Horizontable>
            <div className=" mt-2 flex gap-x-6">
              {notices.map((board, index) => card(board, index, true))}
            </div>
          </Horizontable>
          <div name="공지사항" className="relative my-2">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            ></div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-lg font-medium text-gray-900 dark:bg-mainBlack dark:text-mainWhite"></span>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {/*=====================================================================*/}
      <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {boards?.map((board, index) => card(board, index, false))}
      </div>
    </>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(Gallary);
