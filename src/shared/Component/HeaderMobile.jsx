import React, { Fragment, useState, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ViewGridIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// local
import Logo from 'assets/img/keeper_logo.png';
import { categoriesAll, categoriesHidden } from '../category';
import SignInBoxMobile from './SignInBoxMobile';
import UserBoxMobile from './UserBoxMobile';

const HeaderMobile = ({ member }) => {
  // TODO : 링크 클릭 후 탭 닫기
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (member.token) setCategories(categoriesAll);
    else setCategories(categoriesHidden);
  }, [member]);

  return (
    <Transition
      as={Fragment}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
      >
        <div className="rounded-lg shadow-lg ring-1 ring-mainYellow ring-opacity-5 bg-mainWhite dark:bg-darkPoint divide-y-2 divide-gray-50">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <div>
                <img className="h-8 w-auto" src={Logo} alt="Workflow" />
              </div>
              <div className="-mr-2">
                <Popover.Button className="bg-mainYellow rounded-md p-2 inline-flex items-center justify-center text-mainWHite hover:text-mainYellow hover:bg-pointYellow focus:outline-none focus:ring-2 focus:ring-inset focus:ring-divisionGray">
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                {categories.map((item, index) => (
                  <Link
                    key={index}
                    to={item.subs[0].href}
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                  >
                    <ViewGridIcon
                      className="flex-shrink-0 h-6 w-6 text-mainYellow"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-base font-semibold text-mainYellow">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="py-6 px-5 space-y-6">
            <div className="grid grid-cols-2 gap-y-4 gap-x-8"></div>
            {member.token.length > 0 ? <UserBoxMobile /> : <SignInBoxMobile />}
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  );
};

const mapStateToProps = (state) => {
  return { member: state.member };
};
export default connect(mapStateToProps)(HeaderMobile);
