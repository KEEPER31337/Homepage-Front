import React from 'react';

const BoardInfo = () => {
  return (
    <div className="border-4 border-black">
      <p className="text-3xl">공지사항</p>
      <p className="text-gray-400 inline-block w-3/5">공지사항입니다.</p>
      <div className="border-2 inline-block">
        <p className="text-center">Font</p>
        <select name="font" className="border">
          <option value="돋움">돋움</option>
          <option value="나눔 고딕">나눔 고딕</option>
          <option value="바탕">바탕</option>
        </select>
      </div>
      <div className="border-2 inline-block">
        <p className="text-center">Style</p>
        <span>
          <input
            type="radio"
            className="bg-mainYellow hidden peer"
            id="text"
            name="style"
          ></input>
          <label
            for="text"
            className="border-2 peer-checked:border-mainYellow rounded-lg"
          >
            1
          </label>
        </span>
        <span>
          <input
            type="radio"
            className="bg-mainYellow hidden peer"
            id="text+image"
            name="style"
          ></input>
          <label
            for="text+image"
            className="border-2 peer-checked:border-mainYellow rounded-lg"
          >
            2
          </label>
        </span>
        <span>
          <input
            type="radio"
            className="bg-mainYellow hidden peer"
            id="gallary"
            name="style"
          ></input>
          <label
            for="gallary"
            className="border-2 peer-checked:border-mainYellow rounded-lg"
          >
            3
          </label>
        </span>
      </div>
    </div>
  );
};

export default BoardInfo;
