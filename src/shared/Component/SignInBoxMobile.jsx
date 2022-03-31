import React from 'react';
import { Link } from 'react-router-dom';
import { Popover } from '@headlessui/react';

const SignInBoxMobile = () => {
  return (
    <div>
      <Popover.Button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-mainYellow hover:bg-pointYellow">
        <Link to="signin" className="w-full">
          로그인
        </Link>
      </Popover.Button>
      <p className="mt-6 text-center text-base font-medium text-mainBlack dark:text-mainWhite">
        계정이 없으신가요?{' '}
        <Popover.Button className="text-base text-mainYellow hover:text-pointYellow">
          <Link to="signup" className="w-full">
            회원가입
          </Link>
        </Popover.Button>
      </p>
    </div>
  );
};

export default SignInBoxMobile;
