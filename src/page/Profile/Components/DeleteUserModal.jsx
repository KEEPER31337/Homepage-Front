import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, forwardRef, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';

// API
import memberAPI from 'API/v1/member';

const DeleteUserModal = forwardRef(({ token, signOut }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [password, setPassword] = useState('');

  // navigate
  const navigate = useNavigate();

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

  const submitDelete = () => {
    setIsClosing(true);
    memberAPI.deleteMember(token, password).then((data) => {
      // NOTE : 삭제는 시켜버리고 error return 해주는 backend 업데이트 요청
      if (data.success) {
        closeModal();
        signOut();
      }
      setIsClosing(false);
    });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-red"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            />
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl ring ring-amber-400 bg-amber-50 text-mainBlack dark:bg-darkComponent">
                <Dialog.Title
                  as="h3"
                  className="m-2 mb-4 text-lg font-bold leading-6"
                >
                  계정 탈퇴하기
                </Dialog.Title>

                <div className="pb-2">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="bg-backGray dark:bg-darkPoint 
                        rounded-xl border-0 w-5/6 h-full 
                        px-3 focus:ring-0
                        text-mainBlack dark:text-mainWhite"
                  />
                </div>
                <div className="m-auto mt-4 w-fit">
                  <button
                    disabled={isClosing}
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-bold border-2 border-amber-400 rounded-md text-amber-900 bg-amber-100 hover:bg-amber-200"
                    onClick={submitDelete}
                  >
                    탈퇴하기
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});

export default DeleteUserModal;
