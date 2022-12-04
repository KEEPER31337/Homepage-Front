import React, { useState, useEffect, useRef } from 'react';

// API
import utilAPI from 'API/v1/util';
import aboutAPI from 'API/v1/about';
import { connect } from 'react-redux';

const temp = [
  {
    subtitle: '2020',
    content: (
      <ul>
        <li>암호동아리 지원사업 참가</li>
      </ul>
    ),
  },
  {
    subtitle: '2018',
    content: (
      <ul>
        <li>KUCIS, 시원포럼 경남지역 연합세미나 주최</li>
      </ul>
    ),
  },
  {
    subtitle: '2017',
    content: (
      <ul>
        <li>교내 서비스 취약점 분석</li>
      </ul>
    ),
  },
  {
    subtitle: '2016',
    content: (
      <ul>
        <li>KUCIS 사업 참여</li>
      </ul>
    ),
  },
  {
    subtitle: '2015',
    content: (
      <ul>
        <li>KUCIS 사업 참여, MS(MicroSoft) Windows10 서포터즈 1등</li>
      </ul>
    ),
  },
  {
    subtitle: '2014',
    content: (
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
    subtitle: '2012',
    content: (
      <ul>
        <li>
          본교 학생회관에서 KUCIS 영남권역 세미나를 개최하여 부산 외의
          인접지역에 있는 정보보호동아리들과 지식을 공유하고 교류함
        </li>
      </ul>
    ),
  },
  {
    subtitle: '2010',
    content: (
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

const History = ({ member }) => {
  const [adminFlag, setAdminFlag] = useState(false);
  const [editTitleMode, setEditTitleMode] = useState(false);
  const [newTitle, setNewTitle] = useState();
  const token = member.token;
  const [historyInfo, setHistoryInfo] = useState([
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

  const titleInput = useRef();

  useEffect(() => {
    if (member.token) {
      utilAPI.getAuthorization({ token: member.token }).then((response) => {
        if (response.list.includes('ROLE_회장')) setAdminFlag(true);
      });
    }
  }, [member]);

  useEffect(() => {
    aboutAPI.getHistoryInfo().then((data) => {
      if (data.success) {
        data.list.map((title) => {
          // Subtitle display order 순서로 정렬
          title.subtitleImageResults.sort((a, b) => {
            if (a.displayOrder < b.displayOrder) {
              return 1;
            }
            if (a.displayOrder > b.displayOrder) {
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
        setHistoryInfo(data.list);
      }
    });
  }, [historyInfo]);

  const editTitle = () => {
    setNewTitle(historyInfo[0].title);
    if (editTitleMode) {
      aboutAPI
        .changeTitle({
          id: historyInfo[0].id,
          title: newTitle,
          type: 'history',
          token: token,
        })
        .then((res) => {});
    }
    setEditTitleMode(!editTitleMode);
  };

  const inputNewTitle = (e) => {
    setNewTitle(e.target.value);
  };

  return (
    <div className="py-4 lg:py-5 / my-5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 lg:py-10 px-3 md:px-12 lg:px-16">
          {!editTitleMode && (
            <h2 className="pb-6 lg:pb-10 text-2xl font-extrabold tracking-tight text-black dark:text-mainYellow inline-block">
              {historyInfo[0].title}
            </h2>
          )}
          {editTitleMode && (
            <input
              className="pb-6 lg:pb-10 text-2xl font-extrabold tracking-tight text-black dark:text-mainYellow dark:bg-darkPoint inline-block"
              onChange={inputNewTitle}
              value={newTitle}
              ref={titleInput}
            />
          )}
          {adminFlag && (
            <>
              <button
                className="text-xs text-gray-500 underline inline-block ml-2 align-top"
                onClick={editTitle}
              >
                {editTitleMode ? '확인' : '수정'}
              </button>
            </>
          )}
          <div className="px-2 lg:px-4 overflow-hidden">
            {historyInfo[0].subtitleImageResults.map((article, articleIdx) =>
              article.staticWriteContents.length ? (
                <div
                  key={article.subtitle}
                  className={classNames(
                    articleIdx !==
                      historyInfo[0].subtitleImageResults.length - 1
                      ? 'pb-10'
                      : '',
                    'relative'
                  )}
                >
                  <>
                    {articleIdx !==
                    historyInfo[0].subtitleImageResults.length - 1 ? ( // 원 사이 잇는 짝대기
                      <div
                        className="-ml-px absolute mt-0.5 top-4 left-3.5 w-1.5 h-full bg-mainYellow"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex items-start group">
                      <span
                        className="h-9 flex items-center"
                        aria-hidden="true"
                      >
                        <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-mainYellow rounded-full"></span>
                      </span>
                      <span className="ml-4 min-w-0 flex flex-col">
                        <span className="text-sm font-bold tracking-wide text-gray-500 dark:text-pointYellow">
                          {article.subtitle}
                        </span>
                        <span className="text-gray-500 dark:text-white">
                          <ul>
                            {article.staticWriteContents.map(
                              (contentInfo, index) => (
                                <li key={index}>{contentInfo.content}</li>
                              )
                            )}
                          </ul>
                        </span>
                      </span>
                    </div>
                  </>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};
export default connect(mapStateToProps)(History);
