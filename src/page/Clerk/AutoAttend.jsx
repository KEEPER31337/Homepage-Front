import React from 'react';
import AuthUser from 'shared/AuthUser';

const AutoAttend = () => {
  return (
    <AuthUser>
      {/* AuthUser : 로그인이 안 되어있을 때, 또는 로그인 만료가 되었을 때 
    로그인 페이지로 가게 하는 컴포넌트 */}
      <div className="flex flex-1 justify-center">
        <div className="">
          세미나 줌 자동 출결 페이지
          {/* 여기서 작업하면 됩니당~!~! */}
        </div>
      </div>
    </AuthUser>
  );
};

export default AutoAttend;
