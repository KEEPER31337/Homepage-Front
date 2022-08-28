// 등록된 후보 목록을 현재 선택 페이지에 맡게 보내줌.
import React, { useEffect, useState } from 'react';

// api
import clerkAPI from 'API/v1/clerk';
import memberAPI from 'API/v1/member';

const NON = 1; //비회원
const REGULAR = 2; // 정회원
const SLEEP = 3; // 휴면회원
const GRADUATE = 4; // 졸업
const QUIT = 5; //탈퇴

const ReviseGetContentData = ({ member, gen }) => {
  const [GenRegular, setGenRegular] = useState([]);
  const [GenSleep, setGenSleep] = useState([]);
  const [GenGraduate, setGenGraduate] = useState([]);
  const [GenNon, setGenNon] = useState([]);
  const [GenQuit, setGenQuit] = useState([]);

  const [non, setNon] = useState([]);
  const [regular, setRegular] = useState([]);
  const [sleep, setSleep] = useState([]);
  const [graduate, setGraduate] = useState([]);
  const [quit, setQuit] = useState([]);

  useEffect(() => {
    clerkAPI
      .getTypeMemberList({
        token: member.token,
        typeId: NON,
      })
      .then((data) => {
        if (data.success) {
          setNon(data.list);
        }
      });

    clerkAPI
      .getTypeMemberList({
        token: member.token,
        typeId: REGULAR,
      })
      .then((data) => {
        if (data.success) {
          setRegular(data.list);
        }
      });

    clerkAPI
      .getTypeMemberList({
        token: member.token,
        typeId: SLEEP,
      })
      .then((data) => {
        if (data.success) {
          setSleep(data.list);
        }
      });

    clerkAPI
      .getTypeMemberList({
        token: member.token,
        typeId: GRADUATE,
      })
      .then((data) => {
        if (data.success) {
          setGraduate(data.list);
        }
      });

    clerkAPI
      .getTypeMemberList({
        token: member.token,
        typeId: QUIT,
      })
      .then((data) => {
        if (data.success) {
          setQuit(data.list);
        }
      });
  }, []);

  useEffect(() => {
    setGenNon(non.filter((data) => data.generation === gen));
    setGenRegular(regular.filter((data) => data.generation === gen));
    setGenSleep(sleep.filter((data) => data.generation === gen));
    setGenGraduate(graduate.filter((data) => data.generation === gen));
    setGenQuit(quit.filter((data) => data.generation === gen));
  }, [gen, regular, sleep, graduate, quit]);

  return [GenNon, GenRegular, GenSleep, GenGraduate, GenQuit];
};

export default ReviseGetContentData;
