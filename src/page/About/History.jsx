import React from 'react';

const steps = [
  {
    name: '2020',
    description: (
      <ul>
        <li>암호동아리 지원사업 참가</li>
      </ul>
    ),
  },
  {
    name: '2018',
    description: (
      <ul>
        <li>KUCIS, 시원포럼 경남지역 연합세미나 주최</li>
      </ul>
    ),
  },
  {
    name: '2017',
    description: (
      <ul>
        <li>교내 서비스 취약점 분석</li>
      </ul>
    ),
  },
  {
    name: '2016',
    description: (
      <ul>
        <li>KUCIS 사업 참여</li>
      </ul>
    ),
  },
  {
    name: '2015',
    description: (
      <ul>
        <li>KUCIS 사업 참여, MS(MicroSoft) Windows10 서포터즈 1등</li>
      </ul>
    ),
  },
  {
    name: '2014',
    description: (
      <ul>
        <li>
          정보보호동아리 및 정보보호 분야의 현업에 종사하고 있는 사람들까지
          대상으로한 경남권 정보보호 세미나를 주최함
        </li>
        <li>
          경남권 동아리와 함께 청소년을 대상으로 정보보호의 입문을 돕기위한
          Security One을 주최함
        </li>
      </ul>
    ),
  },
  {
    name: '2012',
    description: (
      <ul>
        <li>
          본교 학생회관에서 KUCIS 영남권역 세미나를 개최하여 부산 외의
          인접지역에 있는 정보보호동아리들과 지식을 공유하고 교류함
        </li>
      </ul>
    ),
  },
  {
    name: '2010',
    description: (
      <ul>
        <li>
          한국인터넷진흥원(KISA) 주관 대학 정보보호동아리 지원사업(KUCIS)에 대학
          정보보호 동아리로서 참여
        </li>
      </ul>
    ),
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function History() {
  return (
    <div className="my-10 py-5 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="py-10 px-16 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          동아리 연혁
        </h2>
        <ol role="list" className="px-20 overflow-hidden">
          {steps.map((step, stepIdx) => (
            <li
              key={step.name}
              className={classNames(
                stepIdx !== steps.length - 1 ? 'pb-10' : '',
                'relative'
              )}
            >
              <>
                {stepIdx !== steps.length - 1 ? ( // 원 사이 잇는 짝대기
                  <div
                    className="-ml-px absolute mt-0.5 top-4 left-3.5 w-1.5 h-full bg-mainYellow"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start group">
                  <span className="h-9 flex items-center" aria-hidden="true">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-mainYellow rounded-full"></span>
                  </span>
                  <span className="ml-4 min-w-0 flex flex-col">
                    <span className="text-xs font-semibold tracking-wide uppercase text-gray-500">
                      {step.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {step.description}
                    </span>
                  </span>
                </div>
              </>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
