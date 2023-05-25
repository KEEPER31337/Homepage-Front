import { useState } from 'react';
import Modal from './Modal';
import memberAPI from 'API/v1/member';

const GiftPointModal = ({ modalState, token, userId, memberInfo }) => {
  const MIN_SEND_POINT = 1;
  const MAX_SEND_POINT = memberInfo.point;

  const [isValidPointRange, setIsValidPointRange] = useState(true);
  const [point, setPoint] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = modalState;
  const [isClosing, setIsClosing] = useState(false);

  const closeModal = () => {
    setState(false);
  };

  const submitGift = () => {
    if (point < MIN_SEND_POINT || point > MAX_SEND_POINT) {
      setIsValidPointRange(false);
      return;
    }

    setIsClosing(true);
    memberAPI
      .giftPoint({
        token,
        time: new Date().toISOString(),
        point: parseInt(point),
        detail: message,
        presentedId: userId,
      })
      .then((result) => {
        if (result.success) {
          memberInfo.point = result.data.finalPointMember;
          closeModal();
        } else {
        }
        setIsClosing(false);
      });
  };

  const handleSendPointChange = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setIsValidPointRange(true);
      setPoint(event.target.value);
    }
  };

  return (
    <Modal modalState={modalState}>
      <div className="inline-block p-6 text-center align-middle">
        <div
          as="h3"
          className="m-2 mb-4 
                    text-lg font-bold
                    text-mainBlack dark:text-mainWhite 
                    leading-6"
        >
          포인트 선물하기
        </div>

        <p className="pb-1 text-xs flex justify-end text-gray-600">
          보유 {memberInfo.point}
        </p>
        <div className="pb-2">
          <input
            type="point"
            id="point"
            name="point"
            required
            value={point}
            placeholder="보낼 포인트 입력"
            onChange={handleSendPointChange}
            className="bg-backGray dark:bg-darkPoint 
                        rounded-xl border-0 h-full 
                        px-3 focus:ring-0
                        text-mainBlack dark:text-mainWhite"
          />
          {!isValidPointRange && (
            <p className="text-xs text-red-600">
              {MIN_SEND_POINT}~{MAX_SEND_POINT} 사이 숫자를 입력해주세요.
            </p>
          )}
        </div>
        <div className="pb-2">
          <input
            type="message"
            id="message"
            name="message"
            required
            value={message}
            placeholder="보낼 메세지 입력"
            onChange={(event) => setMessage(event.target.value)}
            className="bg-backGray dark:bg-darkPoint 
                        rounded-xl border-0 h-full 
                        px-3 focus:ring-0
                        text-mainBlack dark:text-mainWhite"
          />
        </div>
        <div className="m-auto mt-4 w-fit">
          <button
            disabled={isClosing}
            type="button"
            className="inline-flex justify-center 
                        px-4 py-2 
                        text-sm font-bold 
                        text-amber-900 dark:text-amber-100
                        border-2 border-amber-400 
                        rounded-md 
                        bg-amber-100 dark:bg-slate-600
                        hover:bg-amber-200 dark:hover:bg-slate-700"
            onClick={submitGift}
          >
            선물하기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GiftPointModal;
