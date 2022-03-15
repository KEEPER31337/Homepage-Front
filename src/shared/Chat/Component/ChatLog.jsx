import { Fragment } from 'react';

// local
import imgMemberCircle from 'assets/img/memberCircle.svg';
import { connect } from 'react-redux';

const API_URL = process.env.REACT_APP_API_URL;

const ChatLog = ({ chatLogList, member }) => {
  return (
    <div className="h-[60vh] sm:h-96 w-full max-h-full overflow-y-scroll">
      <ul role="list" className="">
        {chatLogList.map((chatLog, index) => (
          <Fragment key={index}>
            {member.memberInfo.id === chatLog.member.id ? (
              <div
                key={index}
                className="w-full flex justify-items-center space-x-3 p-3"
              >
                <div className="w-full flex flex-col">
                  <div className="max-w-full self-end w-fit rounded-md text-sm py-1 px-2 break-all bg-green-300 dark:bg-green-400 text-black">
                    {chatLog.msg}
                  </div>
                  <div className="text-right text-xs text-gray-400">
                    {chatLog.time}
                  </div>
                </div>
              </div>
            ) : (
              <div key={index} className="w-full flex space-x-3 p-3">
                <div>
                  <img
                    className="h-6 w-6 rounded-full"
                    src={
                      chatLog.member.thumbnailPath
                        ? API_URL + chatLog.member.thumbnailPath
                        : imgMemberCircle
                    }
                    alt=""
                  />
                  <div className="w-15 truncate ...">
                    {chatLog.member.nickName}
                  </div>
                </div>
                <div className="w-full">
                  <div className="max-w-full w-fit rounded-md text-sm py-1 px-2 break-all bg-amber-300 dark:bg-mainYellow text-black">
                    {chatLog.msg}
                  </div>
                  <div className="text-right text-xs text-gray-400">
                    {chatLog.time}
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { member: state.member };
};
export default connect(mapStateToProps)(ChatLog);
