import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function create({
  title,
  content,
  categoryId,
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
  formData.append('allowComment', allowComment);
  formData.append('isNotice', isNotice);
  formData.append('isSecret', isSecret);
  formData.append('isTemp', isTemp);
  formData.append('password', password);
  files.forEach((file) => formData.append('file', file));
  formData.append('thumbnail', thumbnailFile);

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `${token}`,
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
    return error.response?.data;
  }
}

async function getOne({ no, token, password }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/' + no,
    headers: {
      Authorization: `${token}`,
    },
    params: {
      password,
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
async function getNoticeList({ category }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/notice',
    params: {
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

async function downloadFile({ fileId }) {
  // const url = API_URL + '/v1/util/thumbnail/' + thumbnailId;
  // const options = {
  //   responseType: 'blob',
  // };
  // try {
  //   const response = await axios.get(url, options);
  //   return response.data;
  // } catch (error) {
  //   return error.response.data;
  // }
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/download/' + fileId,
    responseType: 'blob',
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
  allowComment,
  isNotice,
  isSecret,
  isTemp,
  password,
  token,
  files,
}) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('categoryId', categoryId);
  formData.append('allowComment', allowComment);
  formData.append('isNotice', isNotice);
  formData.append('isSecret', isSecret);
  formData.append('isTemp', isTemp);
  formData.append('password', password);
  files.forEach((file) => formData.append('file', file));

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `${token}`,
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
    return error.response?.data;
  }
}

async function modifyThumbnail({ thumbnail, boardId, token }) {
  const formData = new FormData();
  formData.append('thumbnail', thumbnail);

  try {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const response = await axios.patch(
      API_URL + '/v1/post/' + boardId + '/thumbnail',
      formData,
      config
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function deleteFiles({ fileIdList, token }) {
  const options = {
    method: 'DELETE',
    url: API_URL + '/v1/post/files',
    params: { fileIdList: fileIdList.join(',') },
    headers: {
      Authorization: `${token}`,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
async function remove({ boardId, token }) {
  const options = {
    method: 'DELETE',
    url: API_URL + '/v1/post/' + boardId,
    headers: {
      Authorization: `${token}`,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function search({ type, keyword, category, page, size }) {
  // type: T, C, TC ,W
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/search',
    params: { type, keyword, category, page, size },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function like({ type, postingId, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/like',
    headers: {
      Authorization: token,
    },
    params: { type: type, postingId: postingId },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function dislike({ type, postingId, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/dislike',
    headers: {
      Authorization: token,
    },
    params: { type: type, postingId: postingId },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
async function check({ postingId, token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/post/check',
    headers: {
      Authorization: token,
    },
    params: { postingId: postingId },
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
  getNoticeList,
  downloadFile,
  modify,
  modifyThumbnail,
  deleteFiles,
  remove,
  search,
  like,
  dislike,
  check,
};
