import React from 'react';
import CircularGauge from '../CircularGauge';
import Group from '../Group';
import InfoBtn from '../InfoBtn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileFrame = ({
  renderHeadLeft,
  renderHead,
  renderBody,
  renderFooter,
  profileBtns,
  user,
  memberInfo,
}) => {
  const defaultHeadLeft = () => (
    <div className="pr-2 w-4/12 object-contain">
      <img className="w-full h-full rounded-2xl" src={user.img} />
    </div>
  );

  const defaultHead = () => (
    <div className="w-full h-[28.3vh] mb-3">
      <div className="px-10 pt-10 pb-7 w-full h-full flex float-left">
        {renderHeadLeft != null ? renderHeadLeft() : defaultHeadLeft()}
        {/*profile head info*/}
        <div className="pt-3 w-full h-full ">
          <div className="pl-3 h-1/5 text-left text-4xl flex-row">
            <div className="flex align-bottom justify-items-center">
              <div className="mr-5 dark:text-pointYellow">
                {memberInfo.nickName}
              </div>
              {/*profile Btn type rank job*/}
              {memberInfo.rank ? (
                <div className="mr-2">
                  <Group groupName={memberInfo.rank} />
                </div>
              ) : (
                <></>
              )}
              {memberInfo.type ? (
                <div className="mr-2">
                  <Group groupName={memberInfo.type} />
                </div>
              ) : (
                <></>
              )}
              {memberInfo.jobs ? (
                memberInfo.jobs.map((job) => (
                  <div className="mr-2">
                    <Group groupName={job} />
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="pl-3 mt-3 text-left text-lg h-1/5 dark:text-mainYellow">
            {memberInfo.emailAddress}
          </div>
          <div className="h-[25%]" />
          {/*profile Btn*/}
          <div className="w-2/4 h-[25%]">
            {profileBtns.map((btn) => (
              <InfoBtn btn={btn} />
            ))}
          </div>
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
      <div className="mx-auto w-[900px] bg-mainWhite dark:bg-darkPoint rounded-3xl shadow-2xl overflow-auto">
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
