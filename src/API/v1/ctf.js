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

// Team
async function seeContests({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/game/dice/info',
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

async function reviseTeam({ name, description, contestId, token }) {
    const options = {
        method: 'POST',
        url: API_URL + '/v1/ctf/team/288',
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

async function joinTeam({ name, token }) {
    const options = {
        method: 'POST',
        url: API_URL + '/v1/ctf/team',
        data: {
        name,
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

export default {
    createProb,
    getRanking,
    addAuthor,
    getProbList,
    getCategoryList,
    getTypeList,
    openProb,
    seeContests,
    createTeam,
    reviseTeam,
    joinTeam,
    resignTeam,
    seeTeamList,
    seeTeamDetail,
};