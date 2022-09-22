import React, { useState, useEffect, useRef } from 'react';
import AuthUser from 'shared/AuthUser';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { connect } from 'react-redux';

import memberAPI from 'API/v1/member';
import clerkAPI from 'API/v1/clerk';
import AuthModal from '../Components/AuthModal';
import WriteTable from '../Components/ReasonOfPoint/WriteTable';
import ViewTable from '../Components/ReasonOfPoint/ViewTable';
import TypeModal from '../Components/ReasonOfPoint/TypeModal';
import { getNow } from '../Components/ReasonOfPoint/PointUtil';
import '../Components/ReasonOfPoint/reason.css';

const ReasonOfPoint = ({ state }) => {
  const [appendData, setAppendData] = useState();
  const [recordData, setRecordData] = useState([]);
  const [curYear, setCurYear] = useState();
  const [yearList, setYearList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [Preason, setPreason] = useState([]);
  const [Mreason, setMreason] = useState([]);
  const [onTypeModal, setOnTypeModal] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const token = state?.member?.token;
  const auth = ['ROLE_회장', 'ROLE_부회장', 'ROLE_서기'];
  const jobs = state?.member?.memberInfo?.jobs;
  const ModalRef = useRef({});

  const addData = () => {
    setAppendData([
      ...appendData,
      {
        no: appendData.length + 1,
        member: null,
        pm: 'm',
        typeId: Mreason[0].id,
        index: 0,
        point: Mreason[0].merit,
        date: getNow(),
      },
    ]);
  };
  const saveHandler = () => {
    //console.log(appendData);
    clerkAPI
      .addPoint({
        token,
        data: appendData.map((data) => {
          return {
            date: data.date,
            memberId: data.member?.id,
            meritTypeId: Number(data.typeId),
          };
        }),
      })
      .then((res) => {
        //console.log(res);
        if (res?.success) {
          setAppendData([
            {
              no: 1,
              member: null,
              pm: 'm',
              typeId: Mreason[0].id,
              index: 0,
              point: Mreason[0].merit,
              date: getNow(),
            },
          ]);

          setTimeout(() => setIsChanged(!isChanged), 0);
        } else
          alert(
            '상벌점 내역을 저장하는 데 실패하였습니다. 새로고침 후 다시 실행해주세요.'
          );
      });
  };
  useEffect(() => {
    if (!jobs?.some((i) => auth.includes(i))) {
      ModalRef.current.open();
    }
  }, []);
  useEffect(() => {
    clerkAPI.getPointYearList({ token }).then((res) => {
      //console.log(res);
      if (res?.success) setYearList(res.list);
    });
    clerkAPI.getPointType({ token }).then((res) => {
      //console.log(res);
      if (res?.success) {
        setPreason(res?.list?.filter((reason) => reason.isMerit));
        setMreason(res?.list?.filter((reason) => !reason.isMerit));
      }
    });
    memberAPI.getCommonMembers().then((res) => {
      //console.log(res);
      if (res?.success) setMemberList(res.list);
    });
  }, []);
  useEffect(() => {
    clerkAPI.getPointYearList({ token }).then((res) => {
      //console.log(res);
      if (res?.success) setYearList(res.list);
    });
    clerkAPI.getPointType({ token }).then((res) => {
      //console.log(res);
      if (res?.success) {
        setPreason(res?.list?.filter((reason) => reason.isMerit));
        setMreason(res?.list?.filter((reason) => !reason.isMerit));
      }
    });
    memberAPI.getCommonMembers().then((res) => {
      //console.log(res);
      if (res?.success) setMemberList(res.list);
    });
  }, [isChanged]);

  useEffect(() => {
    //console.log(appendData);
  }, [appendData]);
  useEffect(() => {
    if (yearList?.length !== 0) setCurYear(yearList[yearList.length - 1]);
  }, [yearList]);

  return (
    <>
      {onTypeModal ? (
        <TypeModal
          isOpen={onTypeModal}
          setIsOpen={setOnTypeModal}
          Preason={Preason}
          Mreason={Mreason}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />
      ) : (
        ''
      )}
      <div className="flex flex-1 justify-center min-h-screen">
        <div className="flex flex-col gap-y-4 w-full p-2 bg-gray-100 sm:bg-transparent dark:bg-mainBlack">
          <form
            name="상벌점 추가 폼"
            className="flex flex-col gap-y-2 rounded-md border w-full p-2 bg-mainWhite sm:bg-gray-100 dark:bg-darkComponent dark:border-transparent dark:text-mainWhite"
            onSubmit={(e) => {
              e.preventDefault();
              saveHandler();
            }}
          >
            <p className="text-2xl flex flex-wrap gap-2 justify-between">
              상벌점 내역 추가하기
              <button
                type="button"
                className="text-xs border-2 border-gray-300 rounded-xl py-1 px-2 hover:bg-gray-200 focus:outline-none dark:bg-transparent dark:border-gray-600 dark:hover:bg-darkPoint"
                onClick={() => {
                  setOnTypeModal(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="text-gray-400 w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                  />
                </svg>
                상벌점 사유 리스트 편집하기
              </button>
            </p>
            <div className="rounded-md flex flex-col gap-y-2 p-2 bg-mainWhite dark:bg-darkPoint">
              <WriteTable
                appendData={appendData}
                setAppendData={setAppendData}
                Preason={Preason}
                Mreason={Mreason}
                memberList={memberList}
                isChanged={isChanged}
              />
              <button
                className="flex border rounded-xl justify-center p-1 shadow-sm focus:outline-none dark:border-gray-600"
                onClick={() => addData()}
                type="button"
              >
                <PlusCircleIcon className="inline-block h-5 w-5 translate-y-0.5  text-slate-500" />
                추가하기
              </button>
            </div>
            <div className="flex justify-end items-center">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-300 hover:bg-violet-400 focus:outline-none dark:bg-violet-500 dark:hover:bg-violet-400"
              >
                내역 저장하기
              </button>
            </div>
          </form>
          <div
            name="상벌점 추가 내역"
            className="flex flex-col gap-y-2 rounded-md border w-full p-2  bg-mainWhite sm:bg-gray-100 dark:bg-darkComponent dark:border-transparent dark:text-mainWhite"
          >
            <p className="text-2xl">상벌점 내역</p>
            <div className="flex flex-col gap-y-2 pl-2">
              <div className="flex flex-wrap gap-2 justify-center p-4">
                {yearList?.map((year, index) => (
                  <button
                    key={index}
                    className={
                      (curYear === year
                        ? 'ring-2 ring-violet-400 ring-offset-4 ring-offset-gray-100 bg-violet-400 dark:ring-offset-darkComponent dark:ring-violet-600 dark:bg-violet-600'
                        : 'bg-violet-200 hover:bg-violet-400 dark:bg-violet-400 dark:hover:bg-violet-500 dark:border-2 dark:border-violet-600') +
                      ' shadow-sm rounded-md p-1 px-4 focus:outline-none'
                    }
                    onClick={() => {
                      setCurYear(year);
                    }}
                    disabled={curYear === year}
                  >
                    {year}
                  </button>
                ))}
              </div>
              <ViewTable
                curYear={curYear}
                recordData={recordData}
                setRecordData={setRecordData}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
              />
            </div>
          </div>
        </div>
      </div>
      <AuthModal ref={ModalRef}>접근 권한이 없습니다.</AuthModal>
    </>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(ReasonOfPoint);
