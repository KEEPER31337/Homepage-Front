import React, { useState, useEffect, useRef } from 'react';

// API
import utilAPI from 'API/v1/util';
import { connect } from 'react-redux';
import aboutAPI from 'API/v1/about';
import memberAPI from 'API/v1/member';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Intro = ({ member }) => {
  const [adminFlag, setAdminFlag] = useState(false);
  const [isTitleEditMode, setIsTitleEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState();
  const token = member.token;
  const [introInfo, setIntroInfo] = useState([
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

  const [boss, setBoss] = useState('');

  useEffect(() => {
    aboutAPI.getInfo({ type: 'intro' }).then((data) => {
      if (data.success) {
        setIntroInfo(data.list);
      }
    });
    memberAPI.getCommonMembers().then((data) => {
      if (data.success) {
        setBoss(
          data.list.filter((member) => member.jobs.includes('ROLE_회장'))[0]
            .nickName
        );
      }
    });
  }, []);

  useEffect(() => {
    if (member.token) {
      utilAPI.getAuthorization({ token: member.token }).then((response) => {
        if (response.list.includes('ROLE_회장')) setAdminFlag(true);
      });
    }
  }, [member]);

  const editTitle = () => {
    setNewTitle(introInfo[0].title);
    if (isTitleEditMode) {
      aboutAPI
        .changeTitle({
          id: introInfo[0].id,
          title: newTitle,
          type: 'intro',
          token: token,
        })
        .then((res) => {
          setIntroInfo([res.data]);
        });
    }
    setIsTitleEditMode(!isTitleEditMode);
  };

  const inputNewTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const pageTitle = 'KEEPER';

  const content =
    introInfo[0].subtitleImageResults[0].staticWriteContents[0].content;

  const supervisors = `
동아리 회장 : ${boss}
지도 교수님 : 김호원 교수님`;

  return (
    // TODO 배경 이미지 넣기
    <div className="py-4 lg:py-5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-my-6 divide-y divide-divisionGray">
          <h1 className="py-6 lg:py-10 text-4xl lg:text-5xl leading-8 tracking-normal font-extrabold text-black dark:text-white text-center">
            {pageTitle}
          </h1>
          <div className="py-6 lg:py-10 px-3 md:px-12 lg:px-16">
            {isTitleEditMode ? (
              <input
                className="pb-6 lg:pb-10 text-2xl font-extrabold tracking-tight text-black dark:text-mainYellow dark:bg-darkPoint inline-block"
                onChange={inputNewTitle}
                value={newTitle}
              />
            ) : (
              <h2 className="pb-6 lg:pb-10 text-2xl w-fit font-extrabold tracking-tight text-black dark:text-mainYellow inline-block">
                {introInfo[0].title}
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
            <div className="md:whitespace-pre-wrap px-2 lg:px-4 text-base text-black dark:text-white">
              {content}
              <br />
              <div className="whitespace-pre-wrap">{supervisors}</div>
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
export default connect(mapStateToProps)(Intro);
