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
async function addPoint({ token, date, memberId, meritTypeId }) {
  const url = API_URL + '/v1/admin/clerk/merits';
  const data = {
    date,
    memberId,
    meritTypeId,
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    return error.response;
  }
}

//상벌점 타입 추가
async function addPointType({ token, merit, isMerit, detail }) {
  const url = API_URL + '/v1/admin/clerk/merits/types';
  const data = {
    merit,
    isMerit,
    detail,
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

/**================================================================================ */
export default {
  getTypeMemberList,
  changeType,
  addPoint,
  getPointOfMember,
  getPointOfYear,
  getPointYearList,
  getPointType,
  addPointType,
};
