import React from 'react';
import CircularGauge from '../CircularGauge';
import Group from '../Group';
import InfoBtn from '../InfoBtn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileFrame = ({
  renderHeadLeft,
  renderHeadRight,
  renderHead,
  renderBody,
  renderFooter,
  profileBtns,
  user,
  memberInfo,
}) => {
  const defaultHeadLeft = () => (
    <div className="pr-2 w-3/12 object-cover">
      <img className="w-full h-full rounded-2xl" src={user.img} />
    </div>
  );

  const defaultHeadRight = () => (
    <div className="w-full h-3/4 pt-3">
      <div className="w-full h-full bg-divisionGray dark:bg-darkComponent dark:text-mainWhite rounded-2xl overflow-y-scroll scrollbar-hide">
        {/*profile type*/}
        {memberInfo.rank ? <Group groupName={memberInfo.rank} /> : <></>}
        {memberInfo.type ? <Group groupName={memberInfo.type} /> : <></>}
        {memberInfo.jobs ? (
          memberInfo.jobs.map((job) => <Group groupName={job} />)
        ) : (
          <></>
        )}
      </div>
    </div>
  );

  const defaultHead = () => (
    <div className="w-full h-[28.3vh] mb-3">
      <div className="px-10 pt-10 pb-7 w-full h-full flex float-left">
        {renderHeadLeft != null ? renderHeadLeft() : defaultHeadLeft()}
        {/*profile head info*/}
        <div className="pt-3 w-5/12 h-full">
          <div className="text-left text-4xl h-1/5 dark:text-pointYellow">
            {user.name}
          </div>
          <div className="mt-3 text-left text-lg h-1/5 dark:text-mainYellow">
            {memberInfo.nickName + ' ' + memberInfo.emailAddress}
          </div>
        </div>
        {/*profile Btn type rank job*/}
        <div className="w-4/12 pl-5">
          {/*profile Btn*/}
          <div className="w-full h-1/4 flex justify-end items-end">
            {profileBtns.map((btn) => (
              <InfoBtn btn={btn} />
            ))}
          </div>
          {renderHeadRight != null ? renderHeadRight() : defaultHeadRight()}
        </div>
      </div>
    </div>
  );
  const defaultBody = () => <></>;
  const defaultFooter = () => (
    <footer className="w-full h-[50px]">
      <div className="text-center dark:text-mainWhite"></div>
    </footer>
  );

  return (
    <div className="bg-mainWhite dark:bg-mainBlack pt-20 overflow-auto min-h-screen">
      <div className="mx-auto w-[900px] bg-backGray dark:bg-darkPoint rounded-3xl shadow-2xl overflow-auto">
        {renderHead != null ? renderHead() : defaultHead()}
        {renderBody != null ? renderBody() : defaultBody()}
      </div>
      {renderFooter != null ? renderFooter() : defaultFooter()}
    </div>
  );
};

ProfileFrame.prototype = {
  renderHeadLeft: PropTypes.func,
  renderHeadRight: PropTypes.func,
  renderHead: PropTypes.func,
  renderBody: PropTypes.func,
  renderFooter: PropTypes.func,
  profileBtns: PropTypes.array,
  user: PropTypes.object.isRequired,
};

ProfileFrame.defaultProps = {
  renderHeadLeft: null,
  renderHeadRight: null,
  renderHead: null,
  renderBody: null,
  renderFooter: null,
  profileBtns: [],
};

export default ProfileFrame;
