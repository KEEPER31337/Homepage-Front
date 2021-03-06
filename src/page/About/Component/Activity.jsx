// TODO 화면 크기 조정 시 단어 단위로 줄바꿈 되도록 하기
import React, { useState, useEffect, useRef } from 'react';

// asset
import seminarImg from 'assets/img/aboutImg/seminar.png';
import mentoringImg from 'assets/img/aboutImg/mentoring.png';
import thesisImg from 'assets/img/aboutImg/thesis.png';

// API
import utilAPI from 'API/v1/util';
import aboutAPI from 'API/v1/about';
import ipAPI from 'API/v1/ip';
import { connect } from 'react-redux';

// 백엔드 썸내일 저장 가능할 때까지 임시로 넣어놓는 중임당
const temp = [
  // TODO 이미지 넣기
  {
    subtitle: '세미나',
    content: (
      <ul>
        <li>매주 금요일 마다 정기적으로 운영</li>
        <li>공지사항 전달 및 건의</li>
        <li>개인 발표 또는 팀 발표</li>
      </ul>
    ),
    imageSrc: seminarImg,
    imageAlt: 'Seminar',
  },
  {
    subtitle: '스터디 & 멘토링',
    content: (
      <ul>
        <li>매학기 활동 시작 전 원하는 스터디 개설 및 스터디원 구성</li>
        <li>스터디원과의 시간 협의 후 가능한 시간에 매주 스터디 진행</li>
        <li>
          신입 회원의 경우 멘토링 진행
          <br /> - 기본적인 프로그래밍, 기초 보안 학습
        </li>
      </ul>
    ),
    imageSrc: mentoringImg,
    imageAlt: 'Study & Mentoring',
  },
  {
    subtitle: '기술문서',
    content: (
      <ul>
        <li>
          여름/겨울 방학 기간에 원하는 주제로 사람을 모집하여 기술 문서 작성
        </li>
        <li>1년에 1건 이상 작성 요구</li>
        <li>제안서 발표, 중간 발표, 최종 발표를 거침?</li>
      </ul>
    ),
    imageSrc: thesisImg,
    imageAlt: 'Technical document',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Activity = ({ member }) => {
  /* TODO 여기부터 지울 거 */
  const [adminFlag, setAdminFlag] = useState(false);
  /* TODO 여기까지 지울 거 */
  const [activityInfo, setActivityInfo] = useState([
    {
      id: null,
      title: null,
      type: null,
      subtitleImageResults: [
        {
          id: null,
          subtitle: null,
          staticWriteTitleId: null,
          thumbnailPath: null,
          displayOrder: null,
          staticWriteContents: [
            {
              id: null,
              content: null,
              staticWriteSubtitleImageId: null,
              displayOrder: null,
            },
          ],
        },
      ],
    },
  ]);

  /* TODO 여기부터 지울 거 */

  const inputRef = useRef(null);

  useEffect(() => {
    if (member.token) {
      utilAPI.getAuthorization({ token: member.token }).then((response) => {
        if (response.list.includes('ROLE_회장')) setAdminFlag(true);
      });
    }
  }, [member]);

  const handleChangeFile = (event) => {
    ipAPI.getIp().then((ipAddress) => {
      const i = Number(inputRef.current.value);
      aboutAPI.tmp({
        id: activityInfo[0].subtitleImageResults[i].id,
        subtitle: activityInfo[0].subtitleImageResults[i].subtitle,
        staticWriteTitleId:
          activityInfo[0].subtitleImageResults[i].staticWriteTitleId,
        displayOrder: activityInfo[0].subtitleImageResults[i].displayOrder,
        ipAddress: ipAddress,
        token: member.token,
        thumbnail: event.target.files[0],
      });
    });
  };
  /* TODO 여기까지 지울 거 */

  useEffect(() => {
    aboutAPI.getActivityInfo().then((data) => {
      if (data.success) {
        data.list.map((title) => {
          // Subtitle display order 순서로 정렬
          title.subtitleImageResults.sort((a, b) => {
            if (a.displayOrder > b.displayOrder) {
              return 1;
            }
            if (a.displayOrder < b.displayOrder) {
              return -1;
            }
            return 0;
          });
          title.subtitleImageResults.map((content) => {
            // Content display order 순서로 정렬
            content.staticWriteContents.sort((a, b) => {
              if (a.displayOrder > b.displayOrder) {
                return 1;
              }
              if (a.displayOrder < b.displayOrder) {
                return -1;
              }
              return 0;
            });
          });
        });
        setActivityInfo(data.list);
      }
    });
  }, []);
  return (
    <div className="">
      {/* TODO 여기부터 지울 거 */}
      {adminFlag && (
        <>
          <input
            type="file"
            id="file"
            onChange={handleChangeFile}
            multiple="multiple"
          />
          <input ref={inputRef} />
        </>
      )}
      {/* TODO 여기까지 지울 거 */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 lg:py-10 px-3 md:px-12 lg:px-16">
          <h2 className="pb-6 lg:pb-10 text-2xl font-extrabold tracking-tight text-black dark:text-mainYellow">
            {activityInfo[0].title}
          </h2>
          <div className="px-2 lg:px-4 space-y-16 text-black dark:text-white">
            {activityInfo[0].subtitleImageResults.map((article, articleIdx) => (
              <div
                key={article.subtitle}
                className="flex flex-col-reverse lg:grid lg:grid-cols-6 lg:gap-x-16 lg:items-center"
              >
                <div
                  className={classNames(
                    articleIdx % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-4',
                    'mt-6 lg:mt-0 lg:row-start-1 lg:col-span-3'
                  )}
                >
                  <h3 className="text-lg font-bold dark:text-pointYellow">
                    {article.subtitle}
                  </h3>
                  <div className="mt-2 text-base">
                    <ul>
                      {article.staticWriteContents.map((contentInfo, index) => (
                        <li key={index}>{contentInfo.content}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div
                  className={classNames(
                    articleIdx % 2 === 0 ? 'lg:col-start-4' : 'lg:col-start-1',
                    'flex-auto lg:row-start-1 lg:col-span-3'
                  )}
                >
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={article.thumbnailPath}
                      alt=""
                      className="object-center object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};
export default connect(mapStateToProps)(Activity);
