import { GiftIcon } from '@heroicons/react/solid';
const RuleOfLotto = ({ gameInfo }) => {
  return (
    <div className="flex justify-center items-center text-center">
      <div className="relative  md:w-2/3 lg:w-1/3 w-full my-5 p-5 border-2 border-divisionGray">
        <div className="bg-gradient-to-r from-amber-400 via-red-800 to-black rounded-md p-4 text-lg text-white font-extrabold text-center ">
          1000 포인트로 인생 한방!
        </div>

        <div className="flex  border bg-white  rounded-lg">
          <table className="w-full text-md bg-white shadow-md rounded">
            <tbody>
              <tr>
                <th className="p-3 px-5">등수</th>
                <th className="p-3 px-5">포인트</th>
                <th className="p-3 px-5">확률</th>
              </tr>
              <tr key="1" className="bg-amber-50">
                <td className="p-3 px-5 ">
                  <span className=" px-2 py-1 text-lg font-bold text-amber-900">
                    1등
                  </span>
                </td>
                <td className="p-3 px-5 text-left">
                  <GiftIcon className="inline-block h-6 w-6 m-1 text-amber-400 " />
                  <span className=" text-md font-bold  text-amber-600">
                    {gameInfo.FIRST_POINT.toLocaleString('ko-KR')} point
                  </span>
                </td>
                <td className="p-3 px-5 text-right">
                  <span className=" px-2 py-1 font-bold text-amber-600">
                    {gameInfo.SECOND_PROB.toFixed(4)}%
                  </span>
                </td>
              </tr>
              <tr key="2" className="">
                <td className="p-3 px-5 text-lg font-bold text-amber-900">
                  2등
                </td>
                <td className="p-3 px-5 text-left">
                  <GiftIcon className="inline-block h-6 w-6 m-1 text-amber-400 " />
                  <span className=" text-md font-bold  text-amber-600">
                    {gameInfo.SECOND_POINT.toLocaleString('ko-KR')} point
                  </span>
                </td>
                <td className="p-3 px-5  text-right">
                  <span className=" px-2 py-1 font-bold text-amber-600">
                    {gameInfo.SECOND_PROB * 100}%
                  </span>
                </td>
              </tr>
              <tr key="3" className="bg-amber-50">
                <td className="p-3 px-5 text-lg font-bold text-amber-900">
                  3등
                </td>
                <td className="p-3 px-5 text-left">
                  <GiftIcon className="inline-block h-6 w-6 m-1 text-amber-400 " />
                  <span className=" text-md font-bold  text-amber-600">
                    {gameInfo.THIRD_POINT.toLocaleString('ko-KR')} point
                  </span>
                </td>
                <td className="p-3 px-5  text-right">
                  <span className=" px-2 py-1 font-bold text-amber-600">
                    {gameInfo.THIRD_PROB * 100}%
                  </span>
                </td>
              </tr>
              <tr key="4" className="">
                <td className="p-3 px-5 text-lg font-bold text-amber-900">
                  4등
                </td>
                <td className="p-3 px-5 text-left">
                  <GiftIcon className="inline-block h-6 w-6 m-1 text-amber-400 " />
                  <span className=" text-md font-bold  text-amber-600">
                    {gameInfo.FOURTH_POINT.toLocaleString('ko-KR')} point
                  </span>
                </td>
                <td className="p-3 px-5 text-right">
                  <span className=" px-2 py-1 font-bold text-amber-600">
                    {gameInfo.FOURTH_PROB * 100}%
                  </span>
                </td>
              </tr>
              <tr key="5" className="bg-amber-50">
                <td className="p-3 px-5 text-lg font-bold text-amber-900">
                  5등
                </td>
                <td className="p-3 px-5 text-left">
                  <GiftIcon className="inline-block h-6 w-6 m-1 text-amber-400 " />
                  <span className=" text-md font-bold  text-amber-600">
                    {gameInfo.FIFTH_POINT.toLocaleString('ko-KR')} point
                  </span>
                </td>
                <td className="p-3 px-5 text-right">
                  <span className=" px-2 py-1 font-bold text-amber-600">
                    {gameInfo.FIFTH_PROB * 100}%
                  </span>
                </td>
              </tr>
              <tr key="6" className="">
                <td className="p-3 px-5 text-lg font-bold text-amber-900">
                  6등
                </td>
                <td className="p-3 px-5 text-left">
                  <GiftIcon className="inline-block h-6 w-6 m-1 text-amber-400 " />
                  <span className=" text-md font-bold  text-amber-600">
                    {gameInfo.LAST_POINT.toLocaleString('ko-KR')} point
                  </span>
                </td>
                <td className="p-3 px-5 text-right">
                  <span className=" px-2 py-1 font-bold text-amber-600">
                    나머지
                  </span>
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
