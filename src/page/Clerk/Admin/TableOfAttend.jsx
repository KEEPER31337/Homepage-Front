import { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';

import AuthUser from 'shared/AuthUser';
import Header from '../Components/TableOfAttend/TableOfAttendHeader';
import TableContent from '../Components/TableOfAttend/TableContent';

const TableOfAttend = ({ member }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState();

  function closeModal() {
    setIsOpen(false);
  }

  const getNow = () => {
    return new Date().toISOString().substring(0, 10);
  };

  return (
    <>
      <div className="w-4/5 flex flex-col flex-1">
        <div className="h-full w-full flex container mx-auto justify-center items-center">
          <div className="flex flex-col justify-center items-center w-4/5">
            <Header setIsOpen={setIsOpen} />
            {/* 여기서 작업하면 됩니당~!~! */}
            <TableContent />
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    세미나 추가
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">세미나 날짜</p>
                    <input
                      type="date"
                      className="mt-1 inline-block px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
                      defaultValue={getNow()}
                      required
                    />
                  </div>

                  <div className="mt-4 w-full flex justify-end">
                    <button
                      type="button"
                      className="mx-2 inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
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
    </>
  );
};

const mapStateToProps = (state) => {
  return { member: state.member };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableOfAttend);
