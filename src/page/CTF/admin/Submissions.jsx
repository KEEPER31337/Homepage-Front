

import NavigationLayout from '../Components/NavigationLayout'


export default function Submissions() {
  
  return (
    <div className='bg-mainWhite dark:bg-mainBlack min-h-screen'>
      
      {/* 기존 홈페이지 헤더에 맞추기 위해,  */}
      <div className='max-w-7xl mx-auto flex flex-row' >
        {/*사이드바*/}
        <NavigationLayout/>
        <div className="md:w-4/5 flex flex-col flex-1 bg-gray-100 p-3">
          {/* 이제 여기서 추가할 컴포넌트 가져오면 됨!!! */}
          {/* <ScoreBoard/> */}
          <div className="">
            <div className=" w-full container mx-auto justify-center items-center">
              {/* 1. 커스텀 색상 팔레트 */}
            

              <div className="md:flex p-1 bg-backGray border-2 shadow-sm">
                {/* NOTE 프로필 */}
                <div className="w-full m-2 ">
                  <div className="p-1 bg-white">
                    {/* 1.  닉네임 + 회원 뱃지 */}
                    <div className="flex justify-between m-1">
                      {/*닉네임*/}
                      <div className="font-extrabold text-4xl m-1">Submission Log</div>
                      {/*회원 뱃지*/}

                     
                        
                    </div>
                    {/*구분선*/}
                    <div className="p-[2px] mb-2 bg-gradient-to-r from-amber-500 via-amber-200 to-yellow-300  "></div>
                    {/* 2.  프로필 이미지 + 팔로우 + 포인트 */}

                    
                    
                    <div className="w-full h-full inline-block rounded overflow-hidden text-center border">
                      <table className="w-full border-2 shadow  rounded-md">
                        <thead>
                          <tr className="h-10 bg-gray-100  border-b-2">
                            <th>ID</th>
                            <th>title</th>
                            <th>성공여부</th>
                            <th>team</th>
                            <th>제출</th>
                            <th>날짜</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                            <td>1</td>
                            <td>어려운 문제</td>
                            <td>성공</td>
                            <td>키퍼팀</td>
                            <td>flagaaaa</td>
                            <td>2022.2.2</td>
                          </tr>
                          <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                            <td>2</td>
                            <td>너무 어려운 문제</td>
                            <td>실패</td>
                            <td>냥냥팀</td>
                            <td>flagAAA</td>
                            <td>2022.2.2</td>
                          </tr>
                          <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                            <td>3</td>
                            <td>짱짱 어려운 문제</td>
                            <td>성공</td>
                            <td>뇽뇽팀</td>
                            <td>flagBBB</td>
                            <td>2022.2.4</td>
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
    </div>
  )
}
