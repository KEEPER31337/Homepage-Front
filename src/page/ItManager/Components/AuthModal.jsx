import { Dialog, Transition } from '@headlessui/react';
import {
  Fragment,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AuthModal = forwardRef((props, ref) => {
  //사이드 바에는 권한 없는 경우 뜨지 않지만 url로 접근할 수 있음 이 경우
  //권한 가진 사람만 들어올 수 있다는 모달 뜨고 선거 선택 페이지로 이동
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setOpen(false);
    navigate('/');
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
                <Dialog.Panel className="w-[300px] h-[150px]   rounded-md bg-white p-3 text-left align-middle shadow-xl transition-all">
                  <div className="p-6 text-center">
                    <svg
                      className="mx-auto  w-8 h-8 mb-2 text-gray-400 dark:text-gray-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <h3 className="mb-5 text-md font-basic text-gray-800 dark:text-gray-400">
                      {props.children}
                    </h3>
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

export default AuthModal;
