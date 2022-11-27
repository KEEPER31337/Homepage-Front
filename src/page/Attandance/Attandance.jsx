import React, { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';

// shared
import PageContainer from 'shared/PageContainer';
import LayoutContainer from 'shared/LayoutContainer';
import AuthUser from 'shared/AuthUser';

// local
import Calendar from './Component/Calendar';
import Box from './Component/Box';
import AttandanceTable from './Component/AttandanceTable';
import ContinuousModal from './Component/ContinuousModal';
import RankModal from './Component/RankModal';
import PointModal from './Component/PointModal';
import NavigationLayout from './Component/NavigationLayout';

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
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000; //현재 시간의 UTC 시간
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000; //UTC 시간과 KST 시간 차(밀리초)
    const date = dayjs(utc + KR_TIME_DIFF); //항상 현재 시간이 한국 시간 기준으로 측정되도록
    attendanceAPI
      .getAttendInfo({
        date: date.format(dateFormat),
        token: member.token,
      })
      .then((data) => {
        if (data.success) setAttendInfo(data.data);
      });
  }, [member]);

  return (
    <AuthUser>
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
                  ? `개근 ${attendInfo.continuousDay}일차`
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
            <PointModal ref={pointModalRef} attendInfo={attendInfo} />
          </div>
          <div className="container py-6">
            <AttandanceTable attendLogList={attendLogList} />
          </div>
        </NavigationLayout>
      </div>
    </AuthUser>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};
export default connect(mapStateToProps)(Attandance);
