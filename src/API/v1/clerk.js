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
  const options1 = {
    headers: {
      Authorization: `${token}`,
    },
  };
  const options = {
    method: 'POST',
    url: API_URL + '/v1/admin/clerk/surveys',
    headers: {
      Authorization: `${token}`,
    },
    params: {
      surveyName,
      openTime,
      closeTime,
      description,
      isVisible,
    },
  };
  try {
    const response = await axios.post(url, data, options1);
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
};
