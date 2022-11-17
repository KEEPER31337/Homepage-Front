import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function getAllMembers() {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/common/members',
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
async function getMember({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/members/profile',
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
    url: API_URL + '/v1/members/others',
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
    url: API_URL + '/v1/members/email',
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
    url: API_URL + '/v1/members/profile',
    headers: {
      Authorization: token,
    },
    data: { realName, nickName, studentId },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function changePassword({ password, token }) {
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
    return error.response.data;
  }
}

async function getOtherById({ token, id }) {
  // TODO : API parameter object 형식으로 통일 부탁드립니당.
  const options = {
    method: 'GET',
    url: API_URL + `/v1/members/others/${id}`,
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

async function deleteMember({ token, password }) {
  const options = {
    method: 'DELETE',
    url: API_URL + '/v1/members',
    params: { password: password },
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

async function getUsersPosts({ token, page, size }) {
  const options = {
    method: 'Get',
    url: API_URL + '/v1/members/posts',
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
    url: API_URL + '/v1/members/temp_posts',
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

async function follow({ token, id }) {
  const options = {
    method: 'POST',
    url: API_URL + `/v1/members/follow/${id}`,
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

async function unfollow({ token, id }) {
  const options = {
    method: 'DELETE',
    url: API_URL + `/v1/members/unfollow/${id}`,
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

async function updateThumbnail({ token, ipAddress, thumbnail }) {
  const formData = new FormData();
  formData.append('ipAddress', ipAddress);
  formData.append('thumbnail', thumbnail);

  const options = {
    method: 'PUT',
    url: API_URL + '/v1/members/thumbnail',
    data: formData,
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

async function getPointList({ token, page, size }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/points',
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

async function giftPoint({ token, time, point, detail, presentedId }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/points/present',
    data: { time, point, detail, presentedId },
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

async function getUsersFollowee({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/members/followees',
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

async function getUsersFollower({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/members/followers',
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

async function getUsersFollowCnt({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/members/follow-number',
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

async function getOthersPosts({ token, memberId, page, size }) {
  const options = {
    method: 'GET',
    url: `${API_URL}/v1/members/${memberId}/posts`,
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

async function getCommonMembers() {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/common/members',
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
//회원정보 검색
async function searchMember({ token, keyword }) {
  const options = {
    method: 'GET',
    url: API_URL + `/v1/admin/members/ids`,
    params: { keyword: keyword },
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

// 모든 기수
async function getGenerations({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/members/generations',
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
  getAllMembers,
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
  giftPoint,
  getUsersFollowee,
  getUsersFollower,
  getUsersFollowCnt,
  getOthersPosts,
  getCommonMembers,
  searchMember,
  getGenerations,
};
