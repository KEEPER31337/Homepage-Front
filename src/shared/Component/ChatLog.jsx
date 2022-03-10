/* This example requires Tailwind CSS v2.0+ */

import imgMember from 'assets/img/member.svg';
import imgMemberCircle from 'assets/img/memberCircle.svg';
import { Fragment } from 'react';

export default function ChatLog({ chatLogList }) {
  return (
    <div className="h-[60vh] sm:h-96 w-full max-h-full overflow-y-scroll">
      <ul role="list" className="divide-y divide-gray-200">
        {chatLogList.map((chatLog, index) => (
          <div key={index} className="w-full flex space-x-3 p-3">
            <div>
              <img
                className="h-6 w-6 rounded-full"
                src={
                  chatLog.profileImage ? chatLog.profileImage : imgMemberCircle
                }
                alt=""
              />
              <div>{chatLog.userName}</div>
            </div>
            <div className="w-full">
              <div className="max-w-full w-fit rounded-md text-sm py-1 px-2 break-all bg-blue-50 text-black">
                {chatLog.msg}
              </div>
              <div className="text-right text-xs text-gray-400">
                {chatLog.time}
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
