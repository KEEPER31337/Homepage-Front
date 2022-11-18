import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ViewGridIcon } from '@heroicons/react/solid';

import WriteButton from './WriteButton';

const fontList = ['돋움', '나눔 고딕', '바탕'];

const Info = ({ isWrite, state }) => {
  //const [font, setFont] = useState('돋움');
  const { categoryName } = useParams();

  return (
    <div className=" flex px-3">
      <div className="dark:text-mainWhite w-full">
        <p className="text-3xl border-b-2 dark:text-mainWhite dark:border-darkComponent">
          {categoryName}
        </p>
        <div className="flex justify-between">
          <p className="m-3 text-gray-400 inline-block w-3/5 dark:text-divisionGray">
            {categoryName}입니다.
          </p>
          <div>
            {isWrite ? (
              ''
            ) : (
              <div name="right-sideBar" className="mt-2 hidden md:inline-block">
                <WriteButton />
              </div>
            )}
          </div>
        </div>
        {isWrite ? (
          ''
        ) : (
          <div
            name="right-sideBar"
            className="w-full md:hidden flex justify-end"
          >
            <WriteButton />
          </div>
        )}
      </div>
      {/*
      <WriteButton />
      */}
    </div>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(Info);
