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
/**활동 인원 조사 페이지 */
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    return error.response;
  }
}
//설문조사 응답자 목록 조회
async function getRespondents({ token, surveyId }) {
  const options = {
    method: 'DELETE',
    url: API_URL + '/v1/admin/clerk/surveys/' + surveyId + '/respondents',
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
//설문조사 응답
async function researchReply({
  token,
  surveyId,
  memberId,
  replyId,
  excuse,
  replyTime,
}) {
  const url = API_URL + '/v1/clerk/surveys/' + surveyId;
  const data = {
    memberId,
    replyId,
    excuse,
    replyTime,
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
    console.log(error);
    return error.response;
  }
}
//설문 응답 수정
async function researchReplyModify({
  token,
  surveyId,
  memberId,
  replyId,
  excuse,
  replyTime,
}) {
  const url = API_URL + '/v1/clerk/surveys/' + surveyId;
  const data = {
    memberId,
    replyId,
    excuse,
    replyTime,
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
    console.log(error);
    return error.response;
  }
}
//설문 정보 조회
async function getReply({ token, surveyId, memberId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/clerk/surveys/' + surveyId + '/members/' + memberId,
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
//공개 상태의 설문 조회(현재 진행중이고 공개상태인 설문 조회)
async function getRunningResearch({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/clerk/surveys',
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
//비공개 상태의 설문 조회(가장 최근에 종료된 설문 조회)
async function getLastResearch({ token, memberId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/clerk/surveys/closed/members/' + memberId,
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

//종료된 설문 정보 조회(진행중&진행예정인 설문 조회)
async function getFutureResearch({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/clerk/surveys/inVisible',
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

/**========================= */

export default {
  getTypeMemberList,
  changeType,
  createResearch,
  modifyResearch,
  removeResearch,
  open,
  close,
  getRespondents,
  researchReply,
  researchReplyModify,
  getFutureResearch,
  getLastResearch,
  getRunningResearch,
  getReply,
};
