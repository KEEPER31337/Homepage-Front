import React, { useEffect, useState, useRef } from 'react';
import AuthUser from 'shared/AuthUser';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//local
import Header from '../Components/Appointment/Header';
import Content from '../Components/Appointment/Content';
import AuthModal from '../Components/AuthModal';

// api
import clerkAPI from 'API/v1/clerk';
import memberAPI from 'API/v1/member';

const NON = 1; //비회원
const REGULAR = 2; // 정회원
const SLEEP = 3; // 휴면회원
const GRADUATE = 4; // 졸업
const QUIT = 5; //탈퇴

const Appointment = ({ member }) => {
  const [gen, setGen] = useState();

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

  //권한없으면 경고창과 함께 메인페이지로
  const auth = ['ROLE_회장', 'ROLE_부회장', 'ROLE_서기'];
  const jobs = member?.memberInfo?.jobs;
  const ModalRef = useRef({});

  useEffect(() => {
    if (!jobs?.some((i) => auth.includes(i))) {
      ModalRef.current.open();
    }
  }, []);

  //활동상태별 인원 불러오기 api
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

  // console.log(gen);
  useEffect(() => {
    setGenNon(non.filter((data) => data.generation === gen));
    setGenRegular(regular.filter((data) => data.generation === gen));
    setGenSleep(sleep.filter((data) => data.generation === gen));
    setGenGraduate(graduate.filter((data) => data.generation === gen));
    setGenQuit(quit.filter((data) => data.generation === gen));
  }, [gen]);

  const navigate = useNavigate();
  const reviseClick = () => {
    navigate('/clerk/revise');
  };

  return (
    <div className="bg-white w-full dark:bg-darkPoint font-basic flex shadow-md rounded-md flex-1 flex-col items-center justify-between p-2">
      <Header setGen={setGen} />
      <div className="bg-white dark:bg-darkPoint w-full h-[60vh] scrollbar-hide overflow-y-scroll flex flex-col text-center ">
        <div className=" grid sm:grid-cols-4 md:grid-cols-5  grid-cols-2 p-2 w-full h-fit text-center">
          <Content type={NON} typeMemberList={GenNon} />
        </div>
        <div className=" grid sm:grid-cols-4 md:grid-cols-5  grid-cols-2  p-2 w-full h-fit text-center">
          <Content type={REGULAR} typeMemberList={GenRegular} />
        </div>
        <div className=" grid sm:grid-cols-4 md:grid-cols-5  grid-cols-2  p-2 w-full h-fit text-center">
          <Content type={SLEEP} typeMemberList={GenSleep} />
        </div>
        <div className=" grid sm:grid-cols-4 md:grid-cols-5  grid-cols-2 p-2 w-full h-fit text-center">
          <Content type={GRADUATE} typeMemberList={GenGraduate} />
        </div>
      </div>
      <div className="w-full bg-white dark:bg-darkPoint rounded-md items-center flex justify-end p-2">
        <div
          className="text-center dark:bg-violet-200 dark:hover:bg-violet-300 dark:border-violet-400 bg-amber-200 hover:bg-amber-300 border-b-4  border-amber-400 w-20 p-1 rounded-md cursor-pointer"
          onClick={reviseClick}
        >
          수정
        </div>
      </div>
      <AuthModal ref={ModalRef}>접근 권한이 없습니다.</AuthModal>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Appointment);
