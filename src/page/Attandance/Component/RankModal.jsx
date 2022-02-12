import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, forwardRef, useImperativeHandle } from 'react';
import PrizeIcon from 'assets/img/prize.png';

const continuous = [
  { rank: 1, point: 500, icon: PrizeIcon },
  { rank: 2, point: 300, icon: PrizeIcon },
  { rank: 3, point: 100, icon: PrizeIcon },
];

const RankModal = forwardRef((props, ref) => {
  let [isOpen, setIsOpen] = useState(false);

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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl ring ring-blue-600 bg-blue-50 text-mainBlack dark:bg-darkComponent">
                <Dialog.Title
                  as="h3"
                  className="m-2 mb-4 text-lg font-bold leading-6"
                >
                  순위 정보
                </Dialog.Title>
                <table className="w-full font-bold">
                  <tbody>
                    {continuous.map((item, index) => (
                      <tr key={index} className="m-5">
                        <td className="py-5 pr-5">
                          <img className="w-6 h-6" src={item.icon} />
                        </td>
                        <td>
                          {`${item.rank}등`} <br />
                        </td>
                        <td>{`Point: ${item.point}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="m-auto mt-4 w-fit">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-bold border-2 border-blue-600 rounded-md text-blue-900 bg-blue-100 hover:bg-blue-200"
                    onClick={closeModal}
                  >
                    Thanks!
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

export default RankModal;
