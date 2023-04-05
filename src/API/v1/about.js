import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function tmp({
  id,
  subtitle,
  staticWriteTitleId,
  displayOrder,
  ipAddress,
  token,
  thumbnail,
}) {
  const formData = new FormData();
  formData.append('subtitle', subtitle);
  formData.append('staticWriteTitleId', staticWriteTitleId);
  formData.append('displayOrder', displayOrder);
  formData.append('ipAddress', ipAddress);
  formData.append('thumbnail', thumbnail);

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `${token}`,
    },
  };

  try {
    const response = await axios.put(
      API_URL + '/v1/admin/about/sub-title/modify/' + id,
      formData,
      config
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function changeTitle({ id, title, type, token }) {
  const options = {
    method: 'PUT',
    url: API_URL + '/v1/admin/about/titles/' + id,
    headers: {
      Authorization: token,
    },
    data: { title , type },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function getInfo( {type}) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/about/titles/types/' + type,
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export default {
  getInfo,
  changeTitle,
  tmp,
};
