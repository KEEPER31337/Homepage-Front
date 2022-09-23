import { Fragment, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { connect } from 'react-redux';
import { HomeIcon, ChevronRightIcon, XIcon } from '@heroicons/react/outline';

const categoriesAll = [
  { name: '직책 관리', href: '/itmanager', icon: HomeIcon, auth: null },
];

const ItManagerHeader = ({ darkMode, member }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState(categoriesAll);
  const navigate = useNavigate();
  const jobs = member?.memberInfo?.jobs;

  const cancelButtonRef = useRef();

  return (
    <>
      {/* 모바일 슬라이드 열었을때!! */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          initialFocus={cancelButtonRef}
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel
                className={
                  darkMode
                    ? 'relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-black'
                    : 'relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-mainWhite'
                }
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0  p-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 p-1 rounded  bg-slate-200"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <XIcon
                        className="h-6 w-6 text-mainWhite "
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>

                <div className="mt-8 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {categories.map((item) =>
                      !item.auth || jobs?.some((i) => item.auth.includes(i)) ? (
                        <Link to={item.href} key={item.name}>
                          <div className="group flex items-center my-3 px-3 py-3 text-slate-800 font-bold rounded-md hover:text-mainWhite hover:bg-slate-300">
                            <item.icon
                              className="mr-4 flex-shrink-0 h-6 w-6 "
                              aria-hidden="true"
                            />
                            {item.name}
                          </div>
                        </Link>
                      ) : (
                        <Fragment key={item.name}></Fragment>
                      )
                    )}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* 화면 꽉 찼을때, 기본 슬라이드바 부모의 1/5 */}
      <div className="hidden lg:flex lg:w-1/5 lg:flex-col lg:inset-y-0 ">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-grow pt-2  overflow-y-auto">
          <div className=" flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {categories.map((item) =>
                !item.auth || jobs?.some((i) => item.auth.includes(i)) ? (
                  <Link to={item.href} key={item.name}>
                    <div className="group flex items-center my-3 px-3 py-3 text-slate-800 dark:text-slate-500 font-bold rounded-md hover:text-mainWhite hover:bg-slate-300">
                      <item.icon
                        className="mr-4 flex-shrink-0 h-6 w-6 "
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                  </Link>
                ) : (
                  <Fragment key={item.name}></Fragment>
                )
              )}
            </nav>
          </div>
        </div>
      </div>
      {/* 모바일에서, slidebar 버튼! */}
      <div className="fixed flex z-10 ">
        <button
          ref={cancelButtonRef}
          type="button"
          className="p-1 rounded-r-lg border-gray-200 text-gray-500 bg-slate-200 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <ChevronRightIcon
            className="text-mainWhite h-8 w-8"
            aria-hidden="true"
          />
        </button>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    darkMode: state.darkMode,
    member: state.member,
  };
};
export default connect(mapStateToProps)(ItManagerHeader);
