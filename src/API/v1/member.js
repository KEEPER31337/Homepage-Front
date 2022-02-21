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

async function updateEmail({ emailAddress, authCode, token }) {
  const options = {
    method: 'PUT',
    url: API_URL + '/v1/member/update/email',
    headers: {
      Authorization: token,
    },
    data: { emailAddress, authCode },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
  

async function updateProfile({realName, nickName, studentId, token}) {
  const options = {
    method: 'PUT',
    url: API_URL + '/v1/member/update/profile',
    headers: {
      Authorization: token,
    },
    data: { realName, nickName, studentId },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
}

async function changePassword({password, token}) {
  console.log({password, token})
  const options = {
    method: 'POST',
    url: API_URL + '/v1/signin/change-password',
 
    data: {
      password,
    },
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
};
