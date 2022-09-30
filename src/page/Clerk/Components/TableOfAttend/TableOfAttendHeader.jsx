import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { ArrowSmLeftIcon, ArrowSmRightIcon } from '@heroicons/react/outline';

import clerkAPI from 'API/v1/clerk';

const Header = ({
  member,
  setAppendModalOpen,
  setSearchModalOpen,
  page,
  setPage,
  userSize,
  season,
}) => {
  const [userLength, setUserLength] = useState(0);
  useEffect(() => {
    clerkAPI
      .getAllSeminarAttend({
        token: member.token,
        page: 0,
        size: 40,
        seasonStartDate: season.seasonStart,
        seasonEndDate: season.seasonEnd,
      })
      .then((data) => {
        if (data.success) {
          const max = data.page.content?.reduce((prev, current) => {
            return prev.sortedSeminarAttendances.length >
              current.sortedSeminarAttendances.length
              ? prev
              : current;
          });
          setUserLength(max.sortedSeminarAttendances.length);
        }
      });
  }, [season]);

  const openAppendModal = () => {
    setAppendModalOpen(true);
  };
  const openSearchModal = () => {
    setSearchModalOpen(true);
  };

  const clickLeft = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const clickRight = () => {
    if ((page + 1) * userSize < userLength) {
      setPage(page + 1);
    }
  };

  const btnClassname =
    'bg-violet-100 border-violet-300 border-b-4 rounded-xl hover:bg-violet-200 hover:text-white mt-2 mb-1';

  return (
    <div className="flex justify-between w-[80%] sm:w-[90%] lg:w-[95%]">
      <div className="flex flex-row mb-1">
        <button
          onClick={openAppendModal}
          className={btnClassname + 'w-28 h-10 p-2 mr-2 text-sm sm:text-base'}
        >
          세미나 추가
        </button>
        <button
          onClick={openSearchModal}
          className={btnClassname + 'w-28 h-10 p-2 text-sm sm:text-base'}
        >
          세미나 조회
        </button>
      </div>
      <div className="flex flex-row mb-1">
        <button
          className={
            btnClassname + 'flex-shrink-0 h-10 w-10 mx-2 px-2 pt-2 pb-3'
          }
          onClick={clickLeft}
        >
          <ArrowSmLeftIcon aria-hidden="true" />
        </button>
        <button
          className={
            btnClassname + 'flex-shrink-0 h-10 w-10 mx-2 px-2 pt-2 pb-3'
          }
          onClick={clickRight}
        >
          <ArrowSmRightIcon aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { member: state.member, darkMode: state.darkMode };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
