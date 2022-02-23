import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const IP_API_URL = 'https://geolocation-db.com/json/';

async function getIp() {
  try {
    const response = await axios.get(IP_API_URL);
    return response.data.IPv4;
  } catch (error) {
    return error.response.data;
  }
}

async function check({ token }) {
  let ip = null;
  try {
    ip = await getIp();
  } catch (error) {
    return error.response.data;
  }
  const options = {
    method: 'POST',
    url: API_URL + '/v1/attend',
    data: {
      ipAddress: ip,
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

async function updateMessage({ greetings, token }) {
  const options = {
    method: 'PATCH',
    url: API_URL + '/v1/attend',
    data: {
      greetings,
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

async function getAttendDate({ startDate, endDate, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/attend/date',
    params: {
      startDate,
      endDate,
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

async function getAttendInfo({ date, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/attend/info',
    params: {
      date,
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

async function getAttendAll({ date, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/attend/all',
    params: {
      date,
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
  check,
  updateMessage,
  getAttendDate,
  getAttendInfo,
  getAttendAll,
};
