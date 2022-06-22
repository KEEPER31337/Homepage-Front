import React from 'react';
import { useParams } from 'react-router-dom';

const Loading = () => {
  return (
    <div className="min-h-screen dark:bg-mainBlack dark:text-mainWhite">
      <div className="min-h-[50vh] text-4xl flex items-center justify-center gap-4">
        <span>Loading...</span>
        <div className="inline-block border-4 border-r-mainYellow border-t-mainYellow rounded-full h-16 w-16 animate-spin"></div>
      </div>
    </div>
  );
};
export default Loading;
