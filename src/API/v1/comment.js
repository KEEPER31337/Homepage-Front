import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function create({ boardId, content, parentId, token }) {
  const url = API_URL + '/v1/comment/' + boardId;
  const data = {
    content,
    parentId,
  };
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
      // 'content-type': 'multipart/form-data',
    },
  };
  try {
    const response = await axios.post(url, data, options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function get({ boardId, page, size, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/comment/' + boardId,
    headers: {
      Authorization: `${token}`,
    },
    params: {
      page,
      size,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function remove({ commentId, token }) {
  const options = {
    method: 'DELETE',
    url: API_URL + '/v1/comment/' + commentId,
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

async function modify({ commentId, content, token }) {
  const options = {
    method: 'PUT',
    url: API_URL + '/v1/comment/' + commentId,
    headers: {
      Authorization: `${token}`,
    },
    body: { content },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function like({ commentId, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/comment/like',
    headers: {
      Authorization: `${token}`,
    },
    params: { commentId },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function dislike({ commentId, memberId, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/comment/dislike',
    headers: {
      Authorization: `${token}`,
    },
    params: { commentId, memberId },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export default {
  create,
  get,
  remove,
  modify,
  like,
  dislike,
};
