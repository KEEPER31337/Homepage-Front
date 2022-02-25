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

async function updateProfile({ realName, nickName, studentId, token }) {
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

async function changePassword({ password, token }) {
  console.log({ password, token });
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

async function getOtherById({ token, id }) {
  // TODO : API parameter object 형식으로 통일 부탁드립니당.
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

async function deleteMember({ token, password }) {
  const options = {
    method: 'DELETE',
    url: API_URL + '/v1/member/delete',
    params: { password: password },
    headers: {
      Authorization: token,
    },
  };
  console.log(options);
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function getUsersPosts({ token, page, size }) {
  const options = {
    method: 'Get',
    url: API_URL + '/v1/member/post',
    params: { page: page, size: size },
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

async function getUsersTempPosts({ token, page, size }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/member/temp_post',
    params: { page: page, size: size },
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

async function follow({ token, loginId }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/member/follow',
    data: { followeeLoginId: loginId },
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

async function unfollow({ token, loginId }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/member/unfollow',
    data: { followeeLoginId: loginId },
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

async function updateThumbnail({ token, ipAddress, formdata }) {
  const options = {
    method: 'PUT',
    url: API_URL + '/v1/member/update/thumbnail',
    params: { ipAddress },
    data: formdata,
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

async function getPointList({ token, page, size }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/point/lists/log',
    params: { page: page, size: size },
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

export default {
  getMember,
  getMembers,
  updateEmail,
  updateProfile,
  changePassword,
  getOtherById,
  deleteMember,
  getUsersPosts,
  getUsersTempPosts,
  follow,
  unfollow,
  updateThumbnail,
  getPointList,
};
