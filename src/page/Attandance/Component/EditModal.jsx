import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, forwardRef, useImperativeHandle } from 'react';

const MessageModal = forwardRef(({ handleUpdateMessage }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = () => {
    handleUpdateMessage(message);
    setIsOpen(false);
    setMessage('');
  };

  const handleOpen = () => {
    setIsOpen(true);
    setMessage('');
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      handleOpen();
    },
  }));

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-red"
          onClose={handleSave}
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
                  메세지 업데이트
                </Dialog.Title>
                <p className="pb-2"></p>
                <div>
                  <input
                    type="text"
                    required
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    className=" rounded-md   
                        block w-full px-1 py-1 border border-divisionGray dark:border-transparent
                      focus:outline-mainYellow dark:bg-darkPoint dark:outline-white autofill:bg-yellow-200"
                  />
                </div>
                <div className="m-auto mt-4 w-fit">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-bold border-2 border-amber-400 rounded-md text-amber-900 bg-amber-100 hover:bg-amber-200"
                    onClick={handleSave}
                  >
                    저장
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
