import { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';

import Header from '../Components/TableOfAttend/TableOfAttendHeader';
import TableContent from '../Components/TableOfAttend/TableContent';
import AuthModal from '../Components/AuthModal';
import clerkAPI from 'API/v1/clerk.js';

const TableOfAttend = ({ member, darkMode }) => {
  const [appendModalOpen, setAppendModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [date, setDate] = useState('');
  const [append, setAppend] = useState(0);
  const isDark = !darkMode?.isDark;
  const [page, setPage] = useState(0);
  const [userSize, setUserSize] = useState(15);
  const [season, setSeason] = useState({
    seasonStart: '',
    seasonEnd: '',
  });
  const [semiSeason, setSemiSeason] = useState({
    seasonStart: '',
    seasonEnd: '',
  });

  const getNow = () => {
    return new Date().toISOString().substring(0, 10);
  };

  const auth = ['ROLE_회장', 'ROLE_부회장', 'ROLE_서기'];
  const jobs = member?.memberInfo?.jobs;
  const ModalRef = useRef({});
  useEffect(() => {
    if (!jobs?.some((i) => auth.includes(i))) {
      ModalRef.current.open();
    }
    setDate(getNow() + ' 06:00:00');
    const year = Number(getNow().substr(0, 4));
    const month = Number(getNow().substr(5, 2));
    const day = Number(getNow().substr(8));
    if (month < 3) {
      setSeason({
        seasonStart: String(year - 1) + '-12-22',
        seasonEnd: String(year) + '-03-01',
      });
    } else if (month < 6 && day < 22) {
      setSeason({
        seasonStart: String(year) + '-03-01',
        seasonEnd: String(year) + '-06-21',
      });
    } else if (month < 9) {
      setSeason({
        seasonStart: String(year) + '-06-22',
        seasonEnd: String(year) + '-09-01',
      });
    } else {
      setSeason({
        seasonStart: String(year) + '-09-01',
        seasonEnd: String(year) + '-12-21',
      });
    }
  }, []);

  const closeBtn = () => {
    setAppendModalOpen(false);
    setSearchModalOpen(false);
  };

  const appendBtn = () => {
    setAppendModalOpen(false);
    clerkAPI
      .createSeminar({ token: member.token, openTime: date })
      .then((data) => {
        if (data.success) {
          setAppend(append + 1);
        } else {
          alert('추가 안됐다!');
        }
      });
  };

  const searchBtn = () => {
    setSearchModalOpen(false);
    setSeason(semiSeason);
  };

  return (
    <>
      <div className="w-full h-screen flex">
        <div className="w-full flex mx-2">
          <div className="flex flex-col items-center w-full">
            <div className="flex justify-center lg:justify-start w-full">
              <Header
                setAppendModalOpen={setAppendModalOpen}
                setSearchModalOpen={setSearchModalOpen}
                page={page}
                setPage={setPage}
                userSize={userSize}
                season={season}
              />
            </div>
            <TableContent
              page={page}
              userSize={userSize}
              season={season}
              appendChange={append}
            />
          </div>
        </div>
      </div>
      <Transition appear show={appendModalOpen} as={Fragment}>
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
          {/* 뒷 배경에 회색 투명도 줌 */}

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
                      ? 'w-2/3 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'
                      : 'w-2/3 max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all'
                  }
                >
                  <div className="flex flex-col justify-center items-center">
                    <div
                      as="h3"
                      className={
                        isDark
                          ? 'text-xl font-bold leading-6 text-gray-900'
                          : 'text-xl font-bold leading-6 text-violet-300'
                      }
                    >
                      세미나 추가
                    </div>
                    <p className="text-sm text-gray-500 mt-4">세미나 날짜</p>
                    <input
                      type="date"
                      className={
                        isDark
                          ? 'mt-1 inline-block px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md bg-mainWhite text-mainBlack'
                          : 'mt-1 inline-block px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md bg-mainBlack text-violet-200'
                      }
                      onChange={(event) =>
                        setDate(event.target.value + ' 06:00:00')
                      }
                      defaultValue={date}
                      required
                    />

                    <div className="mt-12 w-full flex justify-end">
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
                        onClick={appendBtn}
                      >
                        추가
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={searchModalOpen} as={Fragment}>
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
          {/* 뒷 배경에 회색 투명도 줌 */}

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
                      ? 'w-2/3 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'
                      : 'w-2/3 max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all'
                  }
                >
                  <div className="flex flex-col justify-center items-center">
                    <div
                      as="h3"
                      className={
                        isDark
                          ? 'text-xl font-bold leading-6 text-gray-900'
                          : 'text-xl font-bold leading-6 text-violet-300'
                      }
                    >
                      세미나 조회
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                      세미나 조회 기간
                    </p>
                    <div className="flex flex-row w-52 items-center justify-between">
                      <p className="text-sm text-gray-500">start</p>
                      <input
                        type="date"
                        className={
                          isDark
                            ? 'mt-1 inline-block px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md bg-mainWhite text-mainBlack'
                            : 'mt-1 inline-block px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md bg-mainBlack text-violet-200'
                        }
                        onChange={(event) =>
                          setSemiSeason((prev) => ({
                            ...prev,
                            seasonStart: event.target.value,
                          }))
                        }
                        defaultValue={semiSeason.seasonStart}
                        required
                      />
                    </div>
                    <div className="flex flex-row w-52 items-center justify-between">
                      <p className="text-sm text-gray-500">end</p>
                      <input
                        type="date"
                        className={
                          isDark
                            ? 'mt-1 inline-block px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md bg-mainWhite text-mainBlack'
                            : 'mt-1 inline-block px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md bg-mainBlack text-violet-200'
                        }
                        onChange={(event) =>
                          setSemiSeason((prev) => ({
                            ...prev,
                            seasonEnd: event.target.value,
                          }))
                        }
                        defaultValue={semiSeason.seasonEnd}
                        required
                      />
                    </div>
                    <div className="mt-12 w-full flex justify-end">
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
                        onClick={searchBtn}
                      >
                        조회
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <AuthModal ref={ModalRef}>접근 권한이 없습니다.</AuthModal>
    </>
  );
};

const mapStateToProps = (state) => {
  return { member: state.member, darkMode: state.darkMode };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableOfAttend);
