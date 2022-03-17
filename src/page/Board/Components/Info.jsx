import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { ViewGridIcon } from '@heroicons/react/solid';
import WriteButton from './WriteButton';

const fontList = ['돋움', '나눔 고딕', '바탕'];

const Info = ({ isWrite, state }) => {
  //const [font, setFont] = useState('돋움');
  const [currentCategoryName, setCurrentCategoryName] = useState('');
  useEffect(() => {
    setCurrentCategoryName(state.category.current.name);
    //console.log(props.state.category);
  }, [currentCategoryName]);

  return (
    <div className="flex">
      <div className="dark:text-mainWhite w-full mx-3">
        <p className="text-3xl border-b-2 dark:text-mainWhite py-2 dark:border-darkComponent">
          {currentCategoryName}
        </p>
        <div className="flex justify-between">
          <p className="m-3 text-gray-400 inline-block w-3/5 dark:text-divisionGray">
            {currentCategoryName}입니다.
          </p>
          <div>
            {isWrite ? (
              ''
            ) : (
              <div
                name="right-sideBar"
                className="m-5 w-[20vw] hidden md:inline-block"
              >
                <WriteButton />
              </div>
            )}
          </div>
        </div>
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
