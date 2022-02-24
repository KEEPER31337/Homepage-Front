import { GiftIcon } from '@heroicons/react/solid';
const RuleOfLotto = ({ gameInfo }) => {
  return (
    <div className="flex justify-center items-center text-center">
      <div className="relative  md:w-2/3 lg:w-1/3 w-full my-5 p-5 border-2 shadow-md dark:shadow-indigo-400 border-divisionGray rounded-md dark:to-indigo-400">
        <div className="bg-gradient-to-r from-amber-400 via-red-800 to-black dark:from-pink-300 dark:via-purple-400 dark:to-indigo-400 rounded-md p-4 text-lg text-white font-extrabold text-center ">
          1000 포인트로 인생 한방!
        </div>

        <div className="flex rounded-lg dark:text-white">
          <table className="w-full text-md bg-white shadow-md rounded dark:bg-darkComponent">
            <tbody>
              <tr>
                <th className="p-3 px-5">등수</th>
                <th className="p-3 px-5">포인트</th>
                <th className="p-3 px-5">확률</th>
              </tr>
              <tr key="1" className="bg-amber-50 dark:bg-darkPoint">
                <td className="p-3 px-5 ">
                  <span className=" px-2 py-1 text-lg font-bold">1등</span>
                </td>
                <td className="p-3 px-5 text-left">
                  <GiftIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                  <span className=" text-md font-bold  ">
                    {gameInfo.FIRST_POINT.toLocaleString('ko-KR')} point
                  </span>
                </td>
                <td className="p-3 px-5 text-right">
                  <span className=" px-2 py-1 font-bold ">
                    {gameInfo.SECOND_PROB.toFixed(4)}%
                  </span>
                </td>
              </tr>
              <tr key="2" className="">
                <td className="p-3 px-5 text-lg font-bold">2등</td>
                <td className="p-3 px-5 text-left">
                  <GiftIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                  <span className=" text-md font-bold  ">
                    {gameInfo.SECOND_POINT.toLocaleString('ko-KR')} point
                  </span>
                </td>
                <td className="p-3 px-5  text-right">
                  <span className=" px-2 py-1 font-bold ">
                    {gameInfo.SECOND_PROB * 100}%
                  </span>
                </td>
              </tr>
              <tr key="3" className="bg-amber-50 dark:bg-darkPoint">
                <td className="p-3 px-5 text-lg font-bold">3등</td>
                <td className="p-3 px-5 text-left">
                  <GiftIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                  <span className=" text-md font-bold  ">
                    {gameInfo.THIRD_POINT.toLocaleString('ko-KR')} point
                  </span>
                </td>
                <td className="p-3 px-5  text-right">
                  <span className=" px-2 py-1 font-bold ">
                    {gameInfo.THIRD_PROB * 100}%
                  </span>
                </td>
              </tr>
              <tr key="4" className="">
                <td className="p-3 px-5 text-lg font-bold">4등</td>
                <td className="p-3 px-5 text-left">
                  <GiftIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                  <span className=" text-md font-bold  ">
                    {gameInfo.FOURTH_POINT.toLocaleString('ko-KR')} point
                  </span>
                </td>
                <td className="p-3 px-5 text-right">
                  <span className=" px-2 py-1 font-bold ">
                    {gameInfo.FOURTH_PROB * 100}%
                  </span>
                </td>
              </tr>
              <tr key="5" className="bg-amber-50 dark:bg-darkPoint">
                <td className="p-3 px-5 text-lg font-bold">5등</td>
                <td className="p-3 px-5 text-left">
                  <GiftIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                  <span className=" text-md font-bold  ">
                    {gameInfo.FIFTH_POINT.toLocaleString('ko-KR')} point
                  </span>
                </td>
                <td className="p-3 px-5 text-right">
                  <span className=" px-2 py-1 font-bold ">
                    {gameInfo.FIFTH_PROB * 100}%
                  </span>
                </td>
              </tr>
              <tr key="6" className="">
                <td className="p-3 px-5 text-lg font-bold">6등</td>
                <td className="p-3 px-5 text-left">
                  <GiftIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                  <span className=" text-md font-bold  ">
                    {gameInfo.LAST_POINT.toLocaleString('ko-KR')} point
                  </span>
                </td>
                <td className="p-3 px-5 text-right">
                  <span className=" px-2 py-1 font-bold ">나머지</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RuleOfLotto;
