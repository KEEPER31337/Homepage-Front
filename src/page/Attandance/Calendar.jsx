import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function Calendar() {
  // TODO: prev/next month
  // TODO: 출석
  const dayOfWeeks = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
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
  const calendar = getCalendar();

  const header = dayOfWeeks.map((dayOfWeek, index) => (
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
            {day == now.date() ? (
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
                October 2021
              </h1>
              <div className="flex items-center text-gray-800 dark:text-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler ml-3 icon-tabler-chevron-right"
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
              </div>
            </div>
            <div className="flex items-center justify-between pt-12 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>{header}</tr>
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
