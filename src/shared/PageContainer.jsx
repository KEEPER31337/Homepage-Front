import React from 'react';

const PageContainer = (props) => {
  return (
    <div className="min-h-screen bg-backGray  dark:bg-mainBlack dark:text-mainYellow">
      {props.children}
    </div>
  );
};

export default PageContainer;
