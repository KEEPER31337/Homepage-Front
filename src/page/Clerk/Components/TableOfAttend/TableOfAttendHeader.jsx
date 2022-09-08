import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { ArrowSmLeftIcon, ArrowSmRightIcon } from '@heroicons/react/outline';

import { seminars, userttt } from './testdata';
import clerkAPI from 'API/v1/clerk';

const Header = ({ member, setIsOpen, page, setPage, userSize }) => {
  const [userLength, setUserLength] = useState(0);
  useEffect(() => {
    clerkAPI
      .getTypeMemberList({
        token: member.token,
        typeId: 2,
      })
      .then((data) => {
        if (data.success) {
          setUserLength(data.list.length);
        }
      });
  }, []);

  const closeModal = () => {
    setIsOpen(true);
  };

  const clickLeft = () => {
    if (page > 0) {
      setPage(page - 1);
    }
    console.log(page);
  };

  const clickRight = () => {
    if ((page + 1) * userSize < userLength) {
      setPage(page + 1);
    }
    console.log(page);
  };

  const btnClassname =
    'bg-violet-100 border-violet-300 border-b-4 rounded-xl hover:bg-violet-200 hover:text-white mt-2 mb-1';

  return (
    <div className="flex justify-between w-[80%] sm:w-[90%] lg:w-[95%]">
      <button onClick={closeModal} className={btnClassname + 'w-28 h-10 p-2'}>
        세미나 추가
      </button>
      <div className="flex flex-row mb-1">
        <button
          className={
            btnClassname + 'flex-shrink-0 h-10 w-10 mx-2 px-2 pt-2 pb-3'
          }
        >
          <ArrowSmLeftIcon aria-hidden="true" onClick={clickLeft} />
        </button>
        <button
          className={
            btnClassname + 'flex-shrink-0 h-10 w-10 mx-2 px-2 pt-2 pb-3'
          }
        >
          <ArrowSmRightIcon aria-hidden="true" onClick={clickRight} />
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
