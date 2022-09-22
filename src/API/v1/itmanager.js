import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// ROLE목록 불러오기
async function getRole({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/system-admin/jobs',
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
// 직업 별 회원 불러오기
async function getRoleMember({ token, jobId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/system-admin/members/jobs/' + jobId,
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

// 모든 직헙 회원 불러오기
async function getAllRoleMember({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/system-admin/jobs/members',
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
// 직책 등록
async function addRole({ token, memberId, jobId }) {
  const options = {
    method: 'POST',
    url:
      API_URL + '/v1/admin/system-admin/members/' + memberId + '/jobs/' + jobId,
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

// 직책

async function deleteRole({ token, memberId, jobId }) {
  const options = {
    method: 'DELETE',
    url:
      API_URL + '/v1/admin/system-admin/members/' + memberId + '/jobs/' + jobId,
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
  getRole,
  getRoleMember,
  getAllRoleMember,
  addRole,
  deleteRole,
};
