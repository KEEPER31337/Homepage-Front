// 등록된 후보 목록을 현재 선택 페이지에 맡게 보내줌.
import React, { useEffect, useState } from 'react';

// api
import itmanagerAPI from 'API/v1/itmanager';
import memberAPI from 'API/v1/member';

const NON = 1; //비회원
const REGULAR = 2; // 정회원
const SLEEP = 3; // 휴면회원
const GRADUATE = 4; // 졸업
const QUIT = 5; //탈퇴

const GetContentData = ({ member, gen }) => {
  const [GenList, setGenList] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    memberAPI
      .getAllMembers({
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setList(data.list);
        }
      });
  }, []);

  useEffect(() => {
    setGenList(list.filter((data) => data.generation === gen));
  }, [gen, list]);

  return GenList;
};

export default GetContentData;
