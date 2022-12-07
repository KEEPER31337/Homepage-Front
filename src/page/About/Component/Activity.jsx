// TODO 화면 크기 조정 시 단어 단위로 줄바꿈 되도록 하기
import React, { useState, useEffect, useRef } from 'react';

// API
import utilAPI from 'API/v1/util';
import aboutAPI from 'API/v1/about';
import ipAPI from 'API/v1/ip';
import { connect } from 'react-redux';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Activity = ({ member }) => {
  const [adminFlag, setAdminFlag] = useState(false);
  const [isTitleEditMode, setIsTitleEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState();
  const token = member.token;
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
    aboutAPI.getInfo({ type: 'activity' }).then((data) => {
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

  const editTitle = () => {
    setNewTitle(activityInfo[0].title);
    if (isTitleEditMode) {
      aboutAPI
        .changeTitle({
          id: activityInfo[0].id,
          title: newTitle,
          type: 'activity',
          token: token,
        })
        .then((res) => {
          setActivityInfo([res.data]);
        });
    }
    setIsTitleEditMode(!isTitleEditMode);
  };

  const inputNewTitle = (e) => {
    setNewTitle(e.target.value);
  };

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
          {isTitleEditMode ? (
            <input
              className="pb-6 lg:pb-10 text-2xl font-extrabold tracking-tight text-black dark:text-mainYellow dark:bg-darkPoint inline-block"
              onChange={inputNewTitle}
              value={newTitle}
            />
          ) : (
            <h2 className="pb-6 lg:pb-10 text-2xl font-extrabold tracking-tight text-black dark:text-mainYellow inline-block">
              {activityInfo[0].title}
            </h2>
          )}
          {adminFlag && (
            <button
              className="text-xs text-gray-500 underline inline-block ml-2 align-top"
              onClick={editTitle}
            >
              {isTitleEditMode ? '확인' : '수정'}
            </button>
          )}
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
