import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

// API
import attendanceAPI from 'API/v1/attendance';

const dateFormat = 'YYYY-MM-DD';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const dayOfWeeks = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const Calendar = ({ member }) => {
  // TODO: 출석
  const [now, setNow] = useState(dayjs());
  const [firstDay, setFirstDay] = useState(now.startOf('month'));
  const [lastDay, setLastDay] = useState(now.endOf('month'));
  const [attendDateList, setAttendDateList] = useState([]);

  const checkRange = (date) => {
    return firstDay <= date && date <= lastDay;
  };

  const getCalendar = () => {
    // NOTE : Need to refactoring
    const calendar = [];
    let dayOfWeek = firstDay.day();
    let theDate = firstDay;

    theDate = theDate.date(theDate.date() - dayOfWeek - 1);
    while (true) {
      calendar.push(
        Array(7)
          .fill(1)
          .map((first, index) => {
            theDate = theDate.date(theDate.date() + 1);
            return theDate;
          })
      );
      if (theDate > lastDay) break;
    }
    return calendar;
  };

  const goPrevMonth = () => {
    const updateDay = firstDay.month(firstDay.month() - 1);
    setFirstDay(updateDay.startOf('month'));
    setLastDay(updateDay.endOf('month'));
  };

  const goNextMonth = () => {
    const updateDay = firstDay.month(firstDay.month() + 1);
    setFirstDay(updateDay.startOf('month'));
    setLastDay(updateDay.endOf('month'));
  };

  const calendar = getCalendar();

  const jsxHeader = dayOfWeeks.map((dayOfWeek, index) => (
    <th key={index}>
      <div className="w-full flex justify-center">
        <p className="text-lg font-medium text-center">{dayOfWeek}</p>
      </div>
    </th>
  ));

  const jsxCalendar = calendar.map((week, index) => {
    return (
      <tr key={(week, index)}>
        {week.map((date, index) => {
          return (
            <td key={(date, index)}>
              {
                <div className="w-full h-full">
                  <div className="flex items-center justify-center w-full rounded-full">
                    <p
                      className={`w-10 h-10 sm:w-14 sm:h-14 text-sm sm:text-lg flex items-center justify-center font-medium ${
                        date.format(dateFormat) === now.format(dateFormat) &&
                        checkRange(date)
                          ? 'ring ring-mainYellow'
                          : ''
                      } ${
                        attendDateList.includes(date.format(dateFormat)) &&
                        checkRange(date)
                          ? 'bg-green-500 text-white'
                          : ''
                      } rounded-full`}
                    >
                      {checkRange(date) ? date.date() : ''}
                    </p>
                  </div>
                </div>
              }
            </td>
          );
        })}
      </tr>
    );
  });

  useEffect(() => {
    attendanceAPI
      .getAttendDate({
        startDate: firstDay.format(dateFormat),
        endDate: lastDay.add(1, 'day').format(dateFormat),
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          // NOTE : backend에서 날짜만 파싱해서 주기로 했는데
          const dateList = data.list.map((strDate) =>
            dayjs(strDate).format(dateFormat)
          );
          setAttendDateList(dateList);
        }
      });
  }, [member, firstDay, lastDay]);

  return (
    <>
      <div className="flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-2xl shadow-lg rounded-lg">
          <div className="md:p-12 md:pb-12 p-5 dark:bg-gray-800 bg-white rounded-lg">
            <div className="px-4 flex items-center justify-between ">
              <h1 className="text-lg font-bold dark:text-gray-100 text-gray-800">
                {firstDay.year()}년 {firstDay.month() + 1}월
              </h1>
              <div className="flex items-center text-gray-800 dark:text-gray-100">
                <button
                  className="rounded-md hover:ring-2 hover:ring-mainYellow"
                  onClick={goPrevMonth}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left m-1"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                </button>
                <button
                  className="rounded-md hover:ring-2 hover:ring-mainYellow"
                  onClick={goNextMonth}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-right m-1"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-12 overflow-x-auto text-gray-800 dark:text-gray-100">
              <table className="w-full">
                <thead>
                  <tr>{jsxHeader}</tr>
                </thead>
                <tbody>{jsxCalendar}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Calendar);
