import { connect } from 'react-redux';
import { motion } from 'framer-motion';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from '@heroicons/react/outline';
import NavigationLayout from './Components/NavigationLayout';

const ScoreBoard = ({ member, memberSignIn }) => {
  return (
    <div className="bg-mainWhite dark:bg-mainBlack min-h-screen">
      {/* 기존 홈페이지 헤더에 맞추기 위해,  */}
      <div className="max-w-7xl mx-auto flex flex-row">
        {/*사이드바*/}
        <NavigationLayout />
        <div className="md:w-4/5 flex flex-col flex-1 p-3">
          {/* 이제 여기서 추가할 컴포넌트 가져오면 됨!!! */}

          {/* <ScoreBoard/> */}
          <div className=" w-full container mx-auto justify-center items-center">
            {/* NOTE 프로필 */}

            <div className="p-1 bg-white ">
              {/* 1.  닉네임 + 회원 뱃지 */}
              <div className="flex flex-row justify-between m-1">
                {/*제목*/}
                <div className="font-extrabold text-4xl m-1">SCOREBOARD</div>
                {/*네비게이션*/}
                <div className="flex items-center">
                  <ChevronLeftIcon className="inline-block  dark:hover:bg-indigo-400 mr-1 rounded h-10 w-10 text-white bg-amber-400 dark:bg-indigo-300" />

                  <ChevronRightIcon className="inline-block dark:hover:bg-indigo-400 rounded h-10 w-10 text-white bg-amber-400 dark:bg-indigo-300" />
                </div>
              </div>
              {/*구분선*/}
              <div className="p-[2px] mb-2 dark:from-purple-500 dark:via-purple-200 dark:to-amner-200 bg-gradient-to-r from-amber-500 via-amber-200 to-yellow-300  "></div>
              {/* 2.  프로필 이미지 + 팔로우 + 포인트 */}
              <div className="flex md:flex-row flex-col justify-between w-full max-h-screen text-center ">
                {/* 그 모시다냐.. 랭킹 */}

                <div className="w-full lg:w-2/5 flex flex-col  border-4 border-amber-300 dark:border-purple-300 dark:bg-darkPoint mr-2 content-end items-end justify-end justify-items-center">
                  {/* 그래프 애니메이션 */}
                  <div className="bg-amber-500 dark:bg-purple-200 flex h-full w-full"></div>

                  <div className="flex flex-row w-full px-4  dark:bg-darkPoint content-end items-end justify-center justify-items-center">
                    {/* 3등  */}
                    {/* 1등 */}
                    <div className="flex w-3/12 flex-col place-content-center items-center">
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: () => ({
                            opacity: 1,
                            transition: {
                              delay: 0.5,
                              duration: 0.5,
                            },
                          }),
                          hidden: { opacity: 0 },
                        }}
                      >
                        <div className="dark:text-white mb-2">냥냥</div>
                      </motion.div>
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: () => ({
                            opacity: 1,

                            transition: {
                              duration: 1,
                            },
                          }),
                          hidden: { opacity: 0 },
                        }}
                        className="bg-amber-500 dark:bg-purple-200 w-full h-2"
                      >
                        <div className="bg-amber-100 dark:bg-purple-100 w-full h-1/2"></div>
                      </motion.div>
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: () => ({
                            height: 50,
                            opacity: 1,

                            transition: {
                              duration: 1,

                              ease: 'backInOut',
                            },
                          }),
                          hidden: { opacity: 0, height: 0 },
                        }}
                        className="dark:bg-darkPoint w-full flex"
                      >
                        {' '}
                        <div className="bg-amber-400 dark:bg-purple-100 flex w-1/12"></div>
                        <div className="bg-amber-200 dark:bg-purple-200 flex w-1/12"></div>
                        <div className="bg-amber-300 dark:bg-purple-300 flex w-2/12"></div>
                        <div className="bg-amber-300 dark:bg-purple-300 flex w-2/12"></div>
                        <div className="bg-amber-300 dark:bg-purple-300 flex w-4/12"></div>
                        <div className="bg-amber-400 dark:bg-purple-300 flex w-2/12"></div>
                        <div className="bg-amber-500 dark:bg-purple-400 flex w-2/12"></div>
                      </motion.div>
                    </div>
                    <div className="flex w-3/12 flex-col place-content-center items-center">
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: () => ({
                            opacity: 1,
                            transition: {
                              delay: 0.5,
                              duration: 0.5,
                            },
                          }),
                          hidden: { opacity: 0 },
                        }}
                      >
                        <div className="dark:text-white mb-2">내가 1등이다</div>
                      </motion.div>
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: () => ({
                            opacity: 1,

                            transition: {
                              duration: 1,
                            },
                          }),
                          hidden: { opacity: 0 },
                        }}
                        className="bg-amber-500 dark:bg-purple-200 w-full h-2"
                      ></motion.div>

                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: () => ({
                            height: 110,
                            opacity: 1,

                            transition: {
                              duration: 1,

                              ease: 'backInOut',
                            },
                          }),
                          hidden: { opacity: 0, height: 0 },
                        }}
                        className="dark:bg-darkPoint w-full flex"
                      >
                        {' '}
                        <div className="bg-amber-400 dark:bg-purple-400 flex w-1/12"></div>
                        <div className="bg-amber-200 dark:bg-purple-200 flex w-1/12"></div>
                        <div className="bg-amber-300 dark:bg-purple-300 flex w-2/12"></div>
                        <div className="bg-amber-400 dark:bg-purple-300 flex w-2/12"></div>
                        <div className="bg-amber-300 dark:bg-purple-300 flex w-4/12"></div>
                        <div className="bg-amber-400 dark:bg-purple-400 flex w-2/12"></div>
                        <div className="bg-amber-500 dark:bg-purple-500 flex w-2/12"></div>
                      </motion.div>
                    </div>
                    <div className="flex w-3/12 flex-col place-content-center items-center">
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: () => ({
                            opacity: 1,
                            transition: {
                              delay: 0.5,
                              duration: 0.5,
                            },
                          }),
                          hidden: { opacity: 0 },
                        }}
                      >
                        <div className="dark:text-white mb-2">냥냥</div>
                      </motion.div>
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: () => ({
                            opacity: 1,

                            transition: {
                              duration: 1,
                            },
                          }),
                          hidden: { opacity: 0 },
                        }}
                        className="bg-amber-500 dark:bg-purple-200 w-full h-2"
                      ></motion.div>

                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: () => ({
                            height: 70,
                            opacity: 1,

                            transition: {
                              duration: 1,

                              ease: 'backInOut',
                            },
                          }),
                          hidden: { opacity: 0, height: 0 },
                        }}
                        className="dark:bg-darkPoint w-full flex"
                      >
                        {' '}
                        <div className="bg-amber-400 dark:bg-purple-400 flex w-1/12"></div>
                        <div className="bg-amber-200 dark:bg-purple-200 flex w-1/12"></div>
                        <div className="bg-amber-300 dark:bg-purple-300 flex w-2/12"></div>
                        <div className="bg-amber-300 dark:bg-purple-300 flex w-2/12"></div>
                        <div className="bg-amber-300 dark:bg-purple-300 flex w-4/12"></div>
                        <div className="bg-amber-400 dark:bg-purple-400 flex w-2/12"></div>
                        <div className="bg-amber-500 dark:bg-purple-500 flex w-2/12"></div>
                      </motion.div>
                    </div>
                    {/* 2등 */}
                  </div>
                </div>

                <table className="w-full lg:w-3/5 dark:text-white dark:bg-darkPoint">
                  <thead>
                    <tr className="h-10 w-full bg-gradient-to-r from-amber-400 via-red-800 to-black dark:from-pink-300 dark:via-purple-400 dark:to-indigo-400  text-lg text-white font-extrabold text-center ">
                      <th>RANK</th>
                      <th>TEAM</th>

                      <th>SCORE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="w-full p-4 h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                      <td>1</td>
                      <td>기믄지</td>
                      <td>
                        <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                        500
                      </td>
                    </tr>

                    <tr className="w-full m-4 h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                      <td>2</td>
                      <td>기믄지</td>
                      <td>
                        <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                        500
                      </td>
                    </tr>
                    <tr className="w-full p-4 h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                      <td>2</td>
                      <td>기믄지</td>
                      <td>
                        <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                        500
                      </td>
                    </tr>
                    <tr className="w-full m-4 h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                      <td>2</td>
                      <td>기믄지</td>
                      <td>
                        <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                        500
                      </td>
                    </tr>
                    <tr className="w-full p-4 h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                      <td>2</td>
                      <td>기믄지</td>
                      <td>
                        <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                        500
                      </td>
                    </tr>
                    <tr className="w-full m-4 h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                      <td>2</td>
                      <td>기믄지</td>
                      <td>
                        <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                        500
                      </td>
                    </tr>
                    <tr className="w-full p-4 h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                      <td>2</td>
                      <td>기믄지</td>
                      <td>
                        <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                        500
                      </td>
                    </tr>
                    <tr className="w-full m-4 h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                      <td>2</td>
                      <td>기믄지</td>
                      <td>
                        <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                        500
                      </td>
                    </tr>
                    <tr className="w-full p-4 h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                      <td>2</td>
                      <td>기믄지</td>
                      <td>
                        <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                        500
                      </td>
                    </tr>
                    <tr className="w-full m-4 h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                      <td>2</td>
                      <td>기믄지</td>
                      <td>
                        <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                        500
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* NOTE 마이페이지 */}
            {/* 1. 마이페이지(작성글) 컴포넌트*/}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(ScoreBoard);
