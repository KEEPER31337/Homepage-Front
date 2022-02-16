import React, { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';

// API
import attendanceAPI from 'API/v1/attendance';
// local
import EditModal from './EditModal';
import iconPencilAlt from 'assets/img/icons/pecil-alt.svg';

const dateFormat = 'YYYY-MM-DD';
const headers = ['이름', '메세지', '개근', '등수'];

const AttandanceTable = ({ member }) => {
  // TODO : useMemo (message 업데이트시 한 row만 rerendering 하도록)
  const editModalRef = useRef({});
  const [attendLogList, setAttendLogList] = useState([]);
  const [reload, setReload] = useState(false);

  const handleUpdateMessage = (greetings) => {
    attendanceAPI
      .updateMessage({ greetings, token: member.token })
      .then((data) => {
        if (data.success) setReload(!reload);
        // TODO : 성공/실패 알림
      });
  };

  useEffect(() => {
    const date = dayjs();
    attendanceAPI
      .getAttendAll({
        date: date.format(dateFormat),
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setAttendLogList(data.list);
        } else console.log(data);
      });
  }, [member, reload]);

  return (
    <div className="min-w-full flex flex-col">
      <div className="min-w-full overflow-x-auto">
        <div className="align-middle inline-block min-w-full sm:px-0 lg:px-8">
          <div className="shadow overflow-hidden sm:rounded-lg border-b border-gray-200 dark:border-darkPoint">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-gray-500 dark:bg-darkPoint dark:text-mainYellow">
                <tr>
                  {/* NOTE : backend reponse refactoring 요청 예정 */}
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y bg-white divide-gray-200 dark:bg-darkComponent dark:divide-darkPoint">
                {attendLogList.map((log, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={
                              log.memberId?.thumbnail
                                ? log.memberId.thumbnail
                                : 'https://avatars.githubusercontent.com/u/23546441?s=400&u=db7abf2929e5518c12189034dc3fed9bda94f0a6&v=4'
                            }
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-xl font-medium text-gray-900 dark:text-mainWhite">
                            {log.memberId.nickName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="w-xl px-6 py-4 whitespace-nowrap">
                      <div className="text-md text-gray-900 dark:text-mainWhite">
                        {log.greetings}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {log.continousDay ? `${log.continousDay}일째 개근` : ''}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-500">
                      <span className="px-2 inline-flex text-xl leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {log.rank ? `${log.rank}등` : ''}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xl font-medium">
                      <button
                        className="text-mainYellow hover:text-pointYellow"
                        onClick={() => editModalRef.current.open()}
                      >
                        <img className="w-6" src={iconPencilAlt} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <EditModal ref={editModalRef} handleUpdateMessage={handleUpdateMessage} />
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};
export default connect(mapStateToProps)(AttandanceTable);
