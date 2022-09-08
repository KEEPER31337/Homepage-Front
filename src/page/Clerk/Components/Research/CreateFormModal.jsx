import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

//local
import clerkAPI from 'API/v1/clerk';
import { getNow, getTime } from './ResearchUtil';

const CreateFormModal = ({
  isModify,
  onCreateModal,
  setOnCreateModal,
  selectedSurvey,
  isChanged,
  setIsChanged,
  state,
}) => {
  //console.log(selectedSurvey);
  const [formData, setFormData] = useState(
    isModify
      ? {
          year: parseInt(selectedSurvey.surveyName?.split(' ')[0]),
          season: selectedSurvey.surveyName.split(' ')[1],
          startDate: selectedSurvey.openTime.split('T')[0],
          startTime: selectedSurvey.openTime.split('T')[1],
          endDate: selectedSurvey.closeTime.split('T')[0],
          endTime: selectedSurvey.closeTime.split('T')[1],
          isVisible: selectedSurvey.isVisible,
          description: selectedSurvey.description,
        }
      : {
          year: '',
          season: '1학기',
          startDate: getNow(),
          startTime: getTime(),
          endDate: getNow(),
          endTime: getTime(),
          isVisible: true,
          description: '',
        }
  );
  const token = state.member.token;

  const registerHandler = () => {
    if (isModify) {
      //수정
      clerkAPI
        .modifyResearch({
          token: token,
          surveyId: selectedSurvey.surveyId,
          surveyName: `${formData.year}년 ${formData.season} 활동조사`,
          openTime: formData.startDate + ' ' + formData.startTime,
          closeTime: formData.endDate + ' ' + formData.endTime,
          description: formData.description,
          isVisible: formData.isVisible,
        })
        .then((res) => {
          if (res?.success) {
            //console.log('활동인원조사 수정 성공');
            setIsChanged(!isChanged);
            setOnCreateModal(false);
          } else
            alert('활동인원조사 수정 실패! 새로고침 후 다시 실행해주세요.');
        });
    } else {
      //생성
      clerkAPI
        .createResearch({
          token: token,
          surveyName: `${formData.year}년 ${formData.season} 활동조사`,
          openTime: formData.startDate + ' ' + formData.startTime,
          closeTime: formData.endDate + ' ' + formData.endTime,
          description: formData.description,
          isVisible: formData.isVisible,
        })
        .then((res) => {
          if (res?.success) {
            //console.log('활동인원조사 생성 성공');
            setIsChanged(!isChanged);
            setOnCreateModal(false);
          } else
            alert('활동인원조사 생성 실패! 새로고침 후 다시 실행해주세요.');
        });
    }
  };

  return (
    <div className="font-basic border h-w-full flex justify-center fixed top-0 left-0 right-0 bottom-0 z-[99] bg-mainBlack bg-opacity-60 dark:text-mainWhite">
      <div className="my-auto text-sm sm:text-base h-[50vh] flex flex-col">
        <div className="h-[3em] rounded-t-lg relative p-3 pr-8 bg-mainWhite font-bold dark:bg-darkPoint dark:text-gray-200">
          KEEPER 활동인원조사 {isModify ? '수정하기' : '등록하기'}
          {/*console.log(formData)*/}
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
          className="max-w-2xl w-[95vw] sm:w-[70vw] h-full bg-slate-200 rounded-b-lg flex flex-col justify-center dark:bg-darkComponent"
          onSubmit={(e) => {
            e.preventDefault();
            registerHandler();
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
                  defaultValue={formData?.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  required
                />
                년
                <select
                  className="mt-1 inline-block pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 rounded-md dark:bg-mainBlack dark:border-darkComponent"
                  onChange={(e) =>
                    setFormData({ ...formData, season: e.target.value })
                  }
                  defaultValue={formData?.season}
                  required
                >
                  <option value="1학기">1학기</option>
                  <option value="여름방학">여름방학</option>
                  <option value="2학기">2학기</option>
                  <option value="겨울방학">겨울방학</option>
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
                        formData?.startDate ? formData.startDate : getNow()
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          startDate: e.target.value,
                        })
                      }
                      required
                    />
                    <input
                      type="time"
                      className="mt-1 inline-block px-1 py-1 border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 text-xs rounded-md dark:bg-mainBlack dark:border-darkComponent"
                      defaultValue={formData?.startTime}
                      onBlur={(e) =>
                        setFormData({
                          ...formData,
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
                          formData?.endDate ? formData.endDate : getNow()
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            endDate: e.target.value,
                          })
                        }
                        required
                      />
                      <input
                        type="time"
                        className="mt-1 inline-block px-1 py-1 border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 text-xs rounded-md dark:bg-mainBlack dark:border-darkComponent"
                        defaultValue={formData?.endTime}
                        onBlur={(e) =>
                          setFormData({
                            ...formData,
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
                    formData?.description ? formData.description : ''
                  }
                  placeholder="설문 소개"
                  onBlur={(e) =>
                    setFormData({
                      ...formData,
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
                  className=" mt-1 inline-block text-sm text-violet-400 border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 rounded-md checked:bg-violet-400 dark:bg-mainBlack dark:border-darkComponent dark:ring-offset-darkComponent"
                  defaultChecked={!formData.isVisible}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isVisible: !e.target.checked,
                    })
                  }
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
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-400 hover:bg-violet-500 focus:outline-none dark:bg-violet-500 dark:hover:bg-violet-400"
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
