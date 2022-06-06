import {
  Fragment,
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { DownloadIcon } from '@heroicons/react/outline';
import { connect, useDispatch, useSelector } from 'react-redux';
import actionMember from 'redux/action/member';

// API
import ctfAPI from 'API/v1/ctf';

const testData = {
  data: {
    challengeId: 15,
    title: 'name_436115754228',
    score: 1000,
    category: {
      id: 4,
      name: 'Forensic',
    },
    contestId: 21,
    creatorName: '탈퇴회원',
    solvedTeamCount: 1,
    content: 'desc_436115754228',
    file: {
      id: 617,
      fileName: '658a9d6396.jpg',
      filePath: 'keeper_files/test/658a9d6396.jpg',
      fileSize: 0,
      uploadTime: '2022-05-22T00:14:31.371648654',
      ipAddress: '111.111.111.111',
    },
  },
};

const ChallengeModal = forwardRef((challengeId, ref) => {
  const [open, setOpen] = useState(false);
  const [detailProbList, setDetailProbList] = useState({
    challengeId: null,
    title: null,
    content: null,
    category: {
      id: null,
      name: null,
    },
    score: null,
    creatorName: null,
    contestId: null,
    solvedTeamCount: null,
    isSolved: null,
    file: null,
  });

  const cancelButtonRef = useRef(null);

  //redux 연결
  const token = useSelector((store) => store.member.token);
  const memberInfo = useSelector((store) => store.member.memberInfo);
  //dispatch 예시
  const dispatch = useDispatch();
  const updateInfo = ({ memberInfo }) => {
    dispatch(actionMember.updateInfo({ memberInfo }));
  };

  useEffect(() => {
    updateInfo({ memberInfo });
  }, [memberInfo]);

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
      ctfAPI
        .getDetailProbList({
          pid: challengeId.challengeId,
          token: token,
        })
        .then((data) => {
          if (data.success) {
            console.log(data);
            setDetailProbList(data.data);
          } else {
            console.log(data);
            alert('문제 세부 목록을 받아오는 중 오류가 발생하였습니다.');
          }
        });
    },
  }));

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                    <div className="text-blue-600">
                      {detailProbList.solvedTeamCount} Solves
                    </div>
                    <Dialog.Title className="text-center text-xl font-medium text-gray-900 leading-loose m-8">
                      {detailProbList.title}
                      <br />
                      {detailProbList.score}
                    </Dialog.Title>

                    <div className="m-5">
                      <div className="text-base text-gray-500">
                        {detailProbList.content}
                      </div>
                      <button className="mt-14 p-3 bg-slate-500 flex rounded-md text-white text-xs">
                        <DownloadIcon
                          className="h-4 w-4 mr-2"
                          aria-hidden="true"
                        />
                        {detailProbList.file}{' '}
                        {/* TODO 파일 이름으로 받아오고 싶은데 일단 모르겠음 */}
                      </button>
                      <div className="flex shadow-sm sm:text-sm my-5">
                        <input
                          type="text"
                          placeholder="KEEPER{...}"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-4/5 border-gray-300 rounded-md"
                        />
                        <button
                          type="button"
                          className="w-full justify-center rounded-md border border-transparent px-4 bg-indigo-500 hover:bg-indigo-400 font-medium text-white sm:ml-3 sm:w-1/5"
                          onClick={() => setOpen(false)}
                        >
                          제출
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-2 sm:px-6 sm:flex sm:flex-row-reverse">
                  <div className="text-sm text-right text-gray-500 italic">
                    Author : {detailProbList.creatorName}
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
