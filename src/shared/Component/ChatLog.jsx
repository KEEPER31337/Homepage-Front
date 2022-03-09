/* This example requires Tailwind CSS v2.0+ */

import imgMember from 'assets/img/member.svg';
import imgMemberCircle from 'assets/img/memberCircle.svg';

export default function ChatLog({ chatLogList }) {
  return (
    <div className="h-96 overflow-y-scroll">
      <ul role="list" className="divide-y divide-gray-200">
        {chatLogList.map((chatLog, index) => (
          <li key={index} className="p-4">
            <div className="flex space-x-3">
              <img
                className="h-6 w-6 rounded-full"
                src={
                  chatLog.profileImage ? chatLog.profileImage : imgMemberCircle
                }
                alt=""
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{chatLog.userName}</h3>
                  <p className="text-sm text-gray-500">{chatLog.time}</p>
                </div>
                <p className="text-sm text-gray-500">{chatLog.msg}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
