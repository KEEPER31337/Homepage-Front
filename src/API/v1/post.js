import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function getBoard({ no, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/' + no,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function getBoardList({ page, size, category }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/lists/',
    data: {
      page,
      size,
      category,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function getCommentByBoardId({ boardId, page, size }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/comment/' + boardId,
    data: {
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
export default {
  getBoard,
  getBoardList,
  getCommentByBoardId,
};
