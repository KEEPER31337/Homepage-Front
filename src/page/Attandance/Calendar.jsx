import React, { useEffect } from 'react';

const dayOfWeeks = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const today = 5;
const weekDays = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31],
];

// TODO : 오늘 날짜 가져오기
// TODO : 이달의 최대 날짜 가져오기
// TODO : 요일 맞추기

export default function Calendar() {
  const header = dayOfWeeks.map((dayOfWeek, index) => (
    <th key={index}>
      <div className="w-full flex justify-center">
        <p className="text-md font-medium text-center text-gray-800 dark:text-gray-100">
          {dayOfWeek}
        </p>
      </div>
    </th>
  ));

  const jsxweekDays = weekDays.map((week) => {
    return (
      <tr key={week}>
        {week.map((day) => (
          <td key={day}>
            {day == today ? (
              <div className="w-full h-full">
                <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                  <p className="text-md w-14 h-14 flex items-center justify-center font-medium text-white bg-mainYellow rounded-full">
                    {day}
                  </p>
                </div>
              </div>
            ) : (
              <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                <p className="text-md text-gray-500 dark:text-gray-100 font-medium">
                  {day}
                </p>
              </div>
            )}
          </td>
        ))}
      </tr>
    );
  });

  return (
    <>
      <div className="flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-lg shadow-lg rounded-lg">
          <div className="md:p-12 md:pb-12 p-5 dark:bg-gray-800 bg-white rounded-lg">
            <div className="px-4 flex items-center justify-between ">
              <h1 className="text-md font-bold dark:text-gray-100 text-gray-800">
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
                <tbody>{jsxweekDays}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
