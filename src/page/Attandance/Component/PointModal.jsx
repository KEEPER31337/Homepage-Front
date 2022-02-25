import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, forwardRef, useImperativeHandle } from 'react';
import CoinIcon from 'assets/img/coin.png';

const PointModal = forwardRef(({ attendInfo }, ref) => {
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
      {/* TODO : dark mode에서 버튼 border 매치안됨 */}
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
                  포인트 합계
                </Dialog.Title>
                <table className="w-full font-bold">
                  <tbody>
                    <tr className="m-5">
                      <td className="py-5 pr-5">
                        <img className="w-6 h-6" src={CoinIcon} />
                      </td>
                      <td>출석 포인트</td>
                      <td>{`Point: ${1000}`}</td>
                    </tr>
                    <tr className="m-5">
                      <td className="py-5 pr-5">
                        <img className="w-6 h-6" src={CoinIcon} />
                      </td>
                      <td>개근 포인트</td>
                      <td>{`Point: ${attendInfo?.continuousPoint}`}</td>
                    </tr>
                    <tr className="m-5">
                      <td className="py-5 pr-5">
                        <img className="w-6 h-6" src={CoinIcon} />
                      </td>
                      <td>순위 포인트</td>
                      <td>{`Point: ${attendInfo?.rankPoint}`}</td>
                    </tr>
                    <tr className="m-5">
                      <td className="py-5 pr-5">
                        <img className="w-6 h-6" src={CoinIcon} />
                      </td>
                      <td>랜덤 포인트</td>
                      <td>{`Point: ${attendInfo?.randomPoint}`}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="m-auto mt-4 w-fit">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-bold border-2 border-amber-400 rounded-md text-amber-900 bg-amber-100 hover:bg-amber-200"
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

export default PointModal;
