import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function getIntroInfo() {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/about/title/type/intro',
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function getActivityInfo() {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/about/title/type/activity',
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function getExcellenceInfo() {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/about/title/type/excellence',
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function getHistoryInfo() {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/about/title/type/history',
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export default {
  getIntroInfo,
  getActivityInfo,
  getExcellenceInfo,
  getHistoryInfo,
};
