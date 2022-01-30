import React from 'react';
//import AboutBgImg from 'assets/img/AboutBgImg.png';

export default function Intro() {
  // ANCHOR 내용 받아와보고 content 형식 정할 예정
  /* const content =
    "'지키다'라는 의미를 가진 단어 'KEEP'에서 착안하여, 정보보호에 관한 \
연구를 진행하고 \n그 성과를 공유하기 위해 만들어진 동아리입니다. \
\n \n 전국의 많은 정보보안 동아리들과 교류하고 있으며, \n 습득한 \
지식을 시험해 볼 수 있는 다양한 해킹방어대회에 참여하고 있습니다. \
\n \n 정보보안은 학과 커리큘럼에서 굉장히 늦게, 조금 포함되어 있고 \
\n 인터넷에 자료도 많지 않아 혼자 공부하기 어려운 부분이 있습니다. \
\n \n KEEPER에 가입하시면 선배, 후배, 동기들과 다 같이 정보보안을 \
공부할 수 있습니다. \n 1학기 초에 열리는 오픈 세미나에서 신입 \
회원을 모집합니다. \n 특별한 재능이 있지 않아도, 성실하고 의지 \
넘치는 분이면 환영합니다! \n \n"; */

  const content = `'지키다'라는 의미를 가진 단어 'KEEP'에서 착안하여, 정보보호에 관한 연구를 진행하고
그 성과를 공유하기 위해 만들어진 동아리입니다.

전국의 많은 정보보안 동아리들과 교류하고 있으며,
습득한 지식을 시험해 볼 수 있는 다양한 해킹방어대회에 참여하고 있습니다. 

정보보안은 학과 커리큘럼에서 굉장히 늦게, 조금 포함되어 있고
인터넷에 자료도 많지 않아 혼자 공부하기 어려운 부분이 있습니다. 

KEEPER에 가입하시면 선배, 후배, 동기들과 다 같이 정보보안을 공부할 수 있습니다.
1학기 초에 열리는 오픈 세미나에서 신입 회원을 모집합니다.
특별한 재능이 있지 않아도, 성실하고 의지 넘치는 분이면 환영합니다!`;

  const boss = '이창율'; //TODO 회장 직위 가진 사람 받아오기
  const supervisors = `
동아리 회장 : ${boss}
지도 교수님 : 김호원 교수님`;

  return (
    <div className="my-10 py-5 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-my-6 divide-y divide-gray-300">
          <h1 className="my-10 text-5xl leading-8 font-extrabold tracking-normal text-gray-900 text-center">
            KEEPER
          </h1>
          <div>
            <h2 className="py-10 px-16 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              키퍼(KEEPER) 소개글
            </h2>
            <p
              style={{ whiteSpace: 'pre-wrap' }}
              className="px-20 text-1xl text-black"
            >
              {content}
              <br />
              {supervisors}
            </p>
          </div>
        </div>
        {
          // TODO 이미지 넣고 css 적용하기
          /*
          <img
          className=""
          src={AboutBgImg}
          alt="AboutBgImg"
          />
          */
        }
      </div>
    </div>
  );
}
