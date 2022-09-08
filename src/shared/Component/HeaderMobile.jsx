import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  ViewGridIcon,
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/outline';
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
  const [openTab, setOpenTab] = useState(-1);

  const handleOpen = (index) => {
    if (index === openTab) setOpenTab(-1);
    else setOpenTab(index);
  };
  const jobs = member?.memberInfo?.jobs;
  useEffect(() => {
    if (member.token) {
      setCategories(categoriesAll);
    } else {
      setCategories(categoriesHidden);
    }
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
        <div className="rounded-lg shadow-lg ring-1 ring-mainYellow ring-opacity-5 bg-mainWhite dark:bg-darkPoint divide-y-2 divide-gray-50 z-40">
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
                  <Fragment key={index}>
                    <button
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      onClick={() => handleOpen(index)}
                    >
                      <ViewGridIcon
                        className="flex-shrink-0 h-6 w-6 text-mainYellow"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base font-semibold text-mainYellow">
                        {item.name}
                      </span>
                      {openTab === index ? (
                        <ChevronUpIcon
                          className={`text-opacity-70 ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                          aria-hidden="true"
                        />
                      ) : (
                        <ChevronDownIcon
                          className={`text-opacity-70 ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                    <Transition
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      // leave="transition ease-in duration-150"
                      // leaveFrom="opacity-100 translate-y-0"
                      // leaveTo="opacity-0 translate-y-1"
                      show={openTab === index}
                    >
                      {item.subs.map((subItem, subIndex) =>
                        !subItem.auth ||
                        jobs?.some((i) => subItem.auth.includes(i)) ? (
                          subItem.external ? (
                            <a
                              key={subIndex}
                              href={subItem.href}
                              className="-m-3 py-3 px-8 flex items-center rounded-md hover:bg-gray-50"
                            >
                              <Popover.Button className="w-full text-left">
                                <span className="ml-3 text-base font-semibold text-mainYellow">
                                  {subItem.name}
                                </span>
                              </Popover.Button>
                            </a>
                          ) : (
                            <Link
                              key={subIndex}
                              to={subItem.href}
                              className="-m-3 py-3 px-8 flex items-center rounded-md hover:bg-gray-50"
                            >
                              <Popover.Button className="w-full text-left">
                                <span className="ml-3 text-base font-semibold text-mainYellow">
                                  {subItem.name}
                                </span>
                              </Popover.Button>
                            </Link>
                          )
                        ) : (
                          <Fragment key={index}></Fragment>
                        )
                      )}
                    </Transition>
                  </Fragment>
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
