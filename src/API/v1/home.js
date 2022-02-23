import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function getTrends() {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/best',
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function getLatests() {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/latest?page=0&size=10',
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function downloadFile({ fileId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/download/' + fileId,
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export default {
  getTrends,
  getLatests,
  downloadFile,
};
