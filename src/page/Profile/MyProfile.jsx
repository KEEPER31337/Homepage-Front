import React, { useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import memberAPI from 'API/v1/member';

//NOTE 프로필 UI
import './fonts.css';
import FolloweeModal from './Components/Modal/FolloweeModal';
import FollowerModal from './Components/Modal/FollowerModal';
import Group from './Components/Group';

//날짜 포멧
import { formatDate } from './Utils/DateFormater';

const MyProfile = ({ token, memberInfo }) => {
  const navigate = useNavigate();

  const followeeModalState = useState(false);
  const [followeeModal, setFolloweeModal] = followeeModalState;
  const followerModalState = useState(false);
  const [followerModal, setFollowerModal] = followerModalState;

  const [followCnt, setFollowCnt] = useState(null);
  const [myPages, setMyPages] = useState([]);
  const [myPage, setMyPage] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [canGoNext, setCanGoNext] = useState(false);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const size = 10;

  const renderItemComponents = (item) => {
    const itemComponents = [];
    itemComponents.push(
      <td key={'num'} className="text-center">
        {item.num + page * size}
      </td>
    );
    for (const key in item) {
      if (key == 'onClick' || key == 'num') continue;
      itemComponents.push(
        <td key={key} className="text-center">
          {item[key]}
        </td>
      );
    }
    return itemComponents.map((component) => component);
  };

  const updatePage = (updatePage) => {
    myPage?.api({ token, page: updatePage, size }).then((res) => {
      if (res.success) {
        setCanGoPrev(updatePage != 0);
        setCanGoNext(!res.data.isLast);
        setItems(myPage.mapper(res.data.content));
        setPage(updatePage);
      }
    });
  };

  const goNextPage = () => {
    updatePage(page + 1);
  };

  const goPrevPage = () => {
    updatePage(page - 1);
  };

  useEffect(() => {
    setMyPages([
      {
        title: '작성글',
        heads: ['번호', '카테고리', '제목', '날짜', '조회수', '추천수'],
        mapper: (list) => {
          return list?.map((item, index) => ({
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
          }));
        },
        api: memberAPI.getUsersPosts,
      },
      {
        title: '임시저장글',
        heads: ['번호', '카테고리', '제목', '날짜'],
        mapper: (list) => {
          return list?.map((item, index) => ({
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
          }));
        },
        api: memberAPI.getUsersTempPosts,
      },
      {
        title: '포인트내역',
        heads: ['번호', '포인트', '정보', '시간'],
        mapper: (list) => {
          return list?.map((item, index) => ({
            num: index + 1,
            point: item.isSpent ? -item.point : item.point,
            detail: item.detail,
            time: formatDate({ origin: item.time, separator: '.' }),
          }));
        },
        api: memberAPI.getPointList,
      },
    ]);
    memberAPI.getUsersFollowCnt({ token }).then((res) => {
      if (res.success) {
        setFollowCnt(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (myPages.length > 0) setMyPage(myPages[0]);
  }, [myPages]);

  useEffect(() => {
    updatePage(0);
  }, [myPage]);

  return (
    <div className="min-h-screen  dark:bg-mainBlack dark:text-mainWhite ">
      <div className="h-full sm:w-full md:w-full lg:w-10/12 xl:w-8/12 container mx-auto pt-10 p-5 justify-center items-center">
        {/* 1. 커스텀 색상 팔레트 */}
        {/* <div className="grid w-auto  place-items-end ">
          <div className="flex">
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-red-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-orange-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-amber-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-blue-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-green-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-violet-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-zinc-400 " />
          </div>
        </div> */}

        <div className="md:flex p-1 bg-backGray dark:bg-darkPoint  border-2 dark:border-transparent shadow-sm">
          {/* NOTE 프로필 */}
          <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-5/12 m-2 ">
            <div className="p-1 bg-white dark:bg-darkPoint">
              {/* 1.  닉네임 + 회원 뱃지 */}
              <div className="flex justify-between m-1">
                {/*닉네임*/}
                <div className="css-font text-5xl m-1">
                  {memberInfo?.nickName}
                </div>
                {/*회원 뱃지*/}
                <div className="flex">
                  {memberInfo?.rank && (
                    <div className="mr-2">
                      <Group groupName={memberInfo.rank} />
                    </div>
                  )}
                  {memberInfo?.type && (
                    <div className="mr-2">
                      <Group groupName={memberInfo.type} />
                    </div>
                  )}
                  {memberInfo?.jobs &&
                    memberInfo.jobs.map((job, index) => (
                      <div key={index} className="mr-2">
                        <Group groupName={job} />
                      </div>
                    ))}
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
                      src={memberInfo?.thumbnailPath}
                      alt="profile"
                      className="w-full h-full rounded object-center object-cover"
                    />
                  </div>
                </div>

                {/* 2-2(내 프로필). 팔로우 + 포인트 (== 썸네일 옆 프로필 정보) */}
                <div className="w-1/2 flex flex-col justify-between m-1">
                  {/* 2-2-1 팔로우, 팔로워 */}
                  <div className="flex w-full justify-end">
                    <button
                      onClick={() => setFollowerModal(true)}
                      className="p-2 mr-2 flex flex-row hover:bg-backGray dark:hover:bg-mainBlack dark:hover:bg-opacity-50"
                    >
                      <div className="text-gray-500 mr-1">팔로워</div>
                      <div className="font-semibold">
                        {followCnt && followCnt.followerNumber}
                      </div>
                    </button>

                    <button
                      onClick={() => setFolloweeModal(true)}
                      className="p-2 flex flex-row hover:bg-backGray dark:hover:bg-mainBlack dark:hover:bg-opacity-50"
                    >
                      <div className=" text-gray-500 mr-1">팔로우</div>
                      <div className="font-semibold">
                        {followCnt && followCnt.followeeNumber}
                      </div>
                    </button>
                  </div>
                  {/* 2-2-2 포인트 */}
                  <div className="flex w-full justify-between border-3 border-amber-500 bg-amber-300 rounded-md p-1 ">
                    <div className="css-font text-shadow  text-white sm:text-2xl md:text-xl lg:text-2xl text-xl  m-1 ">
                      Point
                    </div>
                    <div className="css-digit-font sm:text-4xl md:text-3xl lg:text-4xl text-3xl text-teal-900 pr-2 text-right">
                      {memberInfo?.point}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3.  프로필(이름, 아이디, 가입일, 생일) + 프로필 수정버튼 */}
              <div className="items-center text-left border-2 shadow p-3 m-1  rounded-md">
                <div className="flex py-1 ">
                  <div className="p-2  w-2/5 text-gray-500">기수</div>
                  <div className="p-2 w-3/5 font-bold">
                    {memberInfo?.generation
                      ? `Keeper ${memberInfo.generation}기`
                      : ''}
                  </div>
                </div>
                <div className="flex py-1 ">
                  <div className="p-2  w-2/5  text-gray-500">이메일</div>
                  <div className="p-2 w-3/5 font-bold">
                    {memberInfo?.emailAddress ? memberInfo.emailAddress : ''}
                  </div>
                </div>
                <div className="flex py-1 ">
                  <div className="p-2  w-2/5 text-gray-500">가입일</div>
                  <div className="p-2 w-3/5 font-bold">
                    {formatDate({
                      origin: memberInfo?.registerDate,
                      separator: '.',
                    })}
                  </div>
                </div>
                <div className="flex py-1 ">
                  <div className="p-2  w-2/5  text-gray-500">생일</div>
                  <div className="p-2 w-3/5 font-bold">
                    {formatDate({
                      origin: memberInfo?.birthday,
                      separator: '/',
                    })}
                  </div>
                </div>
                {/* 3-1 프로필 수정 + 탈퇴버튼 */}
                <div className="py-1 text-right">
                  <button
                    className="mr-2 border hover:bg-backGray p-2 rounded  text-md font-bold dark:border-mainBlack dark:shadow dark:bg-[#090e1a] dark:hover:bg-mainBlack"
                    onClick={() => navigate('edit')}
                  >
                    프로필 수정
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* NOTE 마이페이지 */}
          {/* 1. 마이페이지(작성글) 컴포넌트*/}
          <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-7/12 m-2">
            <div className=" flex rounded p-1 bg-amber-300 border-2 border-amber-400 shadow-[inset_0_2px_0_1px_#ffffff]">
              <div className=" text-md text-mainBlack">
                {myPages?.map((item, index) => (
                  <Fragment key={index}>
                    <button
                      className="hover:bg-amber-500  m-1 p-1 hover:text-mainWhite rounded font-bold"
                      onClick={() => setMyPage(item)}
                    >
                      {item.title}
                    </button>
                    {index != myPages.length - 1 && '|'}
                  </Fragment>
                ))}
              </div>
            </div>
            <div className="mt-2 bg-white dark:bg-darkComponent p-3 shadow-sm rounded-sm ">
              <div className="w-full h-full inline-block rounded overflow-hidden text-center ">
                <table className="w-full border-4 dark:border-[#0c111f] shadow  rounded-md">
                  <thead>
                    <tr className="h-10 bg-gray-100 dark:bg-[#0c111f] dark:border-[#0c111f]  border-b-2">
                      {myPage?.heads?.map((head, index) => (
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

      {/* modal창 */}
      <FollowerModal
        modalState={followerModalState}
        token={token}
        navigate={navigate}
      />
      <FolloweeModal
        modalState={followeeModalState}
        token={token}
        navigate={navigate}
      />
    </div>
  );
};

export default MyProfile;
