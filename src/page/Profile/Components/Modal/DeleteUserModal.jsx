import Modal from './Modal';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, forwardRef, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';
// API
import memberAPI from 'API/v1/member';

const DeleteUserModal = ({ modalState, token, signOut }) => {
  const [password, setPassword] = useState('');
  const [state, setState] = modalState;
  const [isClosing, setIsClosing] = useState(false);

  // navigate
  const navigate = useNavigate();

  const closeModal = () => {
    setState(false);
  };

  const submitDelete = () => {
    setIsClosing(true);
    memberAPI.deleteMember({ token, password }).then((data) => {
      // NOTE : 삭제는 시켜버리고 error return 해주는 backend 업데이트 요청
      if (data.success) {
        closeModal();
        signOut();
        navigate(-1);
      }
      setIsClosing(false);
    });
  };

  return (
    <Modal modalState={modalState}>
      <div className="inline-block p-6 text-left align-middle">
        <div
          as="h3"
          className="m-2 mb-4 
                    text-lg font-bold
                    text-mainBlack dark:text-mainWhite 
                    leading-6"
        >
          계정 탈퇴하기
        </div>

        <div className="pb-2">
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="비밀번호 입력"
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
            className="inline-flex justify-center 
                        px-4 py-2 
                        text-sm font-bold 
                        text-amber-900 dark:text-amber-100
                        border-2 border-amber-400 
                        rounded-md 
                        bg-amber-100 dark:bg-slate-600
                        hover:bg-amber-200 dark:hover:bg-slate-700"
            onClick={submitDelete}
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
