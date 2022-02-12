import React from 'react';
import { Link } from 'react-router-dom';

const SignInBoxMobile = () => {
  return (
    <div>
      <Link
        to="signup"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-mainYellow hover:bg-pointYellow"
      >
        회원가입
      </Link>
      <p className="mt-6 text-center text-base font-medium text-mainBlack">
        Existing account?{' '}
        <Link
          to="signin"
          className="text-base text-mainYellow hover:text-pointYellow"
        >
          로그인
        </Link>
      </p>
    </div>
  );
};

export default SignInBoxMobile;
