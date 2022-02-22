import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function getMember({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/member',
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

async function getMembers({ token }) {
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

async function updateEmail(token, data) {
  const options = {
    method: 'PUT',
    url: API_URL + '/v1/member/update/email',
    data: data,
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
}

async function updateProfile(token, data) {
  const options = {
    method: 'PUT',
    url: API_URL + '/v1/member/update/profile',
    data: data,
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
}

async function changePassword(token, data) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/signin/change-password',
    data: data,
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
}

async function getOtherById(token, id) {
  const options = {
    method: 'GET',
    url: API_URL + `/v1/member/other-id/${id}`,
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
}

async function deleteMember(token, password) {
  const options = {
    method: 'GET',
    url: API_URL + `/v1/member/delete`,
    params: { password: password },
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
}

export default {
  getMember,
  getMembers,
  updateEmail,
  updateProfile,
  changePassword,
  getOtherById,
  deleteMember,
};
