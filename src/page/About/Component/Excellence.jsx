import React, { useState, useEffect, useRef } from 'react';

import Icon from 'assets/img/aboutImg/keyicon.png';

// API
import utilAPI from 'API/v1/util';
import aboutAPI from 'API/v1/about';
import ipAPI from 'API/v1/ip';
import { connect } from 'react-redux';

const temp = [
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
          {'ex) 키퍼즐'}
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

const Excellence = ({ member }) => {
  /* TODO 여기부터 지울 거 */
  const [adminFlag, setAdminFlag] = useState(false);
  /* TODO 여기까지 지울 거 */
  const [excellenceInfo, setExcellenceInfo] = useState([
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
        id: excellenceInfo[0].subtitleImageResults[i].id,
        subtitle: excellenceInfo[0].subtitleImageResults[i].subtitle,
        staticWriteTitleId:
          excellenceInfo[0].subtitleImageResults[i].staticWriteTitleId,
        displayOrder: excellenceInfo[0].subtitleImageResults[i].displayOrder,
        ipAddress: ipAddress,
        token: member.token,
        thumbnail: event.target.files[0],
      });
    });
  };
  /* TODO 여기까지 지울 거 */

  useEffect(() => {
    aboutAPI.getExcellenceInfo().then((data) => {
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
        setExcellenceInfo(data.list);
      }
    });
  }, []);

  return (
    <div className="bg-mainYellow my-5">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 lg:py-10  px-3 md:px-12 lg:px-16">
          <h2 className="pb-6 lg:pb-10 text-2xl font-extrabold tracking-tight text-white text-center drop-shadow">
            {excellenceInfo[0].title}
          </h2>
          <div className="px-2 lg:px-4 text-black">
            <div className="max-w-2xl mx-auto grid grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              {excellenceInfo[0].subtitleImageResults.map(
                (article, articleIdx) => (
                  <div
                    key={article.subtitle}
                    className="items-center sm:flex lg:block bg-white bg-opacity-40 p-7 sm:p-10 rounded-xl border-white border-2 border-opacity-60"
                  >
                    <div className="sm:flex-shrink-0">
                      <div className="flow-root">
                        <img
                          className="w-24 h-auto mx-auto rounded-xl"
                          src={article.thumbnailPath}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="px-4 xl:px-7 mt-5 sm:mt-0 sm:ml-3 lg:mt-5 lg:ml-0">
                      <h3 className="text-center sm:text-left lg:text-center text-lg font-bold text-gray-900">
                        {article.subtitle}
                      </h3>
                      <div className="py-2 text-center sm:text-left text-black">
                        <ul>
                          {article.staticWriteContents.map(
                            (contentInfo, index) => (
                              <li key={index}>{contentInfo.content}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};
export default connect(mapStateToProps)(Excellence);
