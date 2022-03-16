import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function getAuthorization({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/auth',
    headers: {
      Authorization: `${token}`,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function getImage({ fileId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/util/image/' + fileId,
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function getThumbnail({ thumbnailId }) {
  const url = API_URL + '/v1/util/thumbnail/' + thumbnailId;
  const options = {
    responseType: 'blob',
  };
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export default { getImage, getThumbnail, getAuthorization };
