import React, { Fragment, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';

import useWindowDimensions from './WindowDimensions';
import {
  gridAll,
  gridDate,
  gridUser,
  gridAttend,
  gridGis,
} from './datesClassname';
import { seminars, userttt } from './testdata';
import clerkAPI from 'API/v1/clerk';

const TableContent = ({ member, state, page, userSize }) => {
  const { height, width } = useWindowDimensions();
  const [seminarSize, setSeminarSize] = useState(0);
  const [userLength, setUserLength] = useState(0);
  const [visible, setVisible] = useState(false);
  const [deleteSemianr, setDeleteSeminar] = useState({
    seminarId: 0,
    seminarName: '',
    visible: false,
  });
  const [reasons, setReasons] = useState([]);
  const [select, setSelect] = useState('');
  const isDark = state.darkMode?.isDark;
  const [content, setContent] = useState({
    name: '',
    user: '',
  });
  const [attendanceId, setAttendanceId] = useState(0);
  const [absenceExcuse, setAbsenceExcuse] = useState('');

  const [allAttend, setAllAttend] = useState([]);
  const [users, setUsers] = useState([]);
  const [semiUsers, setSemiUsers] = useState([]);

  useEffect(() => {
    // 전체 세미나 출석 조회 && 출석 이유 조회 && 활동회원 조회
    clerkAPI
      .getAllSeminarAttend({
        token: member.token,
        page: 0,
        size: 40,
        seasonStartDate: '2022-01-01',
        seasonEndDate: '2023-10-26',
      })
      .then((data) => {
        console.log(data.page.content);
        setAllAttend(data.page.content);
        setSeminarSize(data.page.content.length);
      });
    clerkAPI
      .getSeminarAttendance({
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setReasons(data.list);
          setSelect(data.list[0]);
        }
      });
    clerkAPI
      .getTypeMemberList({
        token: member.token,
        typeId: 2,
      })
      .then((data) => {
        if (data.success) {
          setSemiUsers(data.list);
        }
      });
    clerkAPI
      .deleteSeminar({
        token: member.token,
        seminarId: 6,
      })
      .then((data) => {
        if (data.success) {
          console.log(data);
        }
      })
      .then(() => {
        clerkAPI
          .getSeminarsList({ token: member.token })
          .then((data) => console.log(data));
      });
  }, []);

  useEffect(() => {
    setUsers(
      semiUsers.filter(
        (data, idx) => page * userSize <= idx && idx < (page + 1) * userSize
      )
    );
  }, [semiUsers, page, userSize]);

  useEffect(() => {
    setUserLength(users.length + 1);
  }, [users]);

  const clicked = (idx, idx2) => {
    setContent({
      name: seminars[idx2 - 1].seminarName,
      user: users[idx].realName,
    });
    setVisible(true);
  };

  const Child = ({ idx, idx2, atten, attendID }) => {
    return (
      <div
        className={gridAttend[idx2 + 2][idx + 3]}
        key={(idx + 1) * 1000 + idx2}
        onClick={() => {
          clicked(idx, idx2);
          setAttendanceId(attendID);
        }}
      >
        {atten}
      </div>
    );
  };

  const changedAbsenceExcuse = (e) => {
    setAbsenceExcuse(e.target.value);
  };

  const closeBtn = () => {
    setVisible(false);
  };

  const editBtn = () => {
    setVisible(false);
    clerkAPI.reviseAttend({
      token: member.token,
      attendanceId: attendanceId,
      seminarAttendanceStatusId: select,
      absenceExcuse: absenceExcuse,
    });
  };

  const deleteSemianrBtn = (seminar) => {
    console.log('seminar', seminar);
    setDeleteSeminar({
      seminarId: seminar.seminarId,
      seminarName: seminar.seminarName,
      visible: true,
    });
  };

  const deleteSeminarCloseBtn = () => {
    setDeleteSeminar((data) => ({ ...data, visible: false }));
  };

  const deleteSeminarDeleteBtn = () => {
    clerkAPI
      .deleteSeminar({
        token: member.token,
        seminarId: deleteSemianr.seminarId,
      })
      .then((data) => {
        console.log(data);
      });
    setDeleteSeminar((data) => ({ ...data, visible: false }));
  };

  return (
    <>
      <div className="relative rounded-xl overflow-auto w-full h-full">
        <div className="absolute w-full">
          <div className="overflow-hidden w-full">
            <div className={gridAll[userLength][seminarSize]}>
              <div className="row-start-[1] col-start-[1] bg-violet-100 sticky left-0 flex items-center justify-center">
                기수
              </div>
              <div className="row-start-[1] col-start-[2] bg-violet-100 sticky left-[60px] flex items-center justify-center">
                이름
              </div>
              {allAttend?.map((seminar, idx) => (
                <div
                  key={idx}
                  className={gridDate[idx + 3]}
                  onClick={() => {
                    deleteSemianrBtn(seminar);
                  }}
                >
                  {width < 640
                    ? seminar.seminarName.substr(5)
                    : seminar.seminarName}
                </div>
              ))}
              {users.map((user, idx) => (
                <div className={gridGis[idx + 2]} key={idx}>
                  {user?.generation}
                </div>
              ))}

              {users.map((user, idx) => (
                <div className={gridUser[idx + 2]} key={idx}>
                  {user?.realName}
                </div>
              ))}

              {allAttend?.map((seminar, idx) =>
                seminar?.sortedSeminarAttendances?.map((user, idx2) =>
                  users.map((userSorted, idx3) => {
                    if (userSorted?.memberId === user.memberId) {
                      return (
                        <Child
                          key={idx * 1000 + idx3}
                          atten={user?.attendanceStatusType}
                          attendID={user?.attendanceId}
                          idx={idx}
                          idx2={idx3}
                        />
                      );
                    }
                  })
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={visible} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeBtn}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={
                isDark
                  ? 'fixed inset-0 bg-black bg-opacity-25'
                  : 'fixed inset-0 bg-white bg-opacity-25'
              }
            />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-100"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-100"
              >
                <Dialog.Panel
                  className={
                    isDark
                      ? 'w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'
                      : 'w-full max-w-md transform overflow-hidden rounded-2xl bg-black text-violet-400 p-6 text-left align-middle shadow-xl transition-all'
                  }
                >
                  <div className="w-full flex flex-col justify-center items-center ">
                    <div className="text-xl text-bold">{content.name}</div>
                    <div className="text-lg">{content.user}</div>
                    <div className="w-full flex flex-row justify-center items-center">
                      <div>사유</div>
                      <select
                        className={
                          isDark
                            ? 'w-1/2 m-2 text-sm border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 rounded-md bg-mainWhite text-mainBlack'
                            : 'w-1/2 m-2 text-sm border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 rounded-md bg-mainBlack text-violet-200'
                        }
                        onChange={(e) => setSelect(e.target.value)}
                        value={select}
                        required
                      >
                        {reasons.map((reason, idx) => (
                          <option key={idx} className="text-sm">
                            {reason.seminarAttendanceStatusType}
                          </option>
                        ))}
                      </select>
                    </div>
                    <textarea
                      rows="4"
                      cols="30"
                      placeholder="개인 사정 사유"
                      onChange={changedAbsenceExcuse}
                      className={
                        isDark
                          ? 'border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 rounded-md bg-mainWhite text-mainBlack'
                          : 'border-gray-200 focus:outline-none focus:ring-violet-400 focus:border-violet-400 rounded-md bg-mainBlack text-violet-200'
                      }
                    ></textarea>
                  </div>
                  <div className="mt-4 w-full flex justify-end">
                    <button
                      type="button"
                      className="mx-2 inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                      onClick={closeBtn}
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                      onClick={editBtn}
                    >
                      수정
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={deleteSemianr.visible} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={deleteSeminarCloseBtn}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={
                isDark
                  ? 'fixed inset-0 bg-black bg-opacity-25'
                  : 'fixed inset-0 bg-white bg-opacity-25'
              }
            />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-100"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-100"
              >
                <Dialog.Panel
                  className={
                    isDark
                      ? 'w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'
                      : 'w-full max-w-md transform overflow-hidden rounded-2xl bg-black text-gray-200 p-6 text-left align-middle shadow-xl transition-all'
                  }
                >
                  <div className="w-full flex flex-col justify-center items-center mt-6">
                    <div className="text-xl text-bold text-violet-300">
                      {deleteSemianr.seminarName}
                    </div>
                    세미나를 삭제하시겠습니까?
                  </div>
                  <div className="mt-4 w-full flex justify-end">
                    <button
                      type="button"
                      className="mx-2 inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                      onClick={deleteSeminarCloseBtn}
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                      onClick={deleteSeminarDeleteBtn}
                    >
                      삭제
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const mapStateToProps = (state) => {
  return { member: state.member, state: state };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContent);
