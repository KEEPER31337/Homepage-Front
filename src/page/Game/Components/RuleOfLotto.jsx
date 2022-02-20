import { GiftIcon } from '@heroicons/react/solid';
const RuleOfLotto = ({ gameInfo }) => {
  return (
    <div className="flex justify-center items-center text-center">
      <div className="relative  md:w-3/5 lg:w-3/5 w-full my-5 p-5 border-2 border-divisionGray">
        <div className="bg-gradient-to-r from-amber-400 via-red-800 to-black rounded-md p-4 text-2xl text-white font-extrabold text-center ">
          1000 포인트로 인생 한방!
        </div>
        <div className="flex  border-b bg-white  rounded-lg">
          <table className="relative w-full divide-y divide-gray-200">
            <tr key="3">
              <td className="border py-4">
                <div className="ml-4">
                  <span className=" px-2 py-1 leading-5 text-lg font-bold rounded-full bg-amber-100 text-amber-600">
                    3등
                  </span>
                </div>
              </td>
              <td className="border py-4 ">
                <div className="ml-4">
                  <span className=" px-2 py-1 leading-5 text-lg font-bold rounded-full bg-amber-100 text-amber-600">
                    {gameInfo.THIRD_POINT.toLocaleString('ko-KR')} point
                  </span>
                  {/* <GiftIcon className="inline-block h-7 w-7 m-1 text-amber-400 " /> */}
                </div>
              </td>

              <td className="border py-4">
                <div className="ml-4">
                  <span className=" px-2 py-1 leading-5 text-lg font-bold rounded-full bg-amber-100 text-amber-600">
                    {gameInfo.THIRD_PROB * 100}%
                  </span>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RuleOfLotto;
