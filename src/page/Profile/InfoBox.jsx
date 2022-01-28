import React from 'react';
import GitHub from './InfoBoxTypes/GitHub';

function getChildren(type, params) {
  switch (type) {
    case 'github':
      return (
        <div className="dark:text-mainWhite">
          <GitHub gitId={params.gitId} />
        </div>
      );
    default:
      return (
        <div className="text-center w-full dark:text-mainWhite">infoBox</div>
      );
  }
}

export default function InfoBox(props) {
  return (
    <div className="w-1/2 h-1/2 p-10 float-left">
      <div className="bg-divisionGray dark:bg-darkComponent rounded-2xl p-5 w-full h-full flex items-center">
        {getChildren(props.type, props.params)}
      </div>
    </div>
  );
}
