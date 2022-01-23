import React from 'react';
import Icon from './keyicon.png';

/* This example requires Tailwind CSS v2.0+ */
const incentives = [
  {
    name: '동아리 지원',
    description: (
      <ul>
        <li>스터디룸 지원</li>
        <li>책 지원</li>
        <li>대외활동 참가 시 식비 지원</li>
        <li>레퍼런스 참가비 지원?</li>
      </ul>
    ),
    imageSrc: Icon,
  },
  {
    name: '이벤트',
    description: (
      <ul>
        <li>
          다양한 이벤트를 통한 동아리 사기 높이기
          <br />
          ex) 키퍼즐
        </li>
        <li>책 지원</li>
        <li>대외활동 참가 시 식비 지원</li>
        <li>레퍼런스 참가비 지원?</li>
      </ul>
    ),
    imageSrc: Icon,
  },
  {
    name: '대외활동',
    description: 'CTF 참가',
    imageSrc: Icon,
  },
];

export default function Excellence() {
  return (
    <div className="my-10 py-5 bg-mainYellow">
      <div className="max-w-7xl mx-auto pb-10 sm:px-2 lg:px-4">
        <h2 className="py-10 px-16 text-2xl font-extrabold text-center drop-shadow tracking-tight text-white sm:text-3xl">
          동아리 자랑
        </h2>
        <div className="max-w-2xl mx-auto px-20 grid grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-3">
          {incentives.map((incentive) => (
            <div
              key={incentive.name}
              className="items-center sm:flex sm:text-left lg:block bg-white bg-opacity-40 p-10 rounded-xl border-white border-2 border-opacity-60"
            >
              <div className="sm:flex-shrink-0">
                <div className="flow-root">
                  <img
                    className="w-24 h-auto mx-auto rounded-xl"
                    src={incentive.imageSrc}
                    alt=""
                  />
                </div>
              </div>
              <div className="px-7 mt-5 sm:mt-0 sm:ml-3 lg:mt-5 lg:ml-0">
                <h3 className="text-keft lg:text-center text-lg font-bold text-gray-900">
                  {incentive.name}
                </h3>
                <p className="text-1xl text-black py-2">
                  {incentive.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
