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


// CTF 문제 생성
async function createProb({
  title,
  content,
  contestId,
  category,
  type,
  isSolvable,
  score,
  dynamicInfo,
  flag,
  token,
}) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/admin/ctf/prob',
    data: {
      title,
      content,
      contestId,
      category,
      type,
      isSolvable,
      score,
      dynamicInfo,
      flag,
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
            page:page,
            size:size,
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
      url: API_URL + '/v1/ctf/team/'+ctfId+'/my-team',
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
    createProb,
    getRanking,
    addAuthor,
    getProbList,
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
};
