import React from 'react';
import Icon from './keyicon.png';

/* This example requires Tailwind CSS v2.0+ */
const articles = [
  {
    subtitle: '동아리 지원',
    content: (
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
    subtitle: '이벤트',
    content: (
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
    subtitle: '대외활동',
    content: 'CTF 참가',
    imageSrc: Icon,
  },
];

export default function Excellence() {
  const sectionTitle = '동아리 자랑';
  return (
    <div className="bg-mainYellow my-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 lg:py-10 px-12 lg:px-16">
          <h2 className="pb-6 lg:pb-10 text-2xl font-extrabold tracking-tight text-white text-center drop-shadow">
            {sectionTitle}
          </h2>
          <div className="px-2 lg:px-4 text-black">
            <div className="max-w-2xl mx-auto grid grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              {articles.map((article) => (
                <div
                  key={article.subtitle}
                  className="items-center sm:flex lg:block bg-white bg-opacity-40 p-7 sm:p-10 rounded-xl border-white border-2 border-opacity-60"
                >
                  <div className="sm:flex-shrink-0">
                    <div className="flow-root">
                      <img
                        className="w-24 h-auto mx-auto rounded-xl"
                        src={article.imageSrc}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="px-4 xl:px-7 mt-5 sm:mt-0 sm:ml-3 lg:mt-5 lg:ml-0">
                    <h3 className="text-center sm:text-left lg:text-center text-lg font-bold text-gray-900">
                      {article.subtitle}
                    </h3>
                    <div className="py-2 text-center sm:text-left text-black">
                      {article.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
