import React, { useEffect, useState, Fragment } from 'react';
import memberAPI from 'API/v1/member';
import GiftPointModal from './Components/Modal/GiftPointModal';

//NOTE 프로필 UI
import './fonts.css';
import Group from './Components/Group';
import { useNavigate } from 'react-router-dom';

//날짜 포멧
import { formatDate } from './Utils/DateFormater';

const heads = ['번호', '카테고리', '제목', '날짜', '조회수', '추천수'];

const OtherProfile = ({ token, memberInfo, userId }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isFollowee, setIsFollowee] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);
  const [isUnFollowing, setIsUnFollowing] = useState(false);

  const giftPointModalState = useState(false);
  const [giftPointModal, setGiftPointModal] = giftPointModalState;

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [canGoNext, setCanGoNext] = useState(false);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const size = 10;

  const follow = () => {
    if (isFollowing) return;
    else {
      setIsFollowing(true);
      memberAPI.follow({ token, id: user.memberId }).then((result) => {
        if (result.success) {
          getUser();
        } else {
        }
        setIsFollowing(false);
      });
    }
  };

  const unFollow = () => {
    if (isUnFollowing) return;
    else {
      setIsUnFollowing(true);
      memberAPI.unfollow({ token, id: user.memberId }).then((result) => {
        if (result.success) {
          getUser();
        } else {
        }
        setIsUnFollowing(false);
      });
    }
  };

  const getUser = () => {
    memberAPI.getOtherById({ token, id: userId }).then((getOtherResult) => {
      if (getOtherResult.success) {
        const other = getOtherResult.data;
        other.rank = other.memberRank;
        other.type = other.memberType;
        other.jobs = other.memberJobs;
        other.thumbnailId = other.thumbnailEntity;
        setUser(other);
        console.log(other);
        setIsFollowee(other.checkFollowee);
      } else {
        setUser(null);
      }
    });
  };

  const updatePosts = (updatePage) => {
    memberAPI
      .getOthersPosts({ token, memberId: userId, page: updatePage, size })
      .then((res) => {
        if (res.success) {
          setCanGoPrev(updatePage != 0);
          setCanGoNext(!res.data.isLast);
          setItems(
            res?.data?.content?.map((item, index) => ({
              num: index + 1,
              onClick: () => {
                navigate(`/post/${item.category.replace(' ', '')}/${item.id}`);
              },
              category: item.category.replace(' ', ''),
              title: item.title,
              createdAt: formatDate({
                origin: item.registerTime,
                separator: '.',
              }),
              visitCount: item.visitCount,
              likeCount: item.likeCount,
            }))
          );
          setPage(updatePage);
        }
      });
  };

  const goNextPage = () => {
    updatePosts(page + 1);
  };

  const goPrevPage = () => {
    updatePosts(page - 1);
  };

  const renderItemComponents = (item) => {
    const itemComponents = [];
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
      updatePosts(0);
    }
  }, [token]);
  if (!user) {
    return <Fragment />;
  } else {
    return (
      <div className="min-h-screen  dark:bg-mainBlack dark:text-mainWhite ">
        <div className="h-full sm:w-full md:w-full lg:w-10/12 xl:w-8/12 container mx-auto pt-10 p-5 justify-center items-center">
          <div className="md:flex p-1 bg-backGray dark:bg-darkPoint  border-2 dark:border-transparent shadow-sm">
            {/* NOTE 프로필 */}
            <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-5/12 m-2 ">
              <div className="p-1 bg-white dark:bg-darkPoint">
                {/* 1.  닉네임 + 회원 뱃지 */}
                <div className="flex justify-between m-1">
                  {/*닉네임*/}
                  <div className="css-font text-5xl m-1">{user?.nickName}</div>
                  {/*회원 뱃지*/}
                  <div className="flex">
                    {user?.rank && <Group groupName={user.rank} />}
                    {user?.type && <Group groupName={user.type} />}
                    {user?.jobs &&
                      user.jobs.map((job) => <Group groupName={job} />)}
                  </div>
                </div>
                {/*구분선*/}
                <div className="p-[2px] mb-2 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300  "></div>
                {/* 2.  프로필 이미지 + 팔로우 + 포인트 */}
                <div className="flex ">
                  {/* 2-1. 프로필 이미지 */}
                  <div className="w-1/2 m-1">
                    <div className="p-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 rounded">
                      <img
                        src={user?.thumbnailPath}
                        alt="profile"
                        className="w-full h-full rounded object-center object-cover"
                      />
                    </div>
                  </div>

                  {/* 2-3(다른 회원 프로필). 팔로우 + 포인트선물 (== 썸네일 옆 프로필 정보) */}
                  <div className="w-1/2 flex flex-col justify-between m-1">
                    <div className="w-full flex flex-col text-center ">
                      <span
                        className="p-2 mb-2 bg-amber-300 dark:bg-amber-400 dark:hover:bg-amber-500 hover:bg-amber-500 border-2 border-amber-300 rounded text-white font-bold dark:text-mainBlack"
                        onClick={isFollowee ? unFollow : follow}
                      >
                        {isFollowee ? '언팔로우' : '팔로우'}
                      </span>
                      <span
                        className="p-2 hover:bg-gray-100 border-2 rounded font-bold dark:bg-[#0c111f] dark:hover:bg-mainBlack"
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
                    <div className="p-2 w-3/5 font-bold">{`Keeper ${user?.generation}기`}</div>
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
              <div className=" flex rounded p-1 bg-amber-300 border-2 border-amber-400 shadow-[inset_0_2px_0_1px_#ffffff]">
                <div className=" text-md text-mainBlack">
                  <div className="hover:bg-amber-500  m-1 p-1 hover:text-mainWhite rounded font-bold">
                    작성글
                  </div>
                </div>
              </div>
              <div className="mt-2 bg-white dark:bg-darkComponent p-3 shadow-sm rounded-sm ">
                <div className="w-full h-full inline-block rounded overflow-hidden text-center ">
                  <table className="w-full border-4 dark:border-[#0c111f] shadow  rounded-md">
                    <thead>
                      <tr className="h-10 bg-gray-100 dark:bg-[#0c111f] dark:border-[#0c111f]  border-b-2">
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
                <div className="flex">
                  {canGoPrev ? (
                    <button
                      onClick={goPrevPage}
                      className="self-start w-1/5 text-sm font-semibold rounded-lg hover:bg-gray-100 hover:shadow-xs p-3 my-1 dark:bg-[#0c111f] dark:hover:bg-mainBlack"
                    >
                      이전으로
                    </button>
                  ) : (
                    <div className="w-1/5" />
                  )}
                  <div className="mx-auto w-3/5 self-center text-sm text-center font-semibold rounded-lg p-3 my-1 dark:bg-[#0c111f]">
                    {page + 1}
                  </div>
                  {canGoNext ? (
                    <button
                      onClick={goNextPage}
                      className="self-end w-1/5 text-sm font-semibold rounded-lg hover:bg-gray-100 hover:shadow-xs p-3 my-1 dark:bg-[#0c111f] dark:hover:bg-mainBlack"
                    >
                      다음으로
                    </button>
                  ) : (
                    <div className="w-1/5" />
                  )}
                </div>
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
