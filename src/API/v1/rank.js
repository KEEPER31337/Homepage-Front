import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function getRank({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/rank',
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

export default { getRank };
