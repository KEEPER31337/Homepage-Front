import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

//local
import clerkAPI from 'API/v1/clerk';
import { getNow } from './ResearchUtil';

const CreateFormModal = ({
  isModify,
  setOnCreateModal,
  researchData,
  setResearchData,
  state,
}) => {
  const token = state.member.token;
  const myStatus = state.member.memberInfo.jobs;

  const registerHandler = () => {
    if (!isModify) {
      //수정
    } else {
      //생성
      clerkAPI.createResearch({
        token: token,
        surveyName: '2023년 1학기 활동조사',
        openTime: [2022, 8, 25, 23, 26, 14, 979593000],
        closeTime: [2022, 8, 27, 23, 26, 14, 979593000],
        description: '2023년 1학기 키퍼 회원의 활동 조사를 위한 설문조사',
        isVisible: false,
      });
    }
  };
  return (
    <div className="font-basic border h-w-full flex justify-center fixed top-0 left-0 right-0 bottom-0 z-[99] bg-mainBlack bg-opacity-60">
      <div className="my-auto text-sm sm:text-base h-[50vh] flex flex-col">
        <div className="h-[3em] rounded-t-lg relative p-3 pr-8 bg-mainWhite font-bold dark:bg-darkPoint dark:text-gray-200">
          KEEPER 활동인원조사 {isModify ? '수정하기' : '등록하기'}
          <button
            className="text-2xl absolute top-2 right-[15px] w-5 font-bold text-center text-gray-400 bg-transparent"
            onClick={() => {
              setOnCreateModal(false);
            }}
          >
            &times;
          </button>
        </div>
        <form
          className="max-w-2xl w-[95vw] sm:w-[70vw] h-full bg-slate-200 rounded-b-lg flex flex-col justify-center"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col items-center h-full overflow-auto">
            <div className="flex flex-col gap-4 p-2">
              <div className="flex items-center gap-2">
                <span className="w-[5em] font-bold">활동 기간</span>
                <input
                  type="number"
                  id="year"
                  className="mt-1 inline-block px-3 w-[5em] py-2 text-sm border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 rounded-md dark:bg-mainBlack dark:border-darkComponent"
                  placeholder="연도"
                  defaultValue={researchData?.year}
                  onChange={(e) =>
                    setResearchData({ ...researchData, year: e.target.value })
                  }
                  required
                />
                년
                <select
                  className="mt-1 inline-block pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 rounded-md dark:bg-mainBlack dark:border-darkComponent"
                  onChange={(e) =>
                    setResearchData({ ...researchData, season: e.target.value })
                  }
                  defaultValue={researchData?.season}
                  required
                >
                  <option value="1">1학기</option>
                  <option value="2">여름방학</option>
                  <option value="3">2학기</option>
                  <option value="4">겨울방학</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="min-w-[5em] w-[5em] font-bold">조사 기간</span>
                <div className="sm:block flex flex-col">
                  <div className="sm:inline-block block">
                    <input
                      type="date"
                      className="mt-1 inline-block px-3 py-2 mr-1 border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
                      defaultValue={
                        researchData?.startDate
                          ? researchData.startDate
                          : getNow()
                      }
                      onChange={(e) =>
                        setResearchData({
                          ...researchData,
                          startDate: e.target.value,
                        })
                      }
                      required
                    />
                    <input
                      type="time"
                      className="mt-1 inline-block px-1 py-1 border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 text-xs rounded-md dark:bg-mainBlack dark:border-darkComponent"
                      defaultValue={researchData?.startTime}
                      onBlur={(e) =>
                        setResearchData({
                          ...researchData,
                          startTime: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="inline-block">
                    <span className="mx-1">~</span>
                    <span className="inline-block">
                      <input
                        type="date"
                        className="mt-1 inline-block px-3 py-2 mr-1 border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
                        defaultValue={
                          researchData?.endDate
                            ? researchData.endDate
                            : getNow()
                        }
                        onChange={(e) =>
                          setResearchData({
                            ...researchData,
                            endDate: e.target.value,
                          })
                        }
                        required
                      />
                      <input
                        type="time"
                        className="mt-1 inline-block px-1 py-1 border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 text-xs rounded-md dark:bg-mainBlack dark:border-darkComponent"
                        defaultValue={researchData?.endTime}
                        onBlur={(e) =>
                          setResearchData({
                            ...researchData,
                            endTime: e.target.value,
                          })
                        }
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="min-w-[5em] font-bold">설문 설명</span>

                <textarea
                  className="resize-none w-full mt-1 inline-block px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 rounded-md dark:bg-mainBlack dark:border-darkComponent"
                  defaultValue={
                    researchData?.description ? researchData.description : ''
                  }
                  placeholder="설문 소개"
                  onBlur={(e) =>
                    setResearchData({
                      ...researchData,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="min-w-[5em] w-[5em] font-bold">
                  비공개
                  <br />
                  <span className="text-xs">(=임시저장)</span>
                </span>

                <input
                  type="checkbox"
                  className=" mt-1 inline-block text-sm text-violet-400 border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 rounded-md checked:bg-violet-400 dark:bg-mainBlack dark:border-darkComponent"
                  checked={researchData?.isVisible ? true : false}
                  onChange={(e) =>
                    setResearchData({
                      ...researchData,
                      isVisible: !e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center m-3">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:bg-gray-600 dark:text-gray-300 dark:border-darkComponent"
              onClick={() => setOnCreateModal(false)}
            >
              닫기
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-400 hover:bg-violet-500 focus:outline-none"
              onClick={() => registerHandler()}
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

export default connect(mapStateToProps)(CreateFormModal);
