import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// ROLE목록 불러오기
async function getRoleList({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/sysadmin/jobs',
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
async function getRoleMemberList({ token, jobId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/members/jobs/' + jobId,
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
async function getAllRoleMemberList({ token, jobId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/sysadmin/jobs/members',
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
    url: API_URL + '/v1/admin/clerk/members/' + memberId + '/jobs',
    headers: {
      Authorization: token,
    },
    data: {
      jobId: jobId,
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
    url: API_URL + '/v1/admin/clerk/members/' + memberId + '/jobs',
    headers: {
      Authorization: token,
    },
    data: {
      jobId: jobId,
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
async function getTypeMemberList({ token, typeId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/members/types/' + typeId,
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
async function changeType({ token, memberId, typeId }) {
  const options = {
    method: 'PUT',
    url: API_URL + '/v1/admin/clerk/members/' + memberId + '/types/' + typeId,
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
  getRoleList,
  getRoleMemberList,
  getAllRoleMemberList,
  addRole,
  deleteRole,
  getTypeMemberList,
  changeType,
};
