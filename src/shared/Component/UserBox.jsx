import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// API
import actionMember from 'redux/action/member';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const UserBox = ({ member, signOut }) => {
  return (
    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className="bg-gray-100 dark:bg-gray-800 flex text-sm rounded-full focus:outline-none ring-2 ring-divisionGray dark:ring-darkPoint">
            <span className="sr-only">Open user menu</span>
            <div className="text-lg self-center mx-5 text-mainBlack dark:text-mainWhite w-10 break-words">
              {member?.memberInfo?.nickName}
            </div>
            <img
              className="h-8 w-8 rounded-full"
              // user Image
              src="https://avatars.githubusercontent.com/u/23546441?s=400&u=db7abf2929e5518c12189034dc3fed9bda94f0a6&v=4"
              alt=""
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
                  // TODO : 링크 수정
                  to="/profile/1"
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
                  // TODO : 링크 수정
                  to="/profile/1/edit"
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
