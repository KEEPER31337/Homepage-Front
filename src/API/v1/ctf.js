import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

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
    seeContests,
    createTeam,
    reviseTeam,
    joinTeam,
    resignTeam,
    seeTeamList,
    seeTeamDetail,
  };