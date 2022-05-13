import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import Modal from 'react-awesome-modal';
import Button from '@material-ui/core/Button';

const dayOfWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dateFormat = 'YYYY-MM-DD';

const information = [
  {
    id: '1',
    date: '2022-05-18',
    text: 'bbbb',
    content: 'bbbb가 일어난다!',
  },
  {
    id: '2',
    date: '2022-05-18',
    text: 'aaaa',
    content: 'aaaa가 일어난다!',
  },
  {
    id: '3',
    date: '2022-05-21',
    text: 'cccc',
    content: 'cccc가 일어난다!',
  },
];
var id = 4;
const Calendar = ({ member }) => {
  const [titleText, setTitleText] = useState('');
  const [timeText, setTimeText] = useState('');
  const [inputText, setInputText] = useState('');

  const [firstDay, setFirstDay] = useState(dayjs().startOf('month'));
  const [lastDay, setLastDay] = useState(dayjs().endOf('month'));
  const [adderVisible, setAdderVisible] = useState(false);

  const [statusContent, setContentVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  const checkRange = (date) => {
    return firstDay <= date && date <= lastDay;
  };

  const _openAdderModal = function () {
    setAdderVisible(true);
  };

  const _closeAdderModal = function () {
    information.push({
      id: id,
      date: timeText,
      text: titleText,
      content: inputText,
    });
    id++;
    setTitleText('');
    setTimeText('');
    setInputText('');
    setAdderVisible(false);
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

  const openModal = (id) => {
    const sched = information.filter((info) => {
      if (info.id === id) {
        return info;
      }
    });

    setTitle(sched[0].text);
    setContent(sched[0].content);
    setDate(sched[0].date);
    setContentVisible(true);
  };

  const closeModal = () => {
    setContentVisible(false);
  };

  const CheckContent = (date) => {
    const filter = information.filter(
      (info) => info.date === date.format(dateFormat)
    );
    return (
      <div>
        {filter.map((info) => (
          <div>
            <button onClick={() => openModal(info.id)}>{info.text}</button>
          </div>
        ))}
      </div>
    );
  };

  const jsxCalendar = calendar.map((week, index) => {
    return (
      <tr key={(week, index)}>
        {week.map((date, index) => (
          <td key={(date, index)}>
            {
              <div className="w-full h-full">
                <div
                  className={`flex flex-col-reverse items-start justify-end w-full h-32 border-2 border-black ${
                    date.format(dateFormat) === dayjs().format(dateFormat)
                      ? 'bg-amber-100'
                      : ''
                  }`}
                >
                  {CheckContent(date)}
                  <div className=""></div>

                  <p className="text-sm w-full flex pr-3 justify-end font-medium border-2 border-rd">
                    {checkRange(date) ? date.date() : ''}
                  </p>
                </div>
              </div>
            }
          </td>
        ))}
      </tr>
    );
  });

  const onTitleChange = (e) => {
    setTitleText(e.target.value);
  };

  const onTimeChange = (e) => {
    setTimeText(e.target.value);
  };

  const onInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="w-5/6 shadow-lg rounded-lg">
        <div className="p-3 dark:bg-gray-800 bg-white rounded-lg">
          <div className="px-4 flex items-center justify-between ">
            <h1 className="text-lg font-bold dark:text-gray-100 text-gray-800">
              {firstDay.year()}년 {firstDay.month() + 1}월
            </h1>
            <div className="flex items-center text-gray-800 dark:text-gray-100">
              <button
                className="mr-4 p-2 rounded-md hover:ring-2 hover:ring-mainYellow hover:bg-white bg-mainYellow shadow-lg"
                onClick={() => _openAdderModal()}
              >
                일정추가
              </button>
              <Modal
                visible={adderVisible}
                width="600"
                height="400"
                effect="fadeInDown"
                onClickAway={() => _closeAdderModal()}
              >
                <div className="m-5 p-3 flex flex-col items-center text-center">
                  <strong className="m-2">일정 추가</strong>
                  <div className="m-5 p-3 flex flex-col items-center text-center">
                    <textarea
                      className="m-2"
                      value={titleText}
                      onChange={onTitleChange}
                      rows={1}
                      cols={20}
                    />

                    <input
                      type="date"
                      id="start"
                      name="trip-start"
                      label="Next appointment"
                      value={timeText}
                      onChange={onTimeChange}
                    ></input>

                    <textarea
                      className="m-2"
                      value={inputText}
                      onChange={onInputChange}
                      rows={5}
                      cols={50}
                    />

                    <Button
                      className="m-2"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        if (!timeText) {
                          window.alert('날짜를 선택해주세요!😗');
                        } else if (!inputText) {
                          window.alert('일정을 입력해주세요!🤨');
                        } else {
                          _closeAdderModal();
                        }
                      }}
                    >
                      추가하기
                    </Button>
                  </div>
                </div>
              </Modal>

              <Modal
                visible={statusContent}
                width="600"
                height="400"
                effect="fadeInDown"
                onClickAway={() => closeModal()}
              >
                <div className="m-5 p-3 flex flex-col items-center text-center">
                  <strong className="m-2">{title}</strong>
                  <div className="m-5 p-3 flex flex-col items-center text-center">
                    <div className="mb-5 p-3 flex flex-col items-center text-center">
                      {date}
                      <br />
                      {content}
                    </div>
                    <Button
                      className="m-2"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      완료!
                    </Button>
                  </div>
                </div>
              </Modal>

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
              {/* 지난 달로 가는 화살표 */}
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
              {/* 다음 달로 가는 화살표 */}
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 overflow-x-auto text-gray-800 dark:text-gray-100">
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
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Calendar);
