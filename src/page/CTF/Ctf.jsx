import React from 'react';
import NavigationLayout from './Components/NavigationLayout';
import Category from './Components/Category';

const testData = [
  {
    id: 1,
    category: 'Web',
    name: 'A',
    score: 10,
    isSolved: true,
  },
  {
    id: 2,
    category: 'Forensic',
    name: 'B',
    score: 20,
    isSolved: true,
  },
  {
    id: 3,
    category: 'Crypto',
    name: 'D',
    score: 40,
    isSolved: false,
  },
  {
    id: 4,
    category: 'Forensic',
    name: 'E',
    score: 50,
    isSolved: true,
  },
];

export default function Ctf() {
  const webList = testData.filter((challenge) => challenge.category == 'Web');
  const systemList = testData.filter(
    (challenge) => challenge.category == 'System'
  );
  const reversingList = testData.filter(
    (challenge) => challenge.category == 'Reversing'
  );
  const cryptoList = testData.filter(
    (challenge) => challenge.category == 'Crypto'
  );
  const forensicList = testData.filter(
    (challenge) => challenge.category == 'Forensic'
  );
  const miscList = testData.filter((challenge) => challenge.category == 'Misc');
  const osintList = testData.filter(
    (challenge) => challenge.category == 'Osint'
  );

  let Web, System, Rev, Crypto, Forensic, Misc, Osint;

  if (webList.length != 0)
    Web = <Category category={'WEB'} categoryList={webList} />;
  if (systemList.length != 0)
    System = <Category category={'SYSTEM'} categoryList={systemList} />;
  if (reversingList.length != 0)
    Rev = <Category category={'REVERSING'} categoryList={reversingList} />;
  if (cryptoList.length != 0)
    Crypto = <Category category={'CRYPTO'} categoryList={cryptoList} />;
  if (forensicList.length != 0)
    Forensic = <Category category={'FORENSICS'} categoryList={forensicList} />;
  if (miscList.length != 0)
    Misc = <Category category={'MISC'} categoryList={miscList} />;
  if (osintList.length != 0)
    Osint = <Category category={'OSINT'} categoryList={osintList} />;

  return (
    <div className="bg-mainWhite dark:bg-mainBlack min-h-screen">
      {/* 기존 홈페이지 헤더에 맞추기 위해,  */}
      <div className="max-w-7xl mx-auto flex flex-row">
        {/*사이드바*/}
        <NavigationLayout />
        <div className="md:w-4/5 flex flex-col flex-1 p-3">
          {Web}
          {System}
          {Rev}
          {Crypto}
          {Forensic}
          {Misc}
          {Osint}

          {/* NOTE 카테코리 추가 될 경우 나중에 시간나면 처리해주기 */}
          {/* NOTE 여기서 문제 유형 list api에서 받아와서 map으로 돌릴지는 생각 중*/}
          {/* <Category category={'WEB'} categoryList={webList} />
          <Category category={'SYSTEM'} categoryList={systemList} />
          <Category category={'REVERSING'} categoryList={reversingList} />
          <Category category={'CRYPTO'} categoryList={cryptoList} />
          <Category category={'FORENSICS'} categoryList={forensicList} />
          <Category category={'MISC'} categoryList={miscList} />
          <Category category={'OSINT'} categoryList={osintList} /> */}
        </div>
      </div>
    </div>
  );
}
