// TODO 화면 크기 조정 시 단어 단위로 줄바꿈 되도록 하기
// ANCHOR aspect-ratio 뭔지 살펴보기
/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import React from 'react';

const features = [
  // TODO 이미지 넣기
  {
    name: '세미나',
    description: (
      <ul>
        {/* FIXME ul적용 왜 안 되는 지는 살펴봐야겠음 */}
        <li>매주 금요일 마다 정기적으로 운영</li>
        <li>공지사항 전달 및 건의</li>
        <li>개인 발표 또는 팀 발표</li>
      </ul>
    ),
    imageSrc:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
    imageAlt: 'Seminar',
  },
  {
    name: '스터디 & 멘토링',
    description: (
      <ul>
        {/* ul적용 왜 안 되는 지는 살펴봐야겠음 */}
        <li>매학기 활동 시작 전 원하는 스터디 개설 및 스터디원 구성</li>
        <li>스터디원과의 시간 협의 후 가능한 시간에 매주 스터디 진행</li>
        <li>
          신입 회원의 경우 멘토링 진행
          <br /> - 기본적인 프로그래밍, 기초 보안 학습
        </li>
      </ul>
    ),
    imageSrc:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
    imageAlt: 'Study & Mentoring',
  },
  {
    name: '기술문서',
    description: (
      <ul>
        {/* ul적용 왜 안 되는 지는 살펴봐야겠음 */}
        <li>
          여름/겨울 방학 기간에 원하는 주제로 사람을 모집하여 기술 문서 작성
        </li>
        <li>1년에 1건 이상 작성 요구</li>
        <li>제안서 발표, 중간 발표, 최종 발표를 거침?</li>
      </ul>
    ),
    imageSrc:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
    imageAlt: 'Technical document',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  return (
    <div className="my-10 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="py-10 px-16 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          정기 활동
        </h2>
        <div className="px-20 space-y-16">
          {features.map((feature, featureIdx) => (
            <div
              key={feature.name}
              className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center"
            >
              <div
                className={classNames(
                  featureIdx % 2 === 0
                    ? 'lg:col-start-1'
                    : 'lg:col-start-8 xl:col-start-7',
                  'mt-6 lg:mt-0 lg:row-start-1 lg:col-span-4 xl:col-span-5'
                )}
              >
                <h3 className="text-lg font-bold text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-2 text-1xl text-black">
                  {feature.description}
                </p>
              </div>
              <div
                className={classNames(
                  featureIdx % 2 === 0
                    ? 'lg:col-start-8 xl:col-start-7'
                    : 'lg:col-start-1',
                  'flex-auto lg:row-start-1 lg:col-span-6 xl:col-span-5'
                )}
              >
                <div className="aspect-w-5 aspect-h-2 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    src={feature.imageSrc}
                    alt={feature.imageAlt}
                    className="object-center object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}