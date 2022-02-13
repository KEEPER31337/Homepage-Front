import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { ViewGridIcon } from '@heroicons/react/solid';

const fontList = ['돋움', '나눔 고딕', '바탕'];

const Info = (props) => {
  const [font, setFont] = useState('돋움');

  const currentCategoryName = props.state.category.current.name;

  useEffect(() => {
    console.log(font);
  }, [font]);

  return (
    <div className="dark:text-mainWhite">
      <p className="text-3xl border-b-2 dark:text-mainWhite py-2 dark:border-darkComponent">
        {currentCategoryName}
      </p>
      <div className="flex justify-between">
        <p className="m-3 text-gray-400 inline-block w-3/5 dark:text-divisionGray">
          공지사항입니다.
        </p>
        <div>
          {/* 
          <div className="mx-2 inline-block w-1/8">
            <p className="text-center m-2 border-b-2 border-divisionGray dark:border-darkComponent">
              Font
            </p>
            <select
              name="font"
              className="border text-xs focus:ring-mainYellow focus:border-mainYellow dark:border-darkPoint dark:bg-darkComponent dark:text-mainWhite"
              onChange={(e) => {
                setFont(e.target.value);
              }}
            >
              {fontList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>*/}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(Info);
