import React, { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';

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
import { connect } from 'react-redux';

const dateFormat = 'YYYY-MM-DD';

const Attandance = ({ member }) => {
  const [attendInfo, setAttendInfo] = useState({});

  const continuousModalRef = useRef({});
  const rankModalRef = useRef({});
  const pointModalRef = useRef({});

  useEffect(() => {
    const date = dayjs();
    // console.log(date.format(dateFormat));
    attendanceAPI
      .getAttendInfo({
        date: date.format(dateFormat),
        token: member.token,
      })
      .then((data) => {
        if (data.success) setAttendInfo(data.data);
        else console.log(data);
      });

    // attendanceAPI.get
  }, []);

  return (
    <div>
      <NavigationLayout>
        <div className="container">
          <Calendar />
        </div>
        <div className="container grid grid-cols-2 m-auto lg:grid-cols-4 justify-center justify-items-center  gap-10 py-6">
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

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};
export default connect(mapStateToProps)(Attandance);
