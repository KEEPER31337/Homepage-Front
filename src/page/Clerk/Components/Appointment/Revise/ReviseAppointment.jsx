import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Content from './Content';

// api
import clerkAPI from 'API/v1/clerk';
import memberAPI from 'API/v1/member';

const NON = 1; //비회원
const REGULAR = 2; // 정회원
const SLEEP = 3; // 휴면회원
const GRADUATE = 4; // 졸업
const QUIT = 5; //탈퇴

const ReviseAppointment = ({ member }) => {
  const [gen, setGen] = useState(13); // 2 == 초기엔 활동인원

  const [non, setNon] = useState([]); //비회원
  const [regular, setRegular] = useState([]); //정회원 == 활동
  const [sleep, setSleep] = useState([]); //휴면
  const [graduate, setGraduate] = useState([]); // 졸업
  const [quit, setQuit] = useState([]); //틸퇴

  const [GenRegular, setGenRegular] = useState([]);
  const [GenSleep, setGenSleep] = useState([]);
  const [GenGraduate, setGenGraduate] = useState([]);
  const [GenNon, setGenNon] = useState([]);
  const [GenQuit, setGenQuit] = useState([]);

  useEffect(() => {
    memberAPI
      .getGenerations({
        token: member.token,
      })
      .then((gendata) => {
        if (gendata.success) {
          setGen(gendata.list[0]);

          //gen 받아와졌을때, 인원 불러오기
          clerkAPI
            .getTypeMemberList({
              token: member.token,
              typeId: NON,
            })
            .then((data) => {
              if (data.success) {
                setNon(data.list);
                setGenNon(
                  data.list.filter(
                    (data) => data.generation === gendata.list[0]
                  )
                );
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
                setGenRegular(
                  data.list.filter(
                    (data) => data.generation === gendata.list[0]
                  )
                );
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
                setGenSleep(
                  data.list.filter(
                    (data) => data.generation === gendata.list[0]
                  )
                );
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
                setGenGraduate(
                  data.list.filter(
                    (data) => data.generation === gendata.list[0]
                  )
                );
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
                setGenQuit(
                  data.list.filter(
                    (data) => data.generation === gendata.list[0]
                  )
                );
              }
            });
        }
      });
  }, []);

  useEffect(() => {
    setGenNon(non.filter((data) => data.generation === gen));
    setGenRegular(regular.filter((data) => data.generation === gen));
    setGenSleep(sleep.filter((data) => data.generation === gen));
    setGenGraduate(graduate.filter((data) => data.generation === gen));
    setGenQuit(quit.filter((data) => data.generation === gen));
  }, [gen]);

  //선택한 사람들 직책 변경
  const [changeItems, setChangeItems] = useState(new Set());

  const navigate = useNavigate();

  const reviseClick = () => {
    //TODO API 들어오면 다시
    setChangeItems(changeItems);

    clerkAPI
      .changeAllType({
        token: member.token,
        list: Array.from(changeItems),
      })
      .then((data) => {
        if (data.success) {
          navigate('/clerk');
        }
      });
  };

  return (
    <div className="font-basic w-full dark:bg-darkPoint flex shadow-md rounded-md flex-1 flex-col items-center justify-between p-2">
      <Header setGen={setGen} />
      <div className="bg-white dark:bg-darkPoint w-full h-[60vh] scrollbar-hide overflow-y-scroll flex flex-col text-center ">
        <div className=" grid sm:grid-cols-4 md:grid-cols-5  grid-cols-2 p-2 w-full h-fit text-center">
          <Content
            type={NON}
            typeMemberList={GenNon}
            changeItems={changeItems}
          />
        </div>
        <div className=" grid sm:grid-cols-4 md:grid-cols-5  grid-cols-2 p-2 w-full h-fit text-center">
          <Content
            type={REGULAR}
            typeMemberList={GenRegular}
            changeItems={changeItems}
          />
        </div>
        <div className=" grid sm:grid-cols-4 md:grid-cols-5  grid-cols-2 p-2 w-full h-fit text-center">
          <Content
            type={SLEEP}
            typeMemberList={GenSleep}
            changeItems={changeItems}
          />
        </div>
        <div className=" grid sm:grid-cols-4 md:grid-cols-5  grid-cols-2 p-2 w-full h-fit text-center">
          <Content
            type={GRADUATE}
            typeMemberList={GenGraduate}
            changeItems={changeItems}
          />
        </div>
      </div>
      <div className="w-full bg-white dark:bg-darkPoint rounded-md items-center flex justify-end p-2">
        <div className="px-2 pl-4 dark:text-white">완료 버튼을 눌러주세요!</div>
        <div
          className="text-center bg-amber-200 hover:bg-amber-300 border-b-4  border-amber-400 dark:bg-violet-200 dark:hover:bg-violet-300 dark:border-violet-400 w-20 p-1 rounded-md cursor-pointer"
          onClick={reviseClick}
        >
          완료
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(ReviseAppointment);
