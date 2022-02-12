import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, forwardRef, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';

// API

const MessageModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [authCode, setAuthCode] = useState('');

  // navigate
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
    if (props.link) navigate(props.link);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      openModal();
    },
  }));

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
                  알림
                </Dialog.Title>
                <p className="pb-2">{props.children}</p>
                <div className="m-auto mt-4 w-fit">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-bold border-2 border-amber-400 rounded-md text-amber-900 bg-amber-100 hover:bg-amber-200"
                    onClick={closeModal}
                  >
                    확인
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

export default MessageModal;
