import { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';

import Header from '../Components/TableOfAttend/TableOfAttendHeader';
import TableContent from '../Components/TableOfAttend/TableContent';
import AuthModal from '../Components/AuthModal';
import clerkAPI from 'API/v1/clerk.js';

const TableOfAttend = ({ member, darkMode }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState('');
  const isDark = darkMode?.isDark;
  const [page, setPage] = useState(0);
  const [userSize, setUserSize] = useState(15);

  const auth = ['ROLE_회장', 'ROLE_부회장', 'ROLE_서기'];
  const jobs = member?.memberInfo?.jobs;
  const ModalRef = useRef({});
  useEffect(() => {
    if (!jobs?.some((i) => auth.includes(i))) {
      ModalRef.current.open();
    }
  }, []);

  const closeBtn = () => {
    setIsOpen(false);
  };

  console.log(page);

  const appendBtn = () => {
    setIsOpen(false);
    clerkAPI
      .createSeminar({ token: member.token, openTime: date + ' 00:00:00' })
      .then((data) => {
        if (data.success) {
          clerkAPI
            .getAllSeminarAttend({
              token: member.token,
              page: 0,
              size: 40,
              seasonStartDate: '2022-01-01',
              seasonEndDate: '2023-10-26',
            })
            .then((data) => {
              //console.log(data);
            });
          clerkAPI
            .getSeminarsList({
              token: member.token,
            })
            .then((data) => {
              //console.log(data);
            });
        }
        if (!data.success) {
          //TODO 생성안됐을때 toast같은거 띄워주기
          //console.log(data);
        }
      });
  };

  const getNow = () => {
    return new Date().toISOString().substring(0, 10);
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center">
        <div className="w-full flex mx-2">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex justify-center lg:justify-start w-full">
              <Header
                setIsOpen={setIsOpen}
                page={page}
                setPage={setPage}
                userSize={userSize}
              />
            </div>
            <TableContent page={page} userSize={userSize} />
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
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
                      ? 'w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'
                      : 'w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all'
                  }
                >
                  <Dialog.Title
                    as="h3"
                    className={
                      isDark
                        ? 'text-lg font-medium leading-6 text-gray-900'
                        : 'text-lg font-medium leading-6 text-violet-300'
                    }
                  >
                    세미나 추가
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">세미나 날짜</p>
                    <input
                      type="date"
                      className={
                        isDark
                          ? 'mt-1 inline-block px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md bg-mainWhite text-mainBlack'
                          : 'mt-1 inline-block px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md bg-mainBlack text-violet-200'
                      }
                      onChange={(event) => setDate(event.target.value)}
                      defaultValue={getNow()}
                      required
                    />
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
                      onClick={appendBtn}
                    >
                      추가
                    </button>
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
