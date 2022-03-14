import React, { useEffect, useState, Fragment } from 'react';
import memberAPI from 'API/v1/member';
import GiftPointModal from './Components/Modal/GiftPointModal';

//NOTE 프로필 UI
import './fonts.css';
import Group from './Components/Group';
import { useNavigate } from 'react-router-dom';

const googy =
  'https://avatars.githubusercontent.com/u/81643702?s=400&u=d3a721a495754454d238b4159bb7a2d150338424&v=4';

const add0 = (num, maxDigits) => {
  let digits = 10;
  let result = num.toString();
  for (let i = 1; i < maxDigits; i++) {
    if (parseInt(num / digits) == 0) result = '0' + result;
    digits *= 10;
  }
  return result;
};

const stringfyDate = (dateClass) => {
  return {
    year: add0(dateClass.getFullYear(), 4),
    month: add0(dateClass.getMonth() + 1, 2),
    date: add0(dateClass.getDate(), 2),
  };
};

const formatDate = ({ origin, separator }) => {
  if (!origin) return;
  const { year, month, date } = stringfyDate(new Date(origin));
  return [year, month, date].join(separator);
};

const heads = ['번호', '카테고리', '제목', '날짜', '조회수', '추천수'];
const mapper = (list) => {
  return list?.map((item, index) => ({
    num: index + 1,
    category: item.category,
    title: item.title,
    createdAt: formatDate({ origin: item.registerTime, separator: '.' }),
    visitCount: item.visitCount,
    likeCount: item.likeCount,
  }));
};

