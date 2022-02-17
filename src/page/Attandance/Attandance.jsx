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
  const [attendLogList, setAttendLogList] = useState([]);

  const continuousModalRef = useRef({});
  const rankModalRef = useRef({});
  const pointModalRef = useRef({});

  useEffect(() => {
    const date = dayjs();
    attendanceAPI
      .getAttendInfo({
        date: date.format(dateFormat),
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setAttendInfo(data.data);
        }
      });
  }, [member]);

  return (
    <div>
      <NavigationLayout>
        <div className="container">
          <Calendar />
        </div>
        <div className="container grid grid-cols-2 m-auto lg:grid-cols-4 justify-center justify-items-center  gap-10 py-6">
          <Box
            icon={LeafIcon}
            text={
              attendInfo.continuousDay
                ? `개근 ${attendInfo.continuousDay + 1}일차`
                : '-'
            }
            onClick={() => {
              continuousModalRef.current.open();
            }}
          />
          <Box
            icon={PrizeIcon}
            text={attendInfo.rank ? `${attendInfo.rank}등` : '-'}
            onClick={() => {
              rankModalRef.current.open();
            }}
          />
          <Box
            icon={CoinIcon}
            text={attendInfo.point ? `${attendInfo.point} pt` : '-'}
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
          <AttandanceTable attendLogList={attendLogList} />
        </div>
      </NavigationLayout>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};
export default connect(mapStateToProps)(Attandance);
