import { Link } from 'react-router-dom';

const navigatoinSub = {
  title: '포인트',
  menuList: [
    { name: '랭킹', href: '/ranking' },
    { name: '출석부', href: '/attandance' },
    { name: '게임', href: '/game' },
  ],
};

// TODO: 범용적으로 만들기

const NavigationLayout = (props) => {
  return (
    <>
      <div className="relative min-h-screen flex flex-col bg-gray-50 dark:bg-mainBlack dark:text-mainYellow">
        {/* 3 column wrapper */}
        <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
          {/* Left sidebar & main wrapper */}
          <div className="flex-1 min-w-0 xl:flex">
            <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 dark:border-darkPoint">
              <div className="h-full pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                {/* Start left column area */}
                <div className="relative h-full" style={{ minHeight: '12rem' }}>
                  <div className="relative h-full inset-0 p-5 border-2 border-gray-200 rounded-lg dark:border-darkPoint">
                    <h1 className="text-3xl text-center pb-5 font-bold">
                      {navigatoinSub.title}
                    </h1>
                    <div className="text-2xl">
                      {navigatoinSub.menuList.map((menu, index) => (
                        <Link to={menu.href} key={index}>
                          <div className="p-1 cursor-pointer hover:underline">
                            {menu.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                {/* End left column area */}
              </div>
            </div>

            <div className="lg:min-w-0 lg:flex-1">
              <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
                {/* Start main area*/}
                <div className="relative h-full">
                  <div className="relative inset-0"></div>
                  {props.children}
                </div>
                {/* End main area */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationLayout;
