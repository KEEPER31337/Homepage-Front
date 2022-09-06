import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, forwardRef, useImperativeHandle } from 'react';

const AlertModal = forwardRef(({ msg }, ref) => {
  //modal 관련
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
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

          <div className="flex justify-center w-full h-full items-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="font-basic text-center flex flex-col justify-end items-center bg-white rounded-lg w-fit h-[20vh] p-4">
                <div>{msg}</div>
                <div
                  onClick={closeModal}
                  className="bg-white w-full hover:bg-slate-100 cursor-pointer rounded-lg p-2 mt-4"
                >
                  닫기
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});

export default AlertModal;
