

import ScoreBoard from './ScoreBoard'
import NavigationLayout from './Components/NavigationLayout'


export default function Ctf() {
  
  return (
    <div className='bg-mainWhite dark:bg-mainBlack min-h-screen'>
      
      {/* 기존 홈페이지 헤더에 맞추기 위해,  */}
      <div className='max-w-7xl mx-auto flex flex-row' >
        {/*사이드바*/}
        <NavigationLayout/>
        <div className="md:w-4/5 flex flex-col flex-1 bg-amber-100 p-3">
          {/* 이제 여기서 추가할 컴포넌트 가져오면 됨!!! */}
          {/* <ScoreBoard/> */}
            챌린지컴포넌트당
        </div>
      </div>
    </div>
  )
}
