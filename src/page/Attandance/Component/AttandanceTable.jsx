import React, { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';

// local
import LogRow from './LogRow';
import EditModal from './EditModal';
import attendanceAPI from 'API/v1/attendance';
import SimpleNotification from 'shared/SimpleNotification';

const dateFormat = 'YYYY-MM-DD';
const headers = ['이름', '메세지', '개근', '등수'];

const AttandanceTable = ({ member }) => {
  // TODO : useMemo (message 업데이트시 한 row만 rerendering 하도록)
  const [attendLogList, setAttendLogList] = useState([]);
  const [reload, setReload] = useState(false);

  const editModalRef = useRef({});
  const successNotiRef = useRef({});
  const failNotiRef = useRef({});

  const handleUpdateMessage = (greetings) => {
    attendanceAPI
      .updateMessage({ greetings, token: member.token })
      .then((data) => {
        if (data.success) {
          setReload(!reload);
          successNotiRef.current.open();
        } else failNotiRef.current.open();
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
        }
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
                  {headers.map((header, index) =>
                    index == 1 ? (
                      <th
                        key={index}
                        scope="col"
                        className="hidden md:block px-6 py-3 text-left text-xl font-medium uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ) : (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    )
                  )}
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y bg-white divide-gray-200 dark:bg-darkComponent dark:divide-darkPoint">
                {attendLogList.map((log, index) => (
                  <LogRow
                    key={index}
                    log={log}
                    editModalRef={editModalRef}
                    member={member}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <EditModal ref={editModalRef} handleUpdateMessage={handleUpdateMessage} />
      <SimpleNotification
        ref={successNotiRef}
        isSuccess={true}
        msg={'출석 메세지가 저장되었습니다.'}
      />
      <SimpleNotification
        ref={failNotiRef}
        isSuccess={false}
        msg={'출석 메세지 저장에 실패하였습니다.'}
      />
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};
export default connect(mapStateToProps)(AttandanceTable);
