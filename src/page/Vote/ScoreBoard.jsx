import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import ChartRace from 'react-chart-race';
// redux
import actionMember from 'redux/action/member';
//local
import useWindowDimensions from './Components/WindowDimensions';
import getVoteData from './Components/VoteDataScore';

const ScoreBoard = ({ member }) => {
  const { height, width } = useWindowDimensions();
  const data = getVoteData();
  const [chartWidth, setChartWidth] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);

  useEffect(() => {
    if (width < 640) {
      // sm
      setChartWidth(300);
      setItemHeight(20);
    } else if (width < 770) {
      // md
      setChartWidth(450);
      setItemHeight(25);
    } else {
      // lg
      setChartWidth(600);
      setItemHeight(30);
    }
  }, [width]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-3xl font-bold p-2">집계 결과!</div>
      <ChartRace
        data={data}
        backgroundColor="#000"
        width={chartWidth}
        padding={12}
        itemHeight={itemHeight}
        gap={12}
        titleStyle={{ font: 'normal 400 13px Arial', color: '#fff' }}
        valueStyle={{
          font: 'normal 400 11px Arial',
          color: 'rgba(255,255,255, 0.42)',
        }}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoard);
