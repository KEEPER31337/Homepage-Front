import { Dialog, Transition } from '@headlessui/react';
import { useEffect } from 'react';
import { Fragment, useState, forwardRef, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Viewer } from '@toast-ui/react-editor';

const OtherTeamInfoModal = forwardRef(({ otherTeamInfo }, ref) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };
  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
  }));

  return (
    <>
      <Transition appear show={open} as={Fragment}>
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
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex mt-8 min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 sm:pb-2 sm:p-6">
                    <div className="mt-3 sm:mt-0 sm:ml-4">
                      <Dialog.Title className="text-center text-xl font-medium text-gray-900 leading-loose m-8">
                        <Viewer
                          initialValue={otherTeamInfo?.name}
                          height="100%"
                        />
                        {otherTeamInfo?.score}
                        <div className="text-base text-gray-500">
                          <Viewer
                            initialValue={otherTeamInfo?.description}
                            height="100%"
                          />
                        </div>
                      </Dialog.Title>

                      <div className="mx-5">
                        <div className="my-5">
                          <div className="my-1 text-purple-700 font-semibold">
                            팀원
                          </div>
                          {otherTeamInfo?.teamMembers.map((member) => (
                            <div className="inline-block" key={member.id}>
                              <span className="flex justify-between bg-mainWhite border border-gray-300 min-w-[5em] px-2 py-1 m-[1px] text-sm rounded-full dark:bg-mainBlack">
                                <span>{member.nickName}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="w-full h-[15em] overflow-y-scroll bg-mainWhite dark:bg-mainBlack dark:border-darkComponent">
                          <ul className="my-5">
                            <div className="my-1 flex flex-row items-center">
                              <div className="text-purple-700 font-semibold mr-2">
                                해치운 문제
                              </div>
                              <div className="text-slate-400 text-xs">
                                {otherTeamInfo?.lastSolvedTime &&
                                  `(마지막 업데이트 ${dayjs(
                                    otherTeamInfo?.lastSolvedTime
                                  ).format('YYYY-MM-DD HH:mm:ss')})`}
                              </div>
                            </div>
                            {otherTeamInfo?.solvedChallengeList.map(
                              (challenge) => (
                                <li
                                  className="border px-2 flex justify-between items-center group dark:hover:bg-gray-800 dark:border-darkComponent"
                                  key={challenge.challengeId}
                                >
                                  <div className="justify-between flex items-center w-full h-9">
                                    <div className="text-sm font-medium">
                                      {challenge.title}
                                    </div>
                                    <div>
                                      <div className="text-sm text-purple-400 text-right">
                                        {challenge.score}
                                      </div>
                                      <div className="text-xs text-slate-400 text-right">
                                        {challenge?.solvedTime &&
                                          dayjs(challenge.solvedTime).format(
                                            'MM-DD HH:mm:ss'
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* 이거 없으면 focusTrap워닝 */}
                    <button onClick={closeModal} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});

export default OtherTeamInfoModal;
