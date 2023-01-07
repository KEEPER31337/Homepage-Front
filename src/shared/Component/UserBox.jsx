import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// local
import imgMemberCircle from 'assets/img/memberCircle.svg';
import actionMember from 'redux/action/member';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const handleErrorImg = (e) => {
  e.target.src = imgMemberCircle;
};

const UserBox = ({ member, signOut }) => {
  return (
    <div className="hidden md:flex items-center justify-end xl:w-40">
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className="bg-gray-100 dark:bg-gray-800 flex text-sm rounded-full focus:outline-none ring-2 ring-divisionGray dark:ring-darkPoint">
            <span className="sr-only">Open user menu</span>
            <div className="text-lg max-w-[150px] self-center mx-5 text-mainBlack dark:text-mainWhite w-full break-words overflow-hidden whitespace-nowrap hidden xl:block">
              {member?.memberInfo?.nickName}
            </div>
            <img
              className="h-8 w-8 rounded-full"
              // user Image
              src={member?.memberInfo?.thumbnailPath}
              alt=""
              onError={handleErrorImg}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/profile/${member.memberInfo.id}`}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  프로필
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/profile/${member.memberInfo.id}/edit`}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  프로필 수정
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/"
                  onClick={() => {
                    signOut();
                  }}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  로그아웃
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { member: state.member };
};
const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    signOut: () => {
      dispatch(actionMember.signOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBox);
