import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 세미나 목록 조회
async function getSeminarList({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/seminars',
    headers: {
        Authorization: token,
        }
    };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}


// 세미나 날짜로 조회
async function getSeminarByDate({ token, searchDate }) {
  const options = {
    method: 'GET',
    url: API_URL + `/v1/clerk/seminars/search/ongoing?searchDate=${searchDate}`,
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

//세미나 생성
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

  //세미나 삭제
  async function deleteSeminar({ seminarId, token }) {
    const options = {
      method: 'DELETE',
      url: API_URL + '/v1/admin/clerk/seminars/79',
      data: {
        seminarId,
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
  
// 세미나 출석상태 목록 조회
async function getSeminarAttendList({ token }) {
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
async function getEverySeminarAttendList({ token, page, size, seasonStartDate, seasonEndDate }) {
    const options = {
      method: 'GET',
      url: API_URL + `/v1/admin/clerk/seminars/attendances?page=${page}&size=${size}&seasonStartDate=${seasonStartDate}&seasonEndDate=${seasonEndDate}`,
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
async function getTheSeminarAttendList({ token, seminarId }) {
    const options = {
      method: 'GET',
      url: API_URL + `/v1/admin/clerk/seminars/${seminarId}/attendances`,
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

  //세미나 출석시작
async function startSeminarAttend({ seminarId, attendanceCloseTime, latenessCloseTime, token }) {
    const options = {
      method: 'PATCH',
      url: API_URL + '/v1/admin/clerk/seminars/attendances/start',
      data: {
        seminarId, 
        attendanceCloseTime, 
        latenessCloseTime,
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

  //세미나 출석수정
  async function editSeminarAttend({ attendanceId, seminarAttendanceStatusId, absenceExcuse, token }) {
    const options = {
      method: 'PATCH',
      url: API_URL + `/v1/admin/clerk/seminars/attendances/${attendanceId}`,
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

export default {
    getSeminarList,
    getSeminarByDate,
    createSeminar,
    deleteSeminar,
    getSeminarAttendList,
    getEverySeminarAttendList,
    getTheSeminarAttendList,
    startSeminarAttend,
    editSeminarAttend,
  };