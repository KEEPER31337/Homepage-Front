import React from 'react';
import GitHub from './InfoBoxTypes/GitHub';

function getChildren(type, params) {
  switch (type) {
    case 'github':
      return <GitHub gitId={params.gitId} />;
    default:
      return <div className="text-center">infoBox</div>;
  }
}

export default function InfoBox(props) {
  return (
    <div className="w-1/2 h-1/2 p-10 float-left">
      <div className="bg-divisionGray rounded-2xl w-full h-full p-5">
        {getChildren(props.type, props.params)}
      </div>
    </div>
  );
}
