import { connect } from 'react-redux';
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import AuthModal from '../Components/AuthModal';
import TableOverflow from '../Components/TableOverflow';

import ctfAPI from 'API/v1/ctf';
const Submissions = ({ member, ctfId }) => {
  //권한 없을시 나가게
  const [auth, setAuth] = useState(['ROLE_회장', 'ROLE_출제자']);
  const jobs = member?.memberInfo?.jobs;
  const ModalRef = useRef({});
  useEffect(() => {
    if (!jobs?.some((i) => auth.includes(i))) {
      ModalRef.current.open();
    }
  }, []);

  const [page, setPage] = useState(0);
  const [canGoNext, setCanGoNext] = useState(false);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [rankList, setRankList] = useState([]);

  const goNextPage = () => {
    setPage(page + 1);
  };

  const goPrevPage = () => {
    setPage(page - 1);
  };
  useEffect(() => {
    ctfAPI
      .getSubmitLog({
        token: member.token,
        cid: ctfId,
        page: page,
        size: 10,
      })
      .then((data) => {
        if (data.success) {
          // console.log(data);
          setCanGoPrev(data.page.first);
          setCanGoNext(data.page.last);
          setRankList(data.page.content);
        }
      });
  }, [page]);

  return (
    <div className="md:w-4/5 flex flex-col flex-1 p-3 text-sm">
      <div className="">
        <div className=" w-full container mx-auto justify-center items-center">
          {/* 1. 커스텀 색상 팔레트 */}

          <div className="md:flex p-1 mt-2">
            <div className="w-full m-2 ">
              <div className="p-1 bg-white dark:bg-mainBlack dark:text-mainWhite">
                <div className="flex justify-between m-1">
                  <div className="font-extrabold text-4xl m-1">
                    Submission-log
                  </div>
                </div>
              </div>
              {/*구분선*/}
              <div className="p-[2px] mb-2 dark:from-purple-500 dark:via-purple-200 dark:to-amner-200 bg-gradient-to-r from-amber-500 via-amber-200 to-yellow-300  "></div>
              {/* 2.  프로필 이미지 + 팔로우 + 포인트 */}
              <div className="w-full h-[450px] flex rounded">
                <table className="table-fixed text-center h-fit w-full bg-white dark:text-white dark:bg-darkPoint">
                  <thead>
                    <tr className=" h-10 w-full bg-gradient-to-r from-amber-400 via-red-800 to-black dark:from-pink-300 dark:via-purple-400 dark:to-indigo-400  text-lg text-white font-extrabold text-center ">
                      <th className="w-2/12">문제</th>
                      <th className="w-3/12">플래그</th>
                      <th className="w-1/12">정답</th>
                      <th className="w-1/12">팀</th>
                      <th className="w-1/12">제출자</th>

                      <th className="w-4/12">제출시간</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {rankList.map((info) => (
                      <tr key={info.id} className="h-10 w-full  ">
                        <td className="w-2/12 truncate">
                          {info.challengeName}
                        </td>

                        <TableOverflow info={info.flagSubmitted} />
                        <td className="w-1/12">
                          {' '}
                          {info.isCorrect === true ? (
                            <div className="bg-green-200 w-full rounded-md mx-1 dark:text-black">
                              정답
                            </div>
                          ) : (
                            <div className="bg-amber-200 w-full rounded-md mx-1 dark:text-black">
                              오답
                            </div>
                          )}
                        </td>

                        <td className="w-1/12 truncate px-2">
                          {info.teamName}
                        </td>
                        <td className="w-1/12 truncate">
                          {info.submitterRealname}
                        </td>
                        <td className="w-4/12 truncate">{info.submitTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex w-full justify-end ">
                {canGoPrev ? (
                  <button disabled className="cursor-not-allowed">
                    <ChevronLeftIcon className="inline-block  rounded h-9 w-9 text-white bg-slate-300" />
                  </button>
                ) : (
                  <button onClick={goPrevPage}>
                    <ChevronLeftIcon className="inline-block  dark:hover:bg-indigo-500 hover:bg-amber-500  rounded h-9 w-9 text-white bg-amber-400 dark:bg-indigo-300" />
                  </button>
                )}
                <div className="h-9 w-9 text-center justify-center text-3xl mx-1 rounded flex items-center dark:bg-indigo-300 bg-amber-400 text-white font-bold">
                  {page + 1}
                </div>
                {canGoNext ? (
                  <button disabled className="cursor-not-allowed">
                    <ChevronRightIcon className="inline-block  mr-2  rounded h-9 w-9 text-white bg-slate-300" />
                  </button>
                ) : (
                  <button onClick={goNextPage}>
                    <ChevronRightIcon className="inline-block  mr-2  dark:hover:bg-indigo-500 hover:bg-amber-500    rounded h-9 w-9 text-white bg-amber-400 dark:bg-indigo-300" />
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* NOTE 마이페이지 */}
          {/* 1. 마이페이지(작성글) 컴포넌트*/}
        </div>
      </div>
      <AuthModal ref={ModalRef}>CTF관리자만 접근할 수 있습니다</AuthModal>
    </div>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { member: state.member, ctfId: state.ctf.ctfId };
};

export default connect(mapStateToProps)(Submissions);
