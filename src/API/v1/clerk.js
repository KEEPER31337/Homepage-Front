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

/**상벌점 페이지 ===================================================================*/
//상벌점 내역 추가
async function addPoint({ token, data }) {
  const url = API_URL + '/v1/admin/clerk/merits';
  const options = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios.post(url, data, options);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

//상벌점 내역 삭제
async function removePoint({ token, meritId }) {
  const options = {
    method: 'DELETE',
    url: API_URL + '/v1/admin/clerk/merits/' + meritId,
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

//회원별 상벌점 누계 조회
async function getPointOfMember({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/merits/total',
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

//연도별 상벌점 내역 조회
async function getPointOfYear({ token, year }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/merits?year=' + year,
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

//상벌점 내역 연도 리스트 조회
async function getPointYearList({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/merits/years',
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

//상벌점 타입 목록 조회
async function getPointType({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/merits/types',
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

//상벌점 타입 추가
async function addPointType({ token, modifyData }) {
  const url = API_URL + '/v1/admin/clerk/merits/types';
  const data = modifyData;
  const options = {
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await axios.post(url, data, options);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

//상벌점 타입 삭제
async function removePointType({ token, typeIds }) {
  const options = {
    method: 'DELETE',
    url: API_URL + '/v1/admin/clerk/merits/types?typeIds=' + typeIds,
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

// 세미나 삭제
async function deleteSeminar({ token, seminarId }) {
  const options = {
    method: 'DELETE',
    url: API_URL + '/v1/admin/clerk/seminars/' + seminarId,
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
async function getAllSeminarAttend({
  token,
  page,
  size,
  seasonStartDate,
  seasonEndDate,
}) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/seminars/attendances',
    params: {
      page: page,
      size: size,
      seasonStartDate: seasonStartDate,
      seasonEndDate: seasonEndDate,
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

// 특정 세미나 출석 목록 조회
async function getSomeSeminarAttend({ token, seminarId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/seminars/' + seminarId + '/attendances',
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
async function reviseAttend({
  token,
  attendanceId,
  seminarAttendanceStatusId,
  absenceExcuse,
}) {
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
async function getAttendConditions({
  token,
  seminarId,
  attendanceCloseTime,
  latenessCloseTime,
}) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/attendance/conditions',
    params: { seminarId, attendanceCloseTime, latenessCloseTime },
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
/**활동 인원 조사 페이지 */

//설문조사 응답
async function researchReply({ token, surveyId, replyId, excuse }) {
  const url = API_URL + '/v1/clerk/surveys/' + surveyId;
  const data = {
    replyId,
    excuse,
  };
  const options = {
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await axios.post(url, data, options);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

//설문 응답 수정
async function researchReplyModify({ token, surveyId, replyId, excuse }) {
  const url = API_URL + '/v1/clerk/surveys/' + surveyId;
  const data = {
    replyId,
    excuse,
  };
  const options = {
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await axios.patch(url, data, options);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

//설문 정보 조회
async function getReply({ token, surveyId, memberId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/clerk/surveys/information/' + surveyId,
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

//공개 상태의 설문 조회(현재 진행중이고 공개상태인 설문 조회)
async function getRunningResearch({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/clerk/surveys/visible/ongoing',
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

//가장 최근에 종료된 설문 조회
async function getLastResearch({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/clerk/surveys/visible/closed',
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

//----이 아래부터 관리자권한-----
//설문조사 개설
async function createResearch({
  token,
  surveyName,
  openTime,
  closeTime,
  description,
  isVisible,
}) {
  const url = API_URL + '/v1/admin/clerk/surveys';
  const data = {
    surveyName,
    openTime,
    closeTime,
    description,
    isVisible,
  };
  const options = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios.post(url, data, options);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

//설문 수정
async function modifyResearch({
  token,
  surveyId,
  surveyName,
  openTime,
  closeTime,
  description,
  isVisible,
}) {
  const url = API_URL + '/v1/admin/clerk/surveys/' + surveyId;
  const data = {
    surveyName,
    openTime,
    closeTime,
    description,
    isVisible,
  };
  const options = {
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await axios.patch(url, data, options);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

//설문조사 삭제
async function removeResearch({ token, surveyId }) {
  const options = {
    method: 'DELETE',
    url: API_URL + '/v1/admin/clerk/surveys/' + surveyId,
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

//설문조사 공개
async function open({ token, surveyId }) {
  const options = {
    method: 'PATCH',
    url: API_URL + '/v1/admin/clerk/surveys/' + surveyId + '/open',
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
//설문조사 비공개
async function close({ token, surveyId }) {
  const options = {
    method: 'PATCH',
    url: API_URL + '/v1/admin/clerk/surveys/' + surveyId + '/close',
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

//설문조사 응답자 목록 조회
async function getRespondents({ token, surveyId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/surveys/' + surveyId + '/respondents',
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
//설문 목록 가져오기
async function getResearchList({ token, page, size }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/surveys?page=' + page + '&size=' + size,
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

// 세미나 날짜로 조회
async function getSeminarByDate({ token, searchDate }) {
  const options = {
    method: 'GET',
    url: API_URL + `/v1/admin/clerk/seminars/search?searchDate=${searchDate}`,
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
async function getEverySeminarAttendList({
  token,
  page,
  size,
  seasonStartDate,
  seasonEndDate,
}) {
  const options = {
    method: 'GET',
    url:
      API_URL +
      `/v1/admin/clerk/seminars/attendances?page=${page}&size=${size}&seasonStartDate=${seasonStartDate}&seasonEndDate=${seasonEndDate}`,
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
async function startSeminarAttend({
  seminarId,
  attendanceCloseTime,
  latenessCloseTime,
  token,
}) {
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
async function editSeminarAttend({
  attendanceId,
  seminarAttendanceStatusId,
  absenceExcuse,
  token,
}) {
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

// 출석 가능 세미나 조회
async function getSeminar({ token, searchDate }) {
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

//세미나 출석
async function AttendSeminar({ token, seminarId, attendanceCode }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/clerk/seminars/attendances/check',
    data: {
      seminarId,
      attendanceCode,
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
// 직책 일괄 변경
async function changeAllType({ token, list }) {
  const options = {
    method: 'PUT',
    url: API_URL + '/v1/admin/clerk/members/types',
    data: list,
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

/**========================= */

export default {
  getTypeMemberList,
  changeType,
  addPoint,
  removePoint,
  getPointOfMember,
  getPointOfYear,
  getPointYearList,
  getPointType,
  addPointType,
  removePointType,
  getSeminarsList,
  createSeminar,
  deleteSeminar,
  getSeminarAttendance,
  getAllSeminarAttend,
  getSomeSeminarAttend,
  reviseAttend,
  getRecentSeminar,
  getAttendConditions,
  researchReply,
  researchReplyModify,
  getReply,
  getRunningResearch,
  getLastResearch,
  createResearch,
  modifyResearch,
  removeResearch,
  open,
  close,
  getRespondents,
  getResearchList,
  getSeminarAttendList,
  getEverySeminarAttendList,
  getTheSeminarAttendList,
  startSeminarAttend,
  editSeminarAttend,
  getSeminarByDate,
  getSeminar,
  AttendSeminar,
  changeAllType,
};
