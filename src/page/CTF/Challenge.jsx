import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';
import Category from './Components/Category';
import AuthModal from './Components/AuthModal';
// API
import ctfAPI from 'API/v1/ctf';

const Challenge = ({ member, ctfId }) => {
  const [probList, setProbList] = useState([
    {
      challengeId: null,
      title: null,
      category: {
        id: null,
        name: null,
      },
      score: null,
      isSolved: null,
      contestId: null,
    },
  ]);

  const ModalRef = useRef({});

  useEffect(() => {
    ctfAPI
      .seeMyTeam({
        ctfId: ctfId,
        token: member.token,
      })
      .then((data) => {
        if (data.code === -13004) {
          ModalRef.current.open();
        }
      });
  }, []);
  useEffect(() => {
    ctfAPI
      .getProbList({
        cid: ctfId,
        token: member.token,
      })
      .then((data) => {
        // TODO cid 받아와서 넣기
        if (data.success) {
          console.log(data);
          setProbList(data.list);
        } else {
          console.log(data);
          // alert('문제 목록을 받아오는 중 오류가 발생하였습니다.');
        }
      });
    /* ctfAPI // TODO 카테고리 받아와서 카테고리별 리스트 만들기
      .getCategoryList({
        token: member.token,
      })
      .then((data) => {
        console.log(data);
      }); */
  }, []);
  // NOTE 각각 카테고리별 변수 두지 않고 한 번에 처리하도록 수정해보자
  const webList = probList.filter((challenge) => challenge.category.id == 5);
  const systemList = probList.filter((challenge) => challenge.category.id == 2);
  const reversingList = probList.filter(
    (challenge) => challenge.category.id == 3
  );
  const cryptoList = probList.filter((challenge) => challenge.category.id == 6);
  const forensicList = probList.filter(
    (challenge) => challenge.category.id == 4
  );
  const miscList = probList.filter((challenge) => challenge.category.id == 1);
  const osintList = probList.filter((challenge) => challenge.category.id == 7);

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
    <div className="md:w-4/5 flex flex-col flex-1 p-3">
      {Web}
      {System}
      {Rev}
      {Crypto}
      {Forensic}
      {Misc}
      {Osint}
      <AuthModal ref={ModalRef}>
        가입한 팀을 찾을 수 없습니다 <br />팀 가입 부탁드립니다!
      </AuthModal>
    </div>
  );
};

const mapStateToProps = (state, ctfId) => {
  return { member: state.member, ctfId: state.ctf.ctfId };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
