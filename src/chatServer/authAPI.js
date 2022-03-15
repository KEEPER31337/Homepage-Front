const axios = require('axios');
require('dotenv').config();

const API_URL = process.env.REACT_APP_API_URL;
async function getAuth({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/members',
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

module.exports = { getAuth };
