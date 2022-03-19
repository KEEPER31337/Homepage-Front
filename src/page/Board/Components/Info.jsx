import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { ViewGridIcon } from '@heroicons/react/solid';
import WriteButton from './WriteButton';

const fontList = ['돋움', '나눔 고딕', '바탕'];

const Info = (props) => {
  const [font, setFont] = useState('돋움');
  const currentCategoryName = props.state.category.current.name;
  useEffect(() => {
    console.log(font);
  }, [font, currentCategoryName]);

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
            {props.isWrite ? (
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
        {props.isWrite ? (
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
