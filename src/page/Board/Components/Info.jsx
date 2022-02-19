import React, { useState, useEffect } from 'react';

import { ViewGridIcon } from '@heroicons/react/solid';

const fontList = ['돋움', '나눔 고딕', '바탕'];
const styleList = ['text', 'text+image', 'gallary'];

const Info = () => {
  const [option, setOption] = useState({
    font: '돋움', //초기 옵션 설정
    style: 'text',
  });
  const { font, style } = option; //비구조화 할당

  useEffect(() => {
    console.log(font);
    console.log(style);
  }, [font, style]);

  return (
    <div className="dark:text-mainWhite">
      <p className="text-3xl border-b-2 dark:text-mainWhite py-2 dark:border-darkComponent">
        공지사항
      </p>
      <div className="flex justify-between">
        <p className="m-3 text-gray-400 inline-block w-3/5 dark:text-divisionGray">
          공지사항입니다.
        </p>
        <div>
          <div className="mx-2 inline-block w-1/8">
            <p className="text-center m-2 border-b-2 border-divisionGray dark:border-darkComponent">
              Font
            </p>
            <select
              name="font"
              className="border text-xs focus:ring-mainYellow focus:border-mainYellow dark:border-darkPoint dark:bg-darkComponent dark:text-mainWhite"
              onChange={(e) => {
                setOption({ font: e.target.value, style });
              }}
            >
              {fontList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="mx-2 inline-block w-1/8">
            <p className="text-center m-2 border-b-2 border-divisionGray dark:border-darkComponent">
              Style
            </p>
            <div>
              {styleList.map((item) => (
                <span key={item} className="m-1">
                  <input
                    type="radio"
                    className="bg-mainYellow hidden peer"
                    id={item}
                    name="style"
                    checked={style === item}
                    onChange={() => {
                      setOption({ font, style: item });
                    }}
                  ></input>
                  <label
                    htmlFor={item}
                    className="border-2 rounded-lg  peer-checked:border-mainYellow peer-checked:text-mainYellow dark:border-darkComponent dark:text-darkComponent"
                  >
                    <ViewGridIcon className="inline-block h-5 w-5" />
                    {/*item*/}
                  </label>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
