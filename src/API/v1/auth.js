import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function signIn() {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/signin',
    data: {
      loginId: 'googy',
      password: 123456,
    },
  };
  try {
    const result = await axios(options);
    return result;
  } catch (error) {
    return error;
  }
}

export { signIn };
