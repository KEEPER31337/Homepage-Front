import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 선거 생성
async function createVote({ token, name, description, isAvailable }) {
  const options = {
    method: 'POST',
    url: API_URL + '/v1/admin/elections',
    data: {
      name: '회장 선거1',
      description: '새로운 회장 선출을 위한 투표',
      registerTime: null,
      isAvailable: true,
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
// 선거 삭제
// async function deleteVote({ memberId, token }) {
//   const options = {
//     method: 'DELETE',
//     url: API_URL + '/v1/admin/elections',
//     data: {
//       memberId,
//     },
//     headers: {
//       Authorization: token,
//     },
//   };
//   try {
//     const response = await axios(options);
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// }

// // 선거 오픈
// async function openVote({ cid, token }) {
//   const options = {
//     method: 'PATCH',
//     url: API_URL + '/v1/admin/ctf/contest/' + cid + '/open',
//     data: {
//       cid,
//     },
//     headers: {
//       Authorization: token,
//     },
//   };
//   try {
//     const response = await axios(options);
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// }

// // 선거 종료
// async function closeVote({ cid, token }) {
//   const options = {
//     method: 'PATCH',
//     url: API_URL + '/v1/admin/ctf/contest/' + cid + '/close',
//     data: {
//       cid,
//     },
//     headers: {
//       Authorization: token,
//     },
//   };
//   try {
//     const response = await axios(options);
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// }

export default {
  createVote,
  // openVote,
  // closeVote,
};
