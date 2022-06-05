import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';
import NavigationLayout from './Components/NavigationLayout';
import Category from './Components/Category';

// API
import ctfAPI from 'API/v1/ctf';

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
const Ctf = ({ member }) => {
  const [probList, setProbList] = useState([
    {
      challengeId: null,
      title: null,
      score: null,
      category: {
        id: null,
        name: null,
      },
      contestId: null,
    },
  ]);

  useEffect(() => {
    ctfAPI
      .getProbList({
        cid: 2,
        token: member.token,
      })
      .then((data) => {
        // TODO cid 받아와서 넣기
        if (data.success) {
          console.log(data);
          setProbList(data.list);
        } else {
          console.log(data);
          alert('문제 목록을 받아오는 중 오류가 발생하였습니다.');
        }
      });
  }, []);
  // NOTE 각각 카테고리별 변수 두지 않고 한 번에 처리하도록 수정해보자
  const webList = probList.filter((challenge) => challenge.category.id == 0);
  const systemList = probList.filter((challenge) => challenge.category.id == 1);
  const reversingList = probList.filter(
    (challenge) => challenge.category.id == 2
  );
  const cryptoList = probList.filter((challenge) => challenge.category.id == 3);
  const forensicList = probList.filter(
    (challenge) => challenge.category.id == 4
  );
  const miscList = probList.filter((challenge) => challenge.category.id == 5);
  const osintList = probList.filter((challenge) => challenge.category.id == 6);

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
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ctf);
