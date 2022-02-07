import React, { useState, useEffect } from 'react';

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
    <div className="border-4 border-black dark:text-mainWhite">
      <p className="text-3xl dark:text-mainWhite">공지사항</p>
      <div className="flex justify-between">
        <p className="border-2 text-gray-400 inline-block w-3/5 dark:text-divisionGray">
          공지사항입니다.
        </p>
        <div>
          <div className="border-2 inline-block w-1/8">
            <p className="text-center">Font</p>
            <select
              name="font"
              className="border dark:text-mainBlack"
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
          <div className="border-2 inline-block w-1/8">
            <p className="text-center">Style</p>
            <div>
              {styleList.map((item) => (
                <span key={item}>
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
                    className="border-2 peer-checked:border-mainYellow rounded-lg"
                  >
                    ㅁㅁ{/*item*/}
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
