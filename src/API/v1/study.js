import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function getYears({ token }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/study/years',
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
async function getStudies({ token, year, season }) {
  const options = {
    method: 'GET',
    url: API_URL + '/v1/study/list',
    headers: {
      Authorization: token,
    },
    params: { year: year, season: season },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
async function create({
  year,
  season,
  title,
  information,
  memberIdList,
  gitLink,
  noteLink,
  etcLink,
  thumbnailFile,
  ipAddress,
  token,
}) {
  const formData = new FormData();
  formData.append('studyDto.title', title);
  formData.append('studyDto.information', information);
  formData.append('studyDto.year', year);
  formData.append('studyDto.season', season);
  formData.append('studyDto.ipAddress', ipAddress);
  //formData.append('memberIdList', headMember);
  formData.append('memberIdList[]', memberIdList);
  formData.append('studyDto.gitLink', gitLink);
  formData.append('studyDto.noteLink', noteLink);
  formData.append('studyDto.etcLink', etcLink);
  if (thumbnailFile) formData.append('thumbnail', thumbnailFile);

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `${token}`,
    },
  };
  try {
    const response = await axios.post(API_URL + '/v1/study', formData, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
async function modify({
  studyId,
  year,
  season,
  title,
  information,
  memberIdList,
  gitLink,
  noteLink,
  etcLink,
  thumbnailFile,
  ipAddress,
  token,
}) {
  const formData = new FormData();
  formData.append('studyId', studyId);
  formData.append('studyDto.title', title);
  formData.append('studyDto.information', information);
  formData.append('studyDto.year', year);
  formData.append('studyDto.season', season);
  formData.append('studyDto.ipAddress', ipAddress);
  //formData.append('memberIdList', headMember);
  formData.append('memberIdList[]', memberIdList);
  formData.append('studyDto.gitLink', gitLink);
  formData.append('studyDto.noteLink', noteLink);
  formData.append('studyDto.etcLink', etcLink);
  if (thumbnailFile) formData.append('thumbnail', thumbnailFile);

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `${token}`,
    },
  };
  try {
    const response = await axios.put(API_URL + '/v1/study', formData, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export default {
  getYears,
  getStudies,
  create,
  modify,
};
