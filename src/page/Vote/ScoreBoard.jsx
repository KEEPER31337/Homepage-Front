import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import ChartRace from 'react-chart-race';
// redux
import actionMember from 'redux/action/member';
//local
import useWindowDimensions from './Components/WindowDimensions';
import getVoteData from './Components/VoteDataScore';

const ScoreBoard = (props) => {
  //redux
  useEffect(() => {
    console.log('집계 결과 페이지 redux');
    console.log(props.vote.voteId);
    console.log(props.vote.voteName);
  }, []);

  const { height, width } = useWindowDimensions();
  const data = getVoteData();
  const [chartWidth, setChartWidth] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);

  useEffect(() => {
    if (width < 640) {
      // sm
      setChartWidth(400);
      setItemHeight(20);
    } else if (width < 770) {
      // md
      setChartWidth(650);
      setItemHeight(25);
    } else {
      // lg
      setChartWidth(800);
      setItemHeight(30);
    }
  }, [width]);

  return (
    <div className="flex flex-col items-center w-full font-basic">
      <div className="text-xl font-bold  p-2 mt-4">
        <button className=" w-24 h-10 font-extrabold bg-amber-200 border-amber-400 rounded border-b-4 px-4 py-1 hover:bg-amber-300 mx-2">
          회장
        </button>
        <button className="w-24 h-10 font-extrabold bg-amber-200 border-amber-400 rounded border-b-4 px-4 py-1 hover:bg-amber-300 mx-2">
          부회장
        </button>
        <button className="w-24 h-10 font-extrabold bg-amber-200 border-amber-400 rounded border-b-4 px-4 py-1 hover:bg-amber-300 mx-2">
          총무
        </button>
      </div>
      <ChartRace
        data={data}
        backgroundColor="#fff"
        width={chartWidth}
        padding={12}
        itemHeight={itemHeight}
        gap={12}
        titleStyle={{
          font: ' font-basic normal 400 13px Arial',
          color: '#000',
        }}
        valueStyle={{
          font: 'normal 400 11px Arial',
          color: 'rgba(0,0,0, 0.42)',
        }}
      />
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member, vote: state.vote };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoard);
