import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function create({
  title,
  content,
  categoryId,
  ipAddress,
  allowComment,
  isNotice,
  isSecret,
  isTemp,
  password,
  token,
  files,
  thumbnailFile,
}) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('categoryId', categoryId);
  formData.append('ipAddress', ipAddress);
  formData.append('allowComment', allowComment);
  formData.append('isNotice', isNotice);
  formData.append('isSecret', isSecret);
  formData.append('isTemp', isTemp);
  formData.append('password', password);
  formData.append('file', files);
  formData.append('thumbnailFile', thumbnailFile);

  const config = {
    header: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      API_URL + '/v1/post/new',
      formData,
      config
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function getOne({ no, token }) {
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

async function getList({ category, page, size }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/lists',
    params: {
      category,
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

async function downloadFile({ fileId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/download/' + fileId,
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function modify({
  boardId,
  title,
  content,
  categoryId,
  ipAddress,
  allowComment,
  isNotice,
  isSecret,
  isTemp,
  password,
  token,
  files,
  thumbnailFile,
}) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('categoryId', categoryId);
  formData.append('ipAddress', ipAddress);
  formData.append('allowComment', allowComment);
  formData.append('isNotice', isNotice);
  formData.append('isSecret', isSecret);
  formData.append('isTemp', isTemp);
  formData.append('password', password);
  formData.append('file', files);
  formData.append('thumbnailFile', thumbnailFile);

  const config = {
    header: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      API_URL + '/v1/post/' + boardId,
      formData,
      config
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function remove({ boardId, token }) {
  const options = {
    method: 'DELETE',
    url: API_URL + '/v1/post/' + boardId,
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

async function searchByTitle({ keyword, category, page, size }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/search',
    params: { type: 'T', keyword, category, page, size },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function searchByContent({ keyword, category, page, size }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/search',
    params: { type: 'C', keyword, category, page, size },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function searchByTitleOrContent({ keyword, category, page, size }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/search',
    params: { type: 'TC', keyword, category, page, size },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function searchByWriter({ keyword, category, page, size }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/search',
    params: { type: 'W', keyword, category, page, size },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function like({ boardId, token }) {
  const options = {
    method: 'GET ',
    url: API_URL + '/v1/post/like',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { type: 'INC', boardId },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function dislike({ boardId, token }) {
  const options = {
    method: 'GET ',
    url: API_URL + '/v1/post/dislike',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { type: 'DEC', boardId },
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
  getOne,
  getList,
  downloadFile,
  modify,
  remove,
  searchByTitle,
  searchByContent,
  searchByTitleOrContent,
  searchByWriter,
  like,
  dislike,
};
