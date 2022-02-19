import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Dice
async function getDiceInfo({ token }) {
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

async function playDice({ bet, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/game/dice/play',
    params: {
      bet,
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

async function setDiceResult({ bet, result, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/game/dice/save',
    params: {
      bet,
      result,
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

async function checkDiceCount({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/game/dice/check',
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

// Roulette
async function roulettePlay({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/game/roulette/play',
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

async function rouletteCheck({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/game/roulette/check',
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

// Lotto
async function lottoInfo({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/game/lotto/info',
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

async function lottoPlay({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/game/lotto/play',
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

async function lottoCheck({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/game/lotto/check',
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

// Game
async function getGameInfo() {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/game/info',
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export default {
  getDiceInfo,
  playDice,
  setDiceResult,
  checkDiceCount,
  roulettePlay,
  rouletteCheck,
  lottoInfo,
  lottoPlay,
  lottoCheck,
  getGameInfo,
};
