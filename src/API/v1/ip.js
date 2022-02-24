import axios from 'axios';

const URL = 'https://geolocation-db.com/json/';

async function getIp() {
  try {
    const response = await axios.get(URL);
    console.log('res', response);
    return response.data.IPv4;
  } catch (error) {
    return error.response.data;
  }
}

export default { getIp };
