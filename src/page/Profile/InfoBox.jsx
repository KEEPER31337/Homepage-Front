import React from 'react';
import GitHub from './InfoBoxTypes/GitHub';
import PostList from './InfoBoxTypes/PostList';

function getChildren(type, params) {
  switch (type) {
    case 'github':
      return (
        <div className="w-full h-full flex items-center">
          <div className="dark:text-mainWhite m-5">
            <GitHub gitId={params.gitId} />
          </div>
        </div>
      );
    case 'postlist':
      return <PostList userId={params.userId} />;
    default:
      return (
        <div className="text-center w-full dark:text-mainWhite">infoBox</div>
      );
  }
}

export default function InfoBox(props) {
  return (
    <div className="w-1/2 h-1/2 p-10 float-left">
      <div className="bg-divisionGray dark:bg-darkComponent rounded-2xl w-full h-full">
        {getChildren(props.type, props.params)}
      </div>
    </div>
  );
}
