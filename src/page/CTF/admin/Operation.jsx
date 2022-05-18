import { Fragment } from 'react';
import NavigationLayout from '../Components/NavigationLayout';

export default function Operation() {
  return (
    <div className="bg-mainWhite dark:bg-mainBlack min-h-screen">
      {/* 기존 홈페이지 헤더에 맞추기 위해,  */}
      <div className="max-w-7xl mx-auto flex flex-row">
        {/*사이드바*/}
        <NavigationLayout />
        <div className="md:w-4/5 flex flex-col flex-1 p-3">
          {/* 이제 여기서 추가할 컴포넌트 가져오면 됨!!! */}
          <div className="">
            <div className=" w-full container mx-auto justify-center items-center">
              {/* 1. 커스텀 색상 팔레트 */}

              <div className="md:flex p-1 border-2 shadow-sm">
                <div className="w-full m-2 ">
                  <div className="p-1 bg-white">
                    <div className="flex justify-between m-1">
                      <div className="font-extrabold text-4xl m-1">
                        CTF-Operation
                      </div>
                      <div className="flex m-1">
                        <div className=" flex rounded p-1 bg-amber-300 border-2 border-amber-400 shadow-[inset_0_2px_0_1px_#ffffff]">
                          <div className=" text-md ">
                            <button className="hover:bg-amber-500  m-1 hover:text-mainWhite rounded font-bold">
                              대회 추가
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*구분선*/}
                    <div className="p-[2px] mb-2 bg-gradient-to-r from-amber-500 via-amber-200 to-yellow-300  "></div>
                    {/* 2.  프로필 이미지 + 팔로우 + 포인트 */}

                    <div className="w-full h-full inline-block rounded overflow-hidden text-center border">
                      <table className="w-full border-2 shadow  rounded-md">
                        <thead>
                          <tr className="h-10 bg-gray-100  border-b-2">
                            <th>번호</th>
                            <th>대회명</th>
                            <th>설명</th>
                            <th>개최자</th>
                            <th>개최여부</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                            <td>1</td>
                            <td>2022_1 KEEPER CTF</td>
                            <td>없움</td>
                            <td>현모정</td>
                            <td>
                              <button className="bg-amber-500  m-1 hover:text-mainWhite rounded font-bold">
                                안개최
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
