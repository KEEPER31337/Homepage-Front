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

const Profile = () => {
  const user = dummyUser;

  const [gitMd, setGitMd] = useState(null);

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
    <div>
      {/*profile head*/}
      <div className="mt-20 mx-auto h-full w-[800px] bg-backGray rounded-3xl shadow-2xl">
        {/*profile head*/}
        <div className="w-full h-1/4">
          <div className="px-10 pt-10 pb-7 w-full h-full flex float-left">
            {/*profile image*/}
            <div className="px-2 w-3/12 object-cover">
              <img className="w-full h-full rounded-2xl" src={user.img} />
            </div>
            {/*profile head info*/}
            <div className="pt-3 w-5/12 h-full">
              <div className="text-left text-4xl w-2/3 h-1/5">{user.name}</div>
              <div className="text-left text-lg w-2/3 h-1/5">
                {user.nickName + ' ' + user.loginId}
              </div>
              <div className="pt-6 pr-2 w-full h-3/5">
                <InfoRouteBtn img={Home} />
                <InfoRouteBtn />
                <InfoRouteBtn />
              </div>
            </div>
            {/*profile level type rank job*/}
            <div className="w-4/12 pl-5">
              {/*profile level*/}
              <div className="w-full h-1/4">
                <div className="pl-2 pt-3 text-center float-left text-3xl">
                  Level
                </div>
                <div className="pl-5 w-1/2 h-full float-left flex">
                  <CircularGauge
                    inRad={20}
                    outRad={24}
                    parcent={user.point / LevelUp}
                    text={user.level}
                  />
                </div>
              </div>
              {/* profile betchis */}
              <div className="w-full h-3/4 pt-3">
                <div className="w-full h-full bg-divisionGray rounded-2xl">
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
        <div className="w-full h-3/4">
          <InfoBox type="github" params={{ gitId: user.github }} />
          <InfoBox />
          <InfoBox />
          <InfoBox />
        </div>
      </div>
      {/*profile footer*/}
      <footer className="w-full h-1/6">
        <div className="text-center">Profile footer</div>
      </footer>
    </div>
  );
};

export default Profile;
