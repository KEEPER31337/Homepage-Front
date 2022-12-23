import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function getRanking({ token, page, size, ctfId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/ctf/ranking',
    params: { page: page, size: size, ctfId: ctfId },
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

// CTF 대회 생성
async function createContest({ token, name, description }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/admin/ctf/contest',
    data: {
      name,
      description,
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

// CTF 개최
async function openContest({ cid, token }) {
  const options = {
    method: 'PATCH',
    url: API_URL + '/v1/admin/ctf/contest/' + cid + '/open',
    data: {
      cid,
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

// CTF 끝내기
async function closeContest({ cid, token }) {
  const options = {
    method: 'PATCH',
    url: API_URL + '/v1/admin/ctf/contest/' + cid + '/close',
    data: {
      cid,
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

// CTF 대회 목록 보기
async function getContestList({ token, page, size }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/ctf/contests',
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

// 참가 가능한 CTF Contest 목록 조회
async function getJoinableContestList({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/ctf/extra/data/contests',
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

// CTF 문제 생성
async function createProb({
  title,
  content,
  contestId,
  categories,
  type,
  isSolvable,
  score,
  dynamicInfo,
  flag,
  maxSubmitCount,
  token,
}) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/admin/ctf/prob',
    data: {
      title,
      content,
      contestId,
      categories,
      type,
      isSolvable,
      score,
      dynamicInfo,
      flag,
      maxSubmitCount,
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

// CTF 문제에 파일 등록
async function addProbFile({ challengeId, files, token }) {
  const formData = new FormData();
  formData.append('challengeId', challengeId);
  files.forEach((file) => formData.append('file', file));
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: token,
    },
  };

  try {
    const response = await axios.post(
      API_URL + '/v1/admin/ctf/prob/file',
      formData,
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

// CTF 출제자 지정
async function addAuthor({ memberId, token }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/admin/ctf/prob/maker',
    data: {
      memberId,
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

// CTF 문제 목록 조회
async function getProbList({ token, cid }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/ctf/prob',
    params: { cid },
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

// CTF 문제 세부 목록 조회
async function getDetailProbList({ token, pid }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/ctf/prob/' + pid,
    params: { pid },
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

// CTF 문제 목록 조회(ADMIN)
async function getAdminProbList({ token, page, size, ctfId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/ctf/prob',
    params: { ctfId, page, size },
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

// CTF 문제 카테고리 조회
async function getCategoryList({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/ctf/extra/data/challenge-category',
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

// CTF 문제 타입 조회
async function getTypeList({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/ctf/extra/data/challenge-type',
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

// CTF 문제 오픈
async function openProb({ pid, token }) {
  const options = {
    method: 'PATCH',
    url: API_URL + '/v1/admin/ctf/prob/' + pid + '/open',
    data: {
      pid,
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

// 팀 생성
async function createTeam({ name, description, contestId, token }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/ctf/team',
    data: {
      name,
      description,
      contestId,
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

// 팀 정보 수정
async function reviseTeam({ teamId, name, description, contestId, token }) {
  const options = {
    method: 'PUT',
    url: API_URL + '/v1/ctf/team/' + teamId,
    headers: {
      Authorization: token,
    },
    data: {
      name,
      description,
      contestId,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

// 팀 가입
async function joinTeam({ teamName, contestId, token }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/ctf/team/member',
    data: {
      teamName,
      contestId,
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

// 팀 탈퇴
async function resignTeam({ ctfId, token }) {
  const options = {
    method: 'DELETE',
    url: API_URL + '/v1/ctf/team/member',
    data: {
      ctfId,
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

// 팀 목록 열람
async function seeTeamList({ page, size, ctfId, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/ctf/team',
    params: {
      page: page,
      size: size,
      ctfId: ctfId,
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

// 팀 세부 정보 열람
async function seeTeamDetail({ teamId, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/ctf/team/' + teamId,
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

// 내가 속한 팀 세부 정보 열람
async function seeMyTeam({ ctfId, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/ctf/team/' + ctfId + '/my-team',
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

// 문제 Flag 제출
async function submitFlag({ token, pid, content }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/ctf/prob/' + pid + '/submit/flag',
    data: {
      content,
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

// CTF 문제 닫기
async function closeProb({ pid, token }) {
  const options = {
    method: 'PATCH',
    url: API_URL + '/v1/admin/ctf/prob/' + pid + '/close',
    data: {
      pid,
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

// 문제 삭제
async function deleteProb({ pid, token }) {
  const options = {
    method: 'DELETE',
    url: API_URL + '/v1/admin/ctf/prob/' + pid,
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

// 제출 로그
async function getSubmitLog({ cid, page, size, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/ctf/submit-log/' + cid,
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

// 제출 로그
async function getAuthor({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/ctf/extra/data/challenge-maker',
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

// 출제자 삭제
async function deleteAuthor({ memberId, token }) {
  const options = {
    method: 'DELETE',
    url: API_URL + '/v1/admin/ctf/prob/maker',
    data: {
      memberId,
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
  createContest,
  openContest,
  closeContest,
  getContestList,
  getJoinableContestList,
  createProb,
  getRanking,
  addAuthor,
  getProbList,
  getDetailProbList,
  getCategoryList,
  getTypeList,
  openProb,
  createTeam,
  reviseTeam,
  joinTeam,
  resignTeam,
  seeTeamList,
  seeTeamDetail,
  seeMyTeam,
  getAdminProbList,
  submitFlag,
  closeProb,
  deleteProb,
  getSubmitLog,
  addProbFile,
  getAuthor,
  deleteAuthor,
};
