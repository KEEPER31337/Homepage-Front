import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';

// local
import NavigationLayout from './Components/NavigationLayout';
import ContestOverview from './Components/ContestOverview';
import Table from './Components/Table';

// API
import ctfAPI from 'API/v1/ctf';

const Ctf = ({ member }) => {
  const tableHead = ['대회명', '설명', '개최자'];
  const [tableBody, setTableBody] = useState([]);
  const [overview, setOverview] = useState([]);

  useEffect(() => {
    ctfAPI
      .getJoinableContestList({
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          console.log(data);
          data.list.map(
            (contest, contestIdx) => (
              contestIdx < 3
                ? setOverview(
                    overview.concat(
                      <ContestOverview
                        key={contestIdx}
                        name={contest.name}
                        description={contest.description}
                        creator="asdf" /* TODO api 수정되면 creator 이름 받아오기 */
                      />
                    )
                  )
                : null,
              setTableBody(
                tableBody.concat([
                  [contest.name, contest.description, 'asdf'],
                ]) /* TODO api 수정되면 creator 이름 받아오기 */
              )
            )
          );
        } else {
          console.log(data);
          alert('대회 목록을 받아오는 중 오류가 발생하였습니다.');
        }
      });
  }, []);

  console.log(tableBody);
  return (
    <div className="bg-mainWhite dark:bg-mainBlack min-h-screen">
      {/* 기존 홈페이지 헤더에 맞추기 위해,  */}
      <div className="max-w-7xl mx-auto flex flex-row">
        {/*사이드바*/}
        <NavigationLayout />
        <div className="md:w-4/5 flex flex-col flex-1 p-3">
          <div className="mr-20">
            <div className="my-10 text-center text-lg font-basic dark:text-amber-200 ">
              참여할 대회를 선택해주세요!
            </div>
            <div className="my-10 mx-20 flex flex-wrap justify-between">
              <div className="mb-20">
                <div className="m-5">OverView</div>
                <div>{overview.map((ov) => ov)}</div>
              </div>
              <div className="w-full">
                <Table
                  headList={tableHead}
                  bodyList={tableBody.reverse()}
                ></Table>
              </div>
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

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ctf);
