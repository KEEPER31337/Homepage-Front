// 등록된 후보 목록을 현재 선택 페이지에 맡게 보내줌.
import React, { useEffect, useState } from 'react';

// api
import itmanagerAPI from 'API/v1/itmanager';

const REGULAR = 2; // 정회원
const SLEEP = 3; // 휴면회원
const GRADUATE = 4; // 졸업

const getContentData = ({ member, type }) => {
  const [current, setCurrent] = useState([]);
  const [regular, setRegular] = useState([]);
  const [sleep, setSleep] = useState([]);
  const [graduate, setGraduate] = useState([]);

  useEffect(() => {
    //TODO clerk으로 바꾸기
    itmanagerAPI
      .getTypeMemberList({
        token: member.token,
        typeId: REGULAR,
      })
      .then((data) => {
        if (data.success) {
          setRegular(data.list);
        }
      });

    itmanagerAPI
      .getTypeMemberList({
        token: member.token,
        typeId: SLEEP,
      })
      .then((data) => {
        if (data.success) {
          setSleep(data.list);
        }
      });

    itmanagerAPI
      .getTypeMemberList({
        token: member.token,
        typeId: GRADUATE,
      })
      .then((data) => {
        if (data.success) {
          setGraduate(data.list);
        }
      });
  }, []);

  useEffect(() => {
    switch (type) {
      case REGULAR:
        setCurrent(regular);
        break;
      case SLEEP:
        setCurrent(sleep);
        break;
      case GRADUATE:
        setCurrent(graduate);
        break;
      default:
        break;
    }
  }, [type, regular, sleep, graduate]);

  return current;
};

export default getContentData;
