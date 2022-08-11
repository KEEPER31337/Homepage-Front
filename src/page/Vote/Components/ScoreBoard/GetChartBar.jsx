import React, { useEffect, useState } from 'react';
import ChartRace from 'react-chart-race';
// local
import useWindowDimensions from './WindowDimensions';
import getVoteData from './VoteDataScore';

const ChartBar = ({ member, vote, job }) => {
  const { height, width } = useWindowDimensions();
  const data = getVoteData({ member, vote, job });
  const [chartWidth, setChartWidth] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);

  useEffect(() => {
    if (width < 640) {
      // sm
      setChartWidth(400);
      setItemHeight(20);
    } else if (width < 770) {
      // md
      setChartWidth(500);
      setItemHeight(25);
    } else {
      // lg
      setChartWidth(700);
      setItemHeight(30);
    }
  }, [width]);

  return (
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
  );
};

export default ChartBar;
