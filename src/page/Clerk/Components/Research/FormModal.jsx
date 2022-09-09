import { updateLocale } from 'moment';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

//local
import clerkAPI from 'API/v1/clerk';
import { getNow, getTime } from './ResearchUtil';

const FormModal = ({
  isModify,
  onResearchModal,
  setOnResearchModal,
  researchData,
  isRespond,
  response,
  setResponse,
  state,
}) => {
  const [myReply, setMyReply] = useState();

  const token = state.member.token;
  const memberId = state.member.memberInfo.id;
  const replyHandler = () => {
    //console.log(response);
    //console.log(myReply);
    /*console.log({
      token,
      surveyId: researchData.surveyId,
      replyId: Number(myReply.state),
      excuse: myReply.reason,
    });*/
    if (isRespond) {
      //응답 수정
      clerkAPI
        .researchReplyModify({
          token,
          surveyId: researchData.surveyId,
          replyId: Number(myReply.state),
          excuse: myReply.reason,
        })
        .then((res) => {
          //console.log(res);
          if (res?.success) setOnResearchModal(false);
          else
            alert(
              '활동인원조사 응답 수정 실패! 새로고침 후 다시 실행해주세요.'
            );
        });
    } else {
      //응답
      clerkAPI
        .researchReply({
          token,
          surveyId: researchData.surveyId,
          replyId: Number(myReply.state),
          excuse: myReply.reason,
        })
        .then((res) => {
          //console.log(res);
          if (res.success) setOnResearchModal(false);
          else alert('활동인원조사 응답 실패! 새로고침 후 다시 실행해주세요.');
        });
    }
  };
  useEffect(() => {
    if (isRespond) {
      //이미 응답한 경우
      setMyReply(response);
    } else {
      setMyReply({ state: '1', reason: '' });
    }
  }, [onResearchModal]);
  return (
    <div className="font-basic border h-w-full flex justify-center fixed top-0 left-0 right-0 bottom-0 z-[99] bg-mainBlack bg-opacity-60 dark:text-mainWhite">
      <div className="my-auto text-sm sm:text-base">
        <div className="rounded-t-lg relative p-3 pr-8 bg-mainWhite font-bold dark:bg-darkPoint dark:text-gray-200">
          KEEPER 활동인원조사
          <button
            className="text-2xl absolute top-2 right-[15px] w-5 font-bold text-center text-gray-400 bg-transparent"
            onClick={() => {
              setOnResearchModal(false);
            }}
          >
            &times;
          </button>
        </div>
        <form
          className="max-w-2xl w-[95vw] sm:w-[70vw] h-[50vh] bg-slate-200 rounded-b-lg flex flex-col justify-center dark:bg-darkComponent"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col justify-center items-center h-full p-2">
            <div className="w-full sm:w-[28em] flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-[6em] px-2 font-bold">활동 여부</span>
                <select
                  className="mt-1 inline-block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
                  onChange={(e) =>
                    setMyReply({
                      ...myReply,
                      state: e.target.value,
                      reason: '',
                    })
                  }
                  value={myReply?.state}
                  required
                >
                  <option value="1">활동</option>
                  <option value="2">휴면(군대)</option>
                  <option value="3">휴면(기타)</option>
                  <option value="4">졸업</option>
                  <option value="5">탈퇴</option>
                </select>
              </div>
              {parseInt(myReply?.state) === 3 ? (
                <div className="flex items-center gap-2">
                  <span className="min-w-[6em] px-2 font-bold">
                    휴면 사유
                    <br />
                    <span className="text-gray-400">(필수)</span>
                  </span>
                  <textarea
                    className="resize-none w-full h-[10em] mt-1 inline-block px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
                    onBlur={(e) =>
                      setMyReply({ ...myReply, reason: e.target.value })
                    }
                    defaultValue={myReply?.reason ? myReply.reason : ''}
                    required
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="flex justify-end items-center m-3">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:bg-gray-600 dark:text-gray-300 dark:border-darkComponent"
              onClick={() => setOnResearchModal(false)}
            >
              닫기
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-400 hover:bg-violet-500 focus:outline-none dark:bg-violet-500 dark:hover:bg-violet-400"
              onClick={() => replyHandler()}
            >
              {isModify ? '수정하기' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(FormModal);
