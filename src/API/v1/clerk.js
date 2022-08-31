import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

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

// 세미나 목록 조회
async function getSeminarsList({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/seminars',
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

// 세미나 생성
async function createSeminar({ token, openTime }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/admin/clerk/seminars',
    data: {
      openTime,
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

// 세미나 출석 상태 목록 조회
async function getSeminarAttendance({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/seminars/statuses',
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

// 전체 세미나 출석 목록 조회
async function getAllSeminarAttend({ token, page, size }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/seminars/attendances',
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

// 특정 세미나 출석 목록 조회
async function getSomeSeminarAttend({ token, seminarId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/seminars/'+seminarId+'/attendances',
    params: { seminarId: seminarId },
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

//세미나 출석 수정
async function reviseAttend({ token, attendanceId, seminarAttendanceStatusId, absenceExcuse }) {
  const options = {
    method: 'PATCH',
    url: API_URL + '/v1/admin/clerk/seminars/attendances/' + attendanceId,
    data: {
      seminarAttendanceStatusId,
      absenceExcuse,
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

// 최근 세미나 조회
async function getRecentSeminar({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/attendance',
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

// 세미나 출석 조건 조회
async function getAttendConditions({ token, seminarId, attendanceCloseTime, latenessCloseTime }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/attendance/conditions',
    params: { seminarId: seminarId, attendanceCloseTime: attendanceCloseTime, latenessCloseTime: latenessCloseTime },
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
  getTypeMemberList,
  changeType,
  getSeminarsList,
  createSeminar,
  getSeminarAttendance,
  getAllSeminarAttend,
  getSomeSeminarAttend,
  reviseAttend,
  getRecentSeminar,
  getAttendConditions,
};
