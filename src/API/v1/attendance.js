import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function check({ ipAddress, greetings, token }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/attend/check',
    data: {
      ipAddress,
      greetings,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function updateMessage({ greetings, token }) {
  const options = {
    method: 'PATCH',
    url: API_URL + '/v1/attend',
    data: {
      greetings,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function getAttendDate({ startDate, endDate, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/attend/date',
    params: {
      startDate,
      endDate,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function getAttendInfo({ date, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/attend/info',
    params: {
      date,
    },
    headers: {
      Authorization: `Bearer ${token}`,
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
  check,
  updateMessage,
  getAttendDate,
  getAttendInfo,
};
