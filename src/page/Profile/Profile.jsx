import React, { useEffect, useState } from 'react';
import CircularGauge from './CircularGauge';
import Group from './Group';
import InfoBox from './InfoBox';
import InfoRouteBtn from './InfoRouteBtn';
import Home from 'assets/img/home.png';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import axios from 'axios';

const dummyUser = {
  img: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/ad/ad3763fd50aff9d64b8f2a5619b2db9f43420ae2_full.jpg',
  name: '이름',
  nickName: '닉네임',
  loginId: 'userLoginId',
  level: 256,
  point: 78,
  type: '정회원',
  rank: '우수회원',
  job: '무직',
  github: 'zune2222',
};
const LevelUp = 100;
const isMe = false;
const isFriend = false;

const myBtns = ['수정', '비밀번호 변경', '탈퇴'];
const otherBtns = ['쪽지', '친구 등록', '선물 하기'];
const friendBtns = ['쪽지', '친구 삭제', '선물 하기'];

const Profile = () => {
  const user = dummyUser;

  const [gitMd, setGitMd] = useState(null);
  const [btns, setBtns] = useState(new Array());

  useEffect(async () => {
    if (isMe) setBtns(myBtns);
    else if (isFriend) setBtns(friendBtns);
    else setBtns(otherBtns);
  }, [isMe, isFriend]);

  useEffect(async () => {
    try {
      await axios
        .get(
          'https://api.github.com/repos/' +
            user.github +
            '/' +
            user.github +
            '/readme'
        )
        .then((res) => {
          const base64 = res.data.content;
          setGitMd(
            decodeURIComponent(
              escape(window.atob(base64.replace('\n', '').replace(/\s/g, '')))
            )
          );
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const userGroups = {
    type: {
      name: user.type,
      img: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/753640/4018a8f2c5b6cb72162d157315f27fbdbb92050d.png',
    },
    rank: {
      name: user.rank,
      img: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/400630/21e2819817725efff601afc2e52b44772d80fb0a.png',
    },
    job: {
      name: user.job,
      img: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/400630/276a940028f208f167c3b8790eb11031d552f384.png',
    },
  };

  return (
    <div className="bg-mainWhite dark:bg-mainBlack pt-20">
      <div className="mx-auto h-full w-[900px] bg-backGray dark:bg-darkPoint rounded-3xl shadow-2xl">
        {/*profile head*/}
        <div className="w-full h-[265px]">
          <div className="px-10 pt-10 pb-7 w-full h-full flex float-left">
            {/*profile image*/}
            <div className="pr-2 w-3/12 object-cover">
              <img className="w-full h-full rounded-2xl" src={user.img} />
            </div>
            {/*profile head info*/}
            <div className="pt-3 w-5/12 h-full">
              <div className="text-left text-4xl h-1/5 dark:text-pointYellow">
                {user.name}
              </div>
              <div className="mt-3 text-left text-lg h-1/5 dark:text-mainYellow">
                {user.nickName + ' ' + user.loginId}
              </div>
              {/*profile Level*/}
              <div className="mt-10 pr-2 w-full h-2/6">
                <div className="pt-2 text-center float-left text-3xl dark:text-pointYellow">
                  Level
                </div>
                <div className="pl-5 h-full float-left flex">
                  <CircularGauge
                    inRad={20}
                    outRad={24}
                    parcent={user.point / LevelUp}
                    text={user.level}
                  />
                </div>
              </div>
            </div>
            {/*profile level type rank job*/}
            <div className="w-4/12 pl-5">
              {/*profile level*/}
              <div className="w-full h-1/4 flex justify-center items-center">
                {btns.map((btn) => (
                  <InfoRouteBtn text={btn} />
                ))}
              </div>
              {/* profile betchis */}
              <div className="w-full h-3/4 pt-3">
                <div className="w-full h-full bg-divisionGray dark:bg-darkComponent dark:text-mainWhite rounded-2xl">
                  {/*profile type*/}
                  <Group group={userGroups.type} />
                  {/*profile rank*/}
                  <Group group={userGroups.rank} />
                  {/*profile job*/}
                  <Group group={userGroups.job} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*profile body*/}
        <div className="w-full h-[900px]">
          <InfoBox type="github" params={{ gitId: user.github }} />
          <InfoBox />
          <InfoBox />
          <InfoBox />
        </div>
        {/*profile footer*/}
        <footer className="w-full h-[50px]">
          <div className="text-center dark:text-mainWhite">Profile footer</div>
        </footer>
      </div>
    </div>
  );
};

export default Profile;
