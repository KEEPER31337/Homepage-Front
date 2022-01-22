import React from 'react';

// shared
import PageContainer from 'shared/PageContainer';
import LayoutContainer from 'shared/LayoutContainer';

// local
import Calendar from './Calendar';
import Box from './Box';
import AttandanceTable from './AttandanceTable';

// img
import LeafIcon from 'assets/img/leaf.png';
import PrizeIcon from 'assets/img/prize.png';
import CoinIcon from 'assets/img/coin.png';

const Attandance = () => {
  return (
    <PageContainer>
      <LayoutContainer>
        <div className="container">
          <Calendar />
        </div>
        <div className="container grid grid-flow-col justify-center content-center gap-10 py-6">
          <Box icon={LeafIcon} text="개근 5일차" />
          <Box icon={PrizeIcon} text="1등" />
          <Box icon={CoinIcon} text="1800 pt" />
          <Box />
        </div>
        <div className="container py-6">
          <AttandanceTable />
        </div>
      </LayoutContainer>
    </PageContainer>
  );
};

export default Attandance;