const OtherProfile = ({ token, memberInfo, userId }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isFollowee, setIsFollowee] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);
  const [isUnFollowing, setIsUnFollowing] = useState(false);

  const giftPointModalState = useState(false);
  const [giftPointModal, setGiftPointModal] = giftPointModalState;

  const [items, setItems] = useState(new Array());
  const [page, setPage] = useState(0);
  const size = 10;

  const follow = () => {
    if (isFollowing) return;
    else {
      setIsFollowing(true);
      memberAPI.follow({ token, loginId: user.loginId }).then((result) => {
        if (result.success) {
          getUser();
          console.log('success', result);
        } else console.log('fail', result);
        setIsFollowing(false);
      });
    }
  };

  const unFollow = () => {
    if (isUnFollowing) return;
    else {
      setIsUnFollowing(true);
      console.log(token, user.loginId);
      memberAPI.unfollow({ token, loginId: user.loginId }).then((result) => {
        if (result.success) {
          getUser();
          console.log('success', result);
        } else console.log('fail', result);
        setIsUnFollowing(false);
      });
    }
  };

  const getUser = () => {
    memberAPI.getOtherById({ token, id: userId }).then((getOtherResult) => {
      if (getOtherResult.success) {
        const other = getOtherResult.data;
        console.log(other);
        other.rank = other.memberRank;
        other.type = other.memberType;
        other.jobs = [];
        other.thumbnailId = other.thumbnailEntity;
        setUser(other);
        setIsFollowee(other.checkFollowee);
      } else {
        setUser(null);
        console.log(`${getOtherResult.code}:${getOtherResult.msg}`);
      }
    });
  };

  const getPosts = () => {
    memberAPI.getOthersPosts({ token, memberId: userId }).then((res) => {
      if (res.success) {
        console.log(res);
        setItems(
          res.list?.map((item, index) => ({
            num: index + 1,
            onClick: () => {
              navigate(`/board/${item.id}`);
            },
            category: item.category,
            title: item.title,
            createdAt: formatDate({
              origin: item.registerTime,
              separator: '.',
            }),
            visitCount: item.visitCount,
            likeCount: item.likeCount,
          }))
        );
      }
    });
  };

  const renderItemComponents = (item) => {
    const itemComponents = new Array();
    for (const key in item) {
      if (key == 'onClick') continue;
      itemComponents.push(
        <td className="text-center" key={key}>
          {item[key]}
        </td>
      );
    }
    return itemComponents.map((component) => component);
  };

  useEffect(() => {
    if (token) {
      getUser();
      getPosts();
    }
  }, [token]);
  if (!user) {
    return <Fragment />;
  } else {
    return (
      <div className="">
        <div className="sm:w-full md:w-full lg:w-10/12 xl:w-8/12 container mx-auto m-4 p-5 justify-center items-center">
          <div className="md:flex p-1 bg-backGray border-2 shadow-sm">
            {/* NOTE 프로필 */}
            <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-5/12 m-2 ">
              <div className="p-1 bg-white">
                {/* 1.  닉네임 + 회원 뱃지 */}
                <div className="flex justify-between m-1">
                  {/*닉네임*/}
                  <div className="css-font text-5xl m-1">{user.nickName}</div>
                  {/*회원 뱃지*/}
                  <div className="flex">
                    {user.rank && (
                      <div className="mr-2">
                        <Group groupName={user.rank} />
                      </div>
                    )}
                    {user.type && (
                      <div className="mr-2">
                        <Group groupName={user.type} />
                      </div>
                    )}
                    {user.jobs &&
                      user.jobs.map((job, index) => (
                        <div className="mr-2" key={index}>
                          <Group groupName={job} />
                        </div>
                      ))}
                  </div>
                </div>
                {/*구분선*/}
                <div className="p-[2px] mb-2 bg-gradient-to-r from-blue-300 via-blue-200 to-yellow-300  "></div>
                {/* 2.  프로필 이미지 + 팔로우 + 포인트 */}
                <div className="flex ">
                  {/* 2-1. 프로필 이미지 */}
                  <div className="w-1/2 m-1">
                    <div className="p-1 bg-gradient-to-r from-blue-300 via-blue-200 to-yellow-300 rounded">
                      <img
                        src={googy}
                        alt="profile"
                        className="w-full h-full rounded object-center object-cover"
                      />
                    </div>
                  </div>

                  {/* 2-3(다른 회원 프로필). 팔로우 + 포인트선물 (== 썸네일 옆 프로필 정보) */}
                  <div className="w-1/2 flex flex-col justify-between m-1">
                    <div className="w-full flex flex-col text-center ">
                      <span
                        className="p-2 mb-2 bg-blue-300 hover:bg-blue-500 border-2 border-blue-300 rounded text-white font-bold"
                        onClick={isFollowee ? unFollow : follow}
                      >
                        {isFollowee ? '언팔로우' : '팔로우'}
                      </span>
                      <span
                        className="p-2 hover:bg-gray-100 border-2 rounded font-bold"
                        onClick={() => {
                          if (!giftPointModal) setGiftPointModal(true);
                        }}
                      >
                        포인트 선물
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3.  프로필(이름, 아이디, 가입일, 생일) + 프로필 수정버튼 */}
                <div className="items-center text-left border-2 shadow p-3 m-1  rounded-md">
                  <div className="flex py-1 ">
                    <div className="p-2  w-2/5 text-gray-500">기수</div>
                    <div className="p-2 w-3/5 font-bold">{`Keeper ${memberInfo?.generation}기`}</div>
                  </div>
                  <div className="flex py-1 ">
                    <div className="p-2  w-2/5  text-gray-500">이메일</div>
                    <div className="p-2 w-3/5 font-bold">
                      {user?.emailAddress}
                    </div>
                  </div>
                  <div className="flex py-1 ">
                    <div className="p-2  w-2/5 text-gray-500">가입일</div>
                    <div className="p-2 w-3/5 font-bold">
                      {formatDate({
                        origin: user?.registerDate,
                        separator: '.',
                      })}
                    </div>
                  </div>
                  <div className="flex py-1 ">
                    <div className="p-2  w-2/5  text-gray-500">생일</div>
                    <div className="p-2 w-3/5 font-bold">
                      {formatDate({ origin: user?.birthday, separator: '/' })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* NOTE 마이페이지 */}
            {/* 1. 마이페이지(작성글) 컴포넌트*/}
            <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-7/12 m-2">
              <div className=" flex rounded p-1 bg-blue-300 border-2 border-blue-400 shadow-[inset_0_2px_0_1px_#ffffff]">
                <div className=" text-md ">
                  <div className="m-1 p-1 rounded font-bold">작성글</div>
                </div>
              </div>
              <div className="mt-2 bg-white p-3 shadow-sm rounded-sm ">
                <div className="w-full h-full inline-block rounded overflow-hidden text-center border">
                  <table className="w-full border-2 shadow  rounded-md">
                    <thead>
                      <tr className="h-10 bg-gray-100  border-b-2">
                        {heads?.map((head, index) => (
                          <th key={index}>{head}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr
                          key={index}
                          onClick={item.onClick}
                          className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]"
                        >
                          {renderItemComponents(item)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button className="w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 hover:shadow-xs p-3 my-1">
                  다음으로
                </button>
              </div>
            </div>
          </div>
        </div>
        <GiftPointModal
          modalState={giftPointModalState}
          token={token}
          userId={userId}
          memberInfo={memberInfo}
        />
      </div>
    );
  }
};

export default OtherProfile;
