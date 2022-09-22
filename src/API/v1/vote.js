import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 선거 생성
async function createVote({ token, name, description, isAvailable }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/admin/elections',
    data: {
      name: name,
      description: description,
      registerTime: null,
      isAvailable: isAvailable,
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
// 선거 삭제
async function deleteVote({ electionId, token }) {
  const options = {
    method: 'DELETE',
    url: API_URL + '/v1/admin/elections/' + electionId,

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

// // 선거 오픈
async function openVote({ electionId, token }) {
  const options = {
    method: 'PATCH',
    url: API_URL + '/v1/admin/elections/' + electionId + '/open',
    data: {
      electionId,
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

// // 선거 종료
async function closeVote({ electionId, token }) {
  const options = {
    method: 'PATCH',
    url: API_URL + '/v1/admin/elections/' + electionId + '/close',
    data: {
      electionId,
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

// 선거 목록 보기
async function getVoteList({ token, page, size }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/elections',
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

// 선거 후보자 목록 조회
async function getCandidate({ token, eid, jid }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/elections/' + eid + '/jobs/' + jid,
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

// 선거 후보자 단일 등록
async function addCandidate({ token, memberId, electionId, memberJobId }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/admin/elections/candidate',
    data: {
      memberId: memberId,
      description: '',
      electionId: electionId,
      memberJobId: memberJobId,
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

// 선거 후보자 단일 삭제
async function deleteCandidate({ token, id }) {
  const options = {
    method: 'DELETE',
    url: API_URL + '/v1/admin/elections/candidate/' + id,
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

// 선거 투표자 단일 등록
async function addVoters({ token, eid, vid }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/admin/elections/' + eid + '/voters/' + vid,
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

// 선거 투표자 단일 삭제
async function deleteVoters({ token, eid, vid }) {
  const options = {
    method: 'DELETE',
    url: API_URL + '/v1/admin/elections/' + eid + '/voters/' + vid,
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
// 선거 참여여부
async function getJoinable({ token, eid }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/elections/join/' + eid,
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

// 선거 투표여부
async function getVotable({ token, eid, vid }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/elections/votes',
    params: { electionId: eid, voterId: vid },
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
// 투표하기
async function voting({ token, eid, vid, candidateIds }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/elections/votes',
    data: {
      voterId: vid,
      electionId: eid,
      candidateIds: candidateIds,
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
// 투표 결과 목록 조회
async function getVoteResult({ token, electionId, jobId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/elections/results',
    params: { electionId: electionId, jobId: jobId },
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
// 열린 선거 목록 보기
async function getOpenVoteList({ token, page, size }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/elections/open',
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
// 열린 선거 목록 보기
async function getCloseVoteList({ token, page, size }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/elections/close',
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

// 선거 투표 현황 조회
async function getVoteStatus({ token, eid }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/elections/' + eid + '/votes',
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

// 선거 투표자 목록 조회
async function getVoters({ token, eid }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/admin/elections/' + eid + '/voters',
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
  createVote,
  deleteVote,
  openVote,
  closeVote,
  getVoteList,
  getCandidate,
  addCandidate,
  deleteCandidate,
  addVoters,
  deleteVoters,
  getJoinable,
  getVotable,
  voting,
  getVoteResult,
  getOpenVoteList,
  getCloseVoteList,
  getVoteStatus,
  getVoters,
};
