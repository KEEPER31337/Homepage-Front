import React, { memo } from 'react';
import { connect } from 'react-redux';

// local
import SimpleNotification from 'shared/SimpleNotification';
import iconPencilAlt from 'assets/img/icons/pecil-alt.svg';
import imgMemberCircle from 'assets/img/memberCircle.svg';

const LogRow = ({ log, editModalRef, member }) => {
  const handleErrorImg = (e) => {
    e.target.src = imgMemberCircle;
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white">
            <img
              className="h-10 w-10 rounded-full"
              src={log.thumbnailPath ? log.thumbnailPath : imgMemberCircle}
              onError={handleErrorImg}
            />
          </div>
          <div className="ml-4">
            <div className="text-xl font-medium text-gray-900 dark:text-mainWhite">
              {log.nickName}
            </div>
          </div>
        </div>
      </td>
      <td className="hidden md:block w-xl px-6 py-4 whitespace-nowrap">
        <div className="max-w-[250px] whitespace-normal break-all text-clip text-md text-gray-900 dark:text-mainWhite">
          {log.greetings}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex break-words text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {log.continuousDay ? `${log.continuousDay}일째 개근` : ''}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-500">
        <span className="px-2 inline-flex text-xl leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {log.rank ? `${log.rank}등` : ''}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-xl font-medium">
        {log.memberId === member.memberInfo.id ? (
          <button
            className="text-mainYellow hover:text-pointYellow"
            onClick={() => editModalRef.current.open()}
          >
            <img className="w-6" src={iconPencilAlt} />
          </button>
        ) : null}
      </td>
    </tr>
  );
};

const equal = (prevProps, nextProps) => {
  return prevProps.log?.greetings === nextProps.log?.greetings;
};

export default memo(LogRow, equal);
