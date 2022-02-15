import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function signIn({ loginId, password }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/signin',
    data: {
      loginId,
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

async function emailAuth({ emailAddress }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/signup/emailauth',
    data: { emailAddress },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function signUp({
  loginId,
  emailAddress,
  password,
  realName,
  authCode,
  nickName,
  birthday,
  studentId,
}) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/signup',
    data: {
      loginId,
      emailAddress,
      password,
      realName,
      authCode,
      nickName,
      birthday,
      studentId,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function emailCheck({ emailAddress }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/signup/checkemailaddressduplication',
    params: {
      emailAddress,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function loginIdCheck({ loginId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/signup/checkloginidduplication',
    params: {
      loginId,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function studentIdCheck({ studentId }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/signup/checkstudentidduplication',
    params: {
      studentId,
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
  signIn,
  emailAuth,
  signUp,
  emailCheck,
  loginIdCheck,
  studentIdCheck,
};
