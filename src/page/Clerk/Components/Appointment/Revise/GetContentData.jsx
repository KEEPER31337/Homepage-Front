// 등록된 후보 목록을 현재 선택 페이지에 맡게 보내줌.
import React, { useEffect, useState } from 'react';

// api
import clerkAPI from 'API/v1/clerk';
import memberAPI from 'API/v1/member';

const REGULAR = 2; // 정회원
const SLEEP = 3; // 휴면회원
const GRADUATE = 4; // 졸업

const getContentData = ({ member, type }) => {
  // 후보자 체크된 목록을 담고 있는 변수
  const [checkedCurrent, setCheckedCurrent] = useState(new Set());
  //헤더에 type바꿀때마다 현재 체크된 것 보여주는거 (활동, 휴면, 졸업등)
  const [checkedRegular, setCheckedRegular] = useState(new Set());
  const [checkedSleep, setCheckedSleep] = useState(new Set());
  const [checkedGraduate, setCheckedGraduate] = useState(new Set());

  const [current, setCurrent] = useState([]);
  //헤더에 type바꿀때마다 현재 보여주는거 (활동, 휴면, 졸업등)
  const [regular, setRegular] = useState([]);
  const [sleep, setSleep] = useState([]);
  const [graduate, setGraduate] = useState([]);

  useEffect(() => {
    clerkAPI
      .getTypeMemberList({
        token: member.token,
        typeId: REGULAR,
      })
      .then((data) => {
        if (data.success) {
          data.list.map((member, idx) => {
            checkedRegular.add(member.memberId);
            setCheckedRegular(checkedRegular);
          });
        }
      });

    clerkAPI
      .getTypeMemberList({
        token: member.token,
        typeId: SLEEP,
      })
      .then((data) => {
        if (data.success) {
          data.list.map((member, idx) => {
            checkedSleep.add(member.memberId);
            setCheckedSleep(checkedSleep);
          });
        }
      });

    clerkAPI
      .getTypeMemberList({
        token: member.token,
        typeId: GRADUATE,
      })
      .then((data) => {
        if (data.success) {
          data.list.map((member, idx) => {
            checkedGraduate.add(member.memberId);
            setCheckedGraduate(checkedGraduate);
          });
        }
      });
  }, []);

  useEffect(() => {
    switch (type) {
      case REGULAR:
        setCheckedCurrent(checkedRegular);
        break;
      case SLEEP:
        setCheckedCurrent(checkedSleep);
        break;
      case GRADUATE:
        setCheckedCurrent(checkedGraduate);
        break;
      default:
        break;
    }
  }, [type, checkedRegular, checkedSleep, checkedGraduate]);

  return checkedCurrent;
};

export default getContentData;
