import { connect } from 'react-redux';
import { GiftIcon, StarIcon } from '@heroicons/react/outline';
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
            <div className="md:flex p-1 border-2 shadow-sm">
              {/* NOTE 프로필 */}
              <div className="w-full m-2 ">
                <div className="p-1 bg-white">
                  {/* 1.  닉네임 + 회원 뱃지 */}
                  <div className="flex justify-between m-1">
                    {/*닉네임*/}
                    <div className="font-extrabold text-4xl m-1">
                      SCOREBOARD
                    </div>
                    {/*회원 뱃지*/}
                  </div>
                  {/*구분선*/}
                  <div className="p-[2px] mb-2 dark:from-purple-500 dark:via-purple-200 dark:to-amner-200 bg-gradient-to-r from-amber-500 via-amber-200 to-yellow-300  "></div>
                  {/* 2.  프로필 이미지 + 팔로우 + 포인트 */}

                  <div className="w-full h-full inline-block rounded overflow-hidden text-center border">
                    <table className=" dark:text-white w-full border-2 shadow  rounded-md dark:bg-darkPoint">
                      <thead>
                        <tr className="h-10 bg-gradient-to-r from-amber-400 via-red-800 to-black dark:from-pink-300 dark:via-purple-400 dark:to-indigo-400 rounded-md p-4 text-lg text-white font-extrabold text-center ">
                          <th>ID</th>
                          <th>name</th>

                          <th>score</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="w-full  h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                          <td>1</td>
                          <td>기믄지</td>
                          <td>
                            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                            100
                          </td>
                        </tr>
                        <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                          <td>2</td>
                          <td>기믄지</td>
                          <td>
                            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                            500
                          </td>
                        </tr>
                        <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                          <td>2</td>
                          <td>기믄지</td>
                          <td>
                            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                            500
                          </td>
                        </tr>
                        <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                          <td>2</td>
                          <td>기믄지</td>
                          <td>
                            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                            500
                          </td>
                        </tr>
                        <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                          <td>2</td>
                          <td>기믄지</td>
                          <td>
                            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                            500
                          </td>
                        </tr>
                        <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                          <td>2</td>
                          <td>기믄지</td>
                          <td>
                            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                            500
                          </td>
                        </tr>
                        <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                          <td>2</td>
                          <td>기믄지</td>
                          <td>
                            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                            500
                          </td>
                        </tr>
                        <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                          <td>2</td>
                          <td>기믄지</td>
                          <td>
                            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                            500
                          </td>
                        </tr>
                        <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                          <td>2</td>
                          <td>기믄지</td>
                          <td>
                            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                            500
                          </td>
                        </tr>
                        <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                          <td>2</td>
                          <td>기믄지</td>
                          <td>
                            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                            500
                          </td>
                        </tr>
                        <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                          <td>2</td>
                          <td>기믄지</td>
                          <td>
                            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                            500
                          </td>
                        </tr>
                        <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                          <td>2</td>
                          <td>기믄지</td>
                          <td>
                            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                            500
                          </td>
                        </tr>
                        <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                          <td>2</td>
                          <td>기믄지</td>
                          <td>
                            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                            500
                          </td>
                        </tr>
                        <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                          <td>2</td>
                          <td>기믄지</td>
                          <td>
                            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                            500
                          </td>
                        </tr>
                        <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                          <td>3</td>
                          <td>기믄지</td>
                          <td>
                            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                            999
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* NOTE 마이페이지 */}
              {/* 1. 마이페이지(작성글) 컴포넌트*/}
            </div>
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
