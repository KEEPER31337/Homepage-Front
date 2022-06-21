import React, { useState, useEffect } from 'react';
//import AboutBgImg from 'assets/img/AboutBgImg.png';

// API
import aboutAPI from 'API/v1/about';
import memberAPI from 'API/v1/member';

export default function Intro() {
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

  const [boss, setBoss] = useState();

  useEffect(() => {
    aboutAPI.getIntroInfo().then((data) => {
      if (data.success) {
        setIntroInfo(data.list);
        console.log(data);
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

  const pageTitle = 'KEEPER';
  const sectionTitle = introInfo[0].title;

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
            <h2 className="pb-6 lg:pb-10 text-2xl font-extrabold tracking-tight text-black dark:text-mainYellow">
              {sectionTitle}
            </h2>
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
}
