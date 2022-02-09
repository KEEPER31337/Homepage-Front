import React, { useRef } from 'react';

// shared
import PageContainer from 'shared/PageContainer';
import LayoutContainer from 'shared/LayoutContainer';

// local
import Calendar from './Component/Calendar';
import Box from './Component/Box';
import AttandanceTable from './Component/AttandanceTable';
import ContinuousModal from './Component/ContinuousModal';
import RankModal from './Component/RankModal';
import PointModal from './Component/PointModal';
import NavigationLayout from '../../shared/NavigationLayout';

// asset
import LeafIcon from 'assets/img/leaf.png';
import PrizeIcon from 'assets/img/prize.png';
import CoinIcon from 'assets/img/coin.png';

// API
import attendanceAPI from 'API/v1/attendance';
import { useEffect } from 'react';

const Attandance = () => {
  const continuousModalRef = useRef({});
  const rankModalRef = useRef({});
  const pointModalRef = useRef({});

  useEffect(() => {
    attendanceAPI
      .getAttendDate({
        startDate: '2020-01-01',
        endDate: '2020-01-31',
        token: '',
      })
      .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <NavigationLayout>
        <div className="container">
          <Calendar />
        </div>
        <div className="container grid grid-flow-col justify-center content-center gap-10 py-6">
          <Box
            icon={LeafIcon}
            text="개근 5일차"
            onClick={() => {
              continuousModalRef.current.open();
            }}
          />
          <Box
            icon={PrizeIcon}
            text="1등"
            onClick={() => {
              rankModalRef.current.open();
            }}
          />
          <Box
            icon={CoinIcon}
            text="1800 pt"
            onClick={() => {
              pointModalRef.current.open();
            }}
          />
          <Box />
          <ContinuousModal ref={continuousModalRef} />
          <RankModal ref={rankModalRef} />
          <PointModal ref={pointModalRef} />
        </div>
        <div className="container py-6">
          <AttandanceTable />
        </div>
      </NavigationLayout>
    </div>
  );
};

export default Attandance;
