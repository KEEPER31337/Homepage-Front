import React from 'react';
import GitHub from './InfoBoxTypes/GitHub';
import PostList from './InfoBoxTypes/PostList';
import Social from './InfoBoxTypes/Social';
import SetPwd from './InfoBoxTypes/SetPwd';
import SetInfo from './InfoBoxTypes/SetInfo';
import SetEmail from './InfoBoxTypes/SetEmail';

function getChildren(type, params) {
  switch (type) {
    case 'github':
      return (
        <div className="w-full p-5">
          <div className="dark:text-mainWhite w-full">
            <GitHub gitId={params.gitId} />
          </div>
        </div>
      );
    case 'postlist':
      return <PostList userId={params.userId} />;
    case 'social':
      return <Social socialList={params.socialList} />;
    case 'setPwd':
      return <SetPwd token={params.token} />;
    case 'setInfo':
      return <SetInfo token={params.token} memberInfo={params.memberInfo} />;
    case 'setEmail':
      return <SetEmail token={params.token} />;
    default:
      return (
        <div className="text-center w-full dark:text-mainWhite">infoBox</div>
      );
  }
}

export default function InfoBox(props) {
  return (
    <div className="w-full px-10 pb-10 float-left">
      <div className="bg-divisionGray dark:bg-darkComponent rounded-2xl w-full min-h-[20vh]">
        {getChildren(props.type, props.params)}
      </div>
    </div>
  );
}
