import React from 'react';
import Logo from 'assets/img/keeper_logo.png';

const SignIn = () => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full ">
        <div>
          <img className="mx-auto h-35 w-auto" src={Logo} alt="" />
        </div>

        <form className="mt-8 space-y-8" action="#" method="POST">
          {/*1번째 div. 아이디 + 비밀번호 */}
          <div className="space-y-4">
            <div>
              <input
                id="id"
                name="id"
                type="text"
                autoComplete="off"
                required
                className="appearance-none rounded-md  
              
              relative block w-full px-3 py-4 border border-gray-300 
              placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none 
              focus:bg-backGray focus:border-backGray 
              "
                placeholder="아이디"
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                required
                className="appearance-none rounded-lg 
              relative block w-full px-3 py-4 border 
              border-gray-300 placeholder-gray-500 
              text-gray-900 rounded-b-md focus:outline-none 
              focus:bg-backGray focus:border-backGray 

              focus:z-10 sm:text-sm"
                placeholder="비밀번호"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full 
            flex justify-center px-4 py-4 border 
            border-transparent text-sm font-medium 
            rounded-lg text-white bg-mainYellow 
            hover:bg-pointYellow "
            >
              로그인
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center form-check">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="appearance-none h-4 w-4 border
              border-gray-300 checked:bg-mainYellow
              "
              />

              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm   
            text-gray
            hover:text-pointYellow"
              >
                로그인 상태 유지
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium 
            text-gray hover:text-pointYellow"
              >
                아이디 찾기
              </a>{' '}
              |{' '}
              <a
                href="#"
                className="font-medium 
            text-gray hover:text-pointYellow"
              >
                비밀번호 찾기
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
