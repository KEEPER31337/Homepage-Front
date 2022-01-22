import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

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

export default function Calendar() {
  // TODO: 출석
  const [now, setNow] = useState(dayjs());
  const [firstDay, setFirstDay] = useState(now.startOf('month'));
  const [lastDay, setLastDay] = useState(now.endOf('month'));

  const checkRange = (day) => {
    return 1 <= day && day <= lastDay.date();
  };

  const getCalendar = () => {
    // NOTE : Need to refactoring
    const calendar = [];
    let day = -firstDay.day();
    while (true) {
      calendar.push(
        Array(7)
          .fill(1)
          .map((first, index) => {
            day++;
            if (checkRange(day)) return day;
            return '';
          })
      );
      if (day > lastDay.date()) break;
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
        <p className="text-lg font-medium text-center text-gray-800 dark:text-gray-100">
          {dayOfWeek}
        </p>
      </div>
    </th>
  ));

  const jsxCalendar = calendar.map((week, index) => {
    return (
      <tr key={(week, index)}>
        {week.map((day, index) => (
          <td key={(day, index)}>
            {day === now.date() && firstDay.month() === now.month() ? (
              <div className="w-full h-full">
                <div className="flex items-center justify-center w-full rounded-full">
                  <p className="text-lg w-14 h-14 flex items-center justify-center font-medium text-white bg-mainYellow rounded-full">
                    {day}
                  </p>
                </div>
              </div>
            ) : (
              <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                  {day}
                </p>
              </div>
            )}
          </td>
        ))}
      </tr>
    );
  });

  useEffect(() => {}, []);

  return (
    <>
      <div className="flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-2xl shadow-lg rounded-lg">
          <div className="md:p-12 md:pb-12 p-5 dark:bg-gray-800 bg-white rounded-lg">
            <div className="px-4 flex items-center justify-between ">
              <h1 className="text-lg font-bold dark:text-gray-100 text-gray-800">
                {months[firstDay.month()]} {firstDay.year()}
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
            <div className="flex items-center justify-between pt-12 overflow-x-auto">
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
}
