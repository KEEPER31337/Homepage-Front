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
  creatorName,
  score,
  file,
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
      creatorName,
      score,
      file,
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

export default {
  createProb,
  getRanking,
};
