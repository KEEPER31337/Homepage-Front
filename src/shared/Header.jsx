import React, { useState, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, ViewGridIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// API
import memberAPI from 'API/v1/member';

// local
import HeaderMobile from './Component/HeaderMobile';
import HeaderPopDown from './Component/HeaderPopDown';
import SignInBox from './Component/SignInBox';
import Logo from 'assets/img/keeper_logo.png';
import DarkModeSwitch from 'shared/DarkModeSwitch';
import { categoriesAll, categoriesHidden } from './category';
import UserBox from './Component/UserBox';

const Header = ({ member }) => {
  const [categories, setCategories] = useState([]);
  const jobs = member?.memberInfo?.jobs;
  useEffect(() => {
    if (member.token) {
      setCategories(categoriesAll);
    } else {
      setCategories(categoriesHidden);
    }
  }, [member]);

  return (
    <>
      <Popover className="relative bg-mainWhite dark:bg-mainBlack z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 dark:border-darkComponent py-6">
            <div className="flex justify-start">
              <Link to="/">
                <span className="sr-only">Workflow</span>
                <img className="h-8 w-auto xl:h-10" src={Logo} alt="" />
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-mainYellow rounded-md p-2 inline-flex items-center justify-center text-mainWhite hover:text-mainYellow hover:bg-pointYellow focus:outline-none focus:ring-2 focus:ring-inset focus:ring-divisionGray">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group
              as="nav"
              className="hidden md:flex space-x-3 lg:space-x-5"
            >
              {categories.map((category, index) => (
                <HeaderPopDown key={index} category={category} />
              ))}
            </Popover.Group>
            {member.token.length > 0 ? <UserBox /> : <SignInBox />}
            {/* <SignInBox /> */}
          </div>
        </div>
        <HeaderMobile />
      </Popover>
      <div className="absolute right-1 z-20">
        <DarkModeSwitch />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { member: state.member };
};
export default connect(mapStateToProps)(Header);
