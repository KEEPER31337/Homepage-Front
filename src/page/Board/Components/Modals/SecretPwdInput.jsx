import { updateLocale } from 'moment';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './modal.css';

const SecretPwdInput = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, categoryName, id } = props;
  const [pwd, setPwd] = useState('');

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section className="bg-mainWhite dark:bg-darkComponent">
          <header className="relative p-3 pr-8 bg-slate-200 font-bold dark:bg-darkPoint">
            4자리 비밀번호를 입력하세요.
            <button
              className="text-2xl absolute top-0 right-[15px] w-5 font-bold text-center text-gray-400 bg-transparent"
              onClick={close}
            >
              &times;
            </button>
          </header>
          <main className="p-5 border-y border-divisionGray dark:border-gray-600">
            <input
              type="password"
              className="text-xl text-mainBlack px-3 py-2 focus:border-mainYellow focus:ring-mainYellow"
              onBlur={(e) => setPwd(e.target.value)}
            />
            {props.children}
          </main>
          <footer className="px-[12px] py-[16px] text-right">
            <Link to={`/post/${categoryName}/${id}`} state={{ password: pwd }}>
              <button
                className="text-sm mx-1 px-2 py-1 rounded-md text-mainWhite bg-mainYellow hover:bg-pointYellow"
                onClick={close}
              >
                확인
              </button>
            </Link>
            <button
              className=" text-sm mx-1 px-2 py-1 rounded-md text-mainWhite bg-gray-400 hover:bg-gray-500"
              onClick={close}
            >
              닫기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default SecretPwdInput;
