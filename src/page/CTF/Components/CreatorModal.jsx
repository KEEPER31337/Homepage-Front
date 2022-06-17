import { Dialog, Transition } from '@headlessui/react';
import {
  Fragment,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { XIcon, PlusIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
// API
import memberAPI from 'API/v1/member';
import ctfAPI from 'API/v1/ctf';

const CreatorModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [creatorList, setCreatorList] = useState([]);
  const [allMemberList, setAllMemberList] = useState([]); //멤버 추가 시 보여줄 동아리 회원의 전체 리스트

  //redux 연결
  const token = useSelector((store) => store.member.token);

  useEffect(() => {
    memberAPI.getAllMembers().then((data) => {
      setAllMemberList(data.list);
    });
    ctfAPI.getAuthor({ token: token }).then((data) => {
      setCreatorList(data.list);
    });
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      openModal();
    },
  }));

  const addMember = (author) => {
    //이미 출제자인사람 추가하기 막음
    if (creatorList.findIndex((cmember) => cmember.id == author.id) == -1) {
      ctfAPI
        .addAuthor({
          memberId: author.id,
          token: token,
        })
        .then((data) => {
          if (data.success) {
            // console.log(data);
            ctfAPI.getAuthor({ token: token }).then((data) => {
              setCreatorList(data.list);
            });
          } else {
            // console.log(data);
            alert('출제자 지정 중 오류가 발생하였습니다.');
          }
        });
    }
  };

  const deleteMember = (id) => {
    //TODO API 들어오면 할것!!
    ctfAPI
      .deleteAuthor({
        memberId: id,
        token: token,
      })
      .then((data) => {
        if (data.success) {
          // console.log(data);
          ctfAPI.getAuthor({ token: token }).then((data) => {
            setCreatorList(data.list);
          });
        } else {
          // console.log(data);
        }
      });
    // console.log('삭제할 사람의 id는 ', id);
  };

  return (
    <>
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
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <dt className="text-sm mt-3 font-medium text-gray-700 dark:text-gray-400">
                    현재 출제자
                  </dt>
                  <div className=" mt-1 text-sm text-gray-900 dark:text-mainWhite">
                    <div className="border-t mb-1  dark:border-gray-500"></div>
                    <div className="bg-slate-100 min-h-[3em] dark:bg-gray-700">
                      {creatorList.map((member) => (
                        <div className="inline-block" key={member.id}>
                          <span className="flex justify-between bg-mainWhite border border-gray-300 min-w-[5em] px-2 py-1 m-[1px] text-sm rounded-full dark:bg-mainBlack">
                            <span>{member.nickName}</span>
                            <XIcon
                              className="inline-block h-5 w-5 cursor-pointer text-slate-300 hover:text-slate-400  dark:text-gray-500 dark:hover:text-gray-300"
                              aria-hidden="true"
                              //TODO 출제자 api 안됨!!!
                              // onClick={() => deleteMember(member.id)}
                            />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full border h-[15em] overflow-y-scroll bg-mainWhite dark:bg-mainBlack dark:border-darkComponent">
                      <ul className="">
                        {allMemberList.map((memb, membIdx) => (
                          <li
                            className="border cursor-pointer p-1 flex justify-between items-center group hover:bg-slate-100 dark:hover:bg-gray-800 dark:border-darkComponent"
                            onClick={() => addMember(memb)}
                            key={membIdx}
                          >
                            <div className="flex items-center">
                              <div>
                                {memb.thumbnailPath ? (
                                  <img
                                    className="border inline-block h-9 w-9 rounded-full dark:border-gray-600"
                                    src={memb.thumbnailPath}
                                    alt=""
                                  />
                                ) : (
                                  <div className="inline-block h-9 w-9 rounded-full"></div>
                                )}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium">
                                  {memb.nickName}
                                </div>
                              </div>
                            </div>
                            <PlusIcon
                              className="text-gray-400 -ml-1.5 h-5 w-5 "
                              aria-hidden="true"
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className=" rounded-md border border-transparent bg-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      닫기
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
});

export default CreatorModal;
