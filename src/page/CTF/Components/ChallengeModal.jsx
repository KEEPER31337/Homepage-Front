import {
  Fragment,
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { DownloadIcon, XIcon } from '@heroicons/react/outline';

import '@toast-ui/editor/dist/toastui-editor.css'; //마크다운 편집기 뷰어 에디터
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { Viewer } from '@toast-ui/react-editor';
import Marquee from 'react-fast-marquee';
import dayjs from 'dayjs';

// API
import ctfAPI from 'API/v1/ctf';

const API_URL = process.env.REACT_APP_API_URL;
const FLAG_WAITING_TIME = 5;

const ChallengeModal = forwardRef(({ pid, member }, ref) => {
  const [open, setOpen] = useState(false);
  const [detailProbList, setDetailProbList] = useState({
    challengeId: null,
    title: null,
    content: null,
    categories: [],
    score: null,
    creatorName: null,
    contestId: null,
    solvedTeamCount: null,
    isSolved: null,
    file: null,
  });

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
  }));

  const isDark = false; //Dark모드 여부
  /* const viewerRef = useRef();

  useEffect(() => {
    const viewerInstance = viewerRef.current.getInstance();
    viewerInstance.setMarkdown(detailProbList.content);
  }, [detailProbList.content]); */

  const [flag, setFlag] = useState('');
  const [flagCheckMsg, setFlagCheckMsg] = useState(null);
  const onChange = (e) => {
    setFlag(e.target.value);
  };

  const getMsgColor = () => {
    let color;
    switch (flagCheckMsg) {
      case '정답':
        color = 'green';
        break;
      case '오답':
        color = 'red';
        break;
      default:
        color = 'gray';
    }

    return `border-${color}-300 bg-${color}-200 text-${color}-800`;
  };

  const onClick = () => {
    if (flagCheckMsg === '정답') window.location.reload();

    setOpen(false);
    setFlagCheckMsg(null);
  };

  const submitFlagHandler = () => {
    const { remainedSubmitCount, lastTryTime, isSolved, challengeId } =
      detailProbList;

    if (isSolved) {
      setFlagCheckMsg('이미 해치운 문제입니다.');
      return;
    }

    if (!remainedSubmitCount) {
      setFlagCheckMsg('남은 제출 횟수가 없습니다.');
      return;
    }

    const kst = new Date(
      new Date().toLocaleString('en', { timeZone: 'Asia/Seoul' })
    );

    const timeDiff = (kst.getTime() - new Date(lastTryTime).getTime()) / 1000;

    if (timeDiff <= FLAG_WAITING_TIME) {
      setFlagCheckMsg(
        `${Math.ceil(FLAG_WAITING_TIME - timeDiff)}초 뒤 다시 시도해주세요.`
      );
      return;
    }

    ctfAPI
      .submitFlag({
        pid: challengeId,
        content: flag,
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          if (data.data.isCorrect) {
            setFlagCheckMsg('정답');
          } else {
            setFlagCheckMsg('오답');
          }
        } else {
          alert('flag 제출중 오류가 발생하였습니다.');
        }
      });
  };

  useEffect(() => {
    if (!pid) return;

    ctfAPI
      .getDetailProbList({
        pid,
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setDetailProbList(data.data);
        } else {
          alert('문제 세부 목록을 받아오는 중 오류가 발생하였습니다.');
        }
      });
  }, [pid, flagCheckMsg]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClick}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="mt-20 md:mt-32 flex justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block" aria-hidden="true" />
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 sm:pb-2 sm:p-6">
                  <div className="mt-3 sm:mt-0 sm:ml-4">
                    <div className="flex justify-between">
                      <div className="text-blue-600">
                        {detailProbList.solvedTeamCount} Solves
                      </div>
                      <button onClick={onClick}>
                        <XIcon className="w-5 h-5 mr-2 hover:bg-indigo-300 rounded" />
                      </button>
                    </div>

                    <Dialog.Title className="text-center text-xl font-medium text-gray-900 leading-loose m-8">
                      {detailProbList.title}
                      <br />
                      {detailProbList.score}
                    </Dialog.Title>

                    <div className="mx-2 my-5">
                      <div className="text-base text-gray-500">
                        <Viewer
                          initialValue={detailProbList.content}
                          /* change={detailProbList.content} */
                          theme={isDark ? 'dark' : 'light'}
                          height="100%"
                          linkAttributes={{
                            target: '_blank',
                          }}
                          /* ref={viewerRef} */
                        />
                      </div>
                      {detailProbList.file != null ? (
                        <a
                          href={
                            API_URL +
                            '/v1/post/download/' +
                            detailProbList.file?.id
                          }
                          className="mt-14 inline-block "
                          download={detailProbList.file?.fileName}
                        >
                          <button className="p-3 bg-slate-500 flex text-ellipsis rounded-md text-white text-xs">
                            <DownloadIcon
                              className="h-4 w-4 mr-2"
                              aria-hidden="true"
                            />
                            {detailProbList.file?.fileName}
                          </button>
                        </a>
                      ) : null}
                      <div className="flex flex-wrap sm:flex-nowrap shadow-sm sm:text-sm mt-5 mb-2">
                        <input
                          name="flag"
                          type="text"
                          placeholder="KEEPER{...}"
                          defaultValue={flag}
                          onChange={onChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-3/4 mb-2 sm:mb-0 border-gray-300 rounded-md"
                        />
                        <button
                          type="button"
                          className="w-full justify-center rounded-md border border-transparent px-4 py-1 bg-indigo-500 hover:bg-indigo-400 font-medium text-white sm:ml-3 sm:w-1/4"
                          onClick={submitFlagHandler}
                        >
                          제출 <br className="hidden sm:block" />
                          {detailProbList.remainedSubmitCount &&
                            detailProbList.maxSubmitCount &&
                            `(${detailProbList.remainedSubmitCount} / ${detailProbList.maxSubmitCount})`}
                        </button>
                      </div>
                      {flagCheckMsg && (
                        <div
                          className={`border-2 w-full p-1 rounded-md text-center ${getMsgColor()}`}
                        >
                          {flagCheckMsg}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-2 sm:px-6 sm:flex sm:flex-row-reverse">
                  <div className="text-sm text-right text-gray-500">
                    출제자 : {detailProbList.creatorName}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
});

export default ChallengeModal;
