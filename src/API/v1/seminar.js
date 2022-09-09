import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 출석 가능 세미나 조회
async function getSeminar({ token, searchDate }) {
  const options = {
    method: 'GET',
    url: API_URL + `/v1/clerk/seminars/search/ongoing?searchDate=${searchDate}`,
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

//세미나 출석
async function AttendSeminar({ token, seminarId, attendanceCode }) {
    const options = {
      method: 'POST',
      url: API_URL + '/v1/clerk/seminars/attendances/check',
      data: {
        seminarId,
        attendanceCode,
      },
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios(options);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

export default {
    getSeminar,
    AttendSeminar,
  };