import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { dates, users } from './testdata';
import useWindowDimensions from './WindowDimensions';
import {
  gridAll,
  gridDate,
  gridUser,
  gridAttend,
  gridGis,
} from './datesClassname';

const TableContent = ({ member }) => {
  const { height, width } = useWindowDimensions();
  const [size, setSize] = useState(0);
  useEffect(() => {
    setSize(dates.length + 1);
  }, []);
  return (
    <div className="relative rounded-xl overflow-auto w-full">
      <div className="overflow-hidden">
        <div className={gridAll[size]}>
          <div className="row-start-[1] col-start-[1] bg-violet-100 sticky left-0 flex items-center justify-center">
            기수
          </div>
          <div className="row-start-[1] col-start-[2] bg-violet-100 sticky left-[40px] flex items-center justify-center">
            이름
          </div>
          {dates.map((date, idx) => (
            <div key={idx} className={gridDate[idx + 3]}>
              {width < 640 ? date.substr(5) : date}
            </div>
          ))}
          {users.map((user, idx) => (
            <div className={gridGis[idx + 2]} key={idx}>
              {user.gis}
            </div>
          ))}
          {users.map((user, idx) => (
            <div className={gridUser[idx + 2]} key={idx}>
              {user.name}
            </div>
          ))}
          {users.map((user, idx) =>
            user.attend.map((atten, idx2) => (
              <div className={gridAttend[idx + 2][idx2 + 2]} key={idx2}>
                {atten}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { member: state.member };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContent);
