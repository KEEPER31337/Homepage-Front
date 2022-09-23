import React, { useEffect, useState, useRef } from 'react';
import AuthUser from 'shared/AuthUser';

import { connect } from 'react-redux';
import EditModal from './EditModal.jsx';
import JobList from '../Components/Appointment/JobList';
import AuthModal from '../Components/AuthModal';

import itmanagerAPI from 'API/v1/itmanager';

const Appointment = ({ member, isDark }) => {
  //권한없으면 경고창과 함께 메인페이지로
  const auth = ['ROLE_회장', 'ROLE_부회장', 'ROLE_전산관리자'];
  const jobs = member?.memberInfo?.jobs;
  const ModalRef = useRef({});

  useEffect(() => {
    if (!jobs?.some((i) => auth.includes(i))) {
      ModalRef.current.open();
    }
  }, []);

  const [update, setUpdate] = useState(false);
  const [job, setJob] = useState([]);
  const [selectJob, setSelectJob] = useState(-1);

  useEffect(() => {
    itmanagerAPI
      .getRole({
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setJob(data.list);
        }
      });
  }, []);

  //직책 관리 모달 관련
  const EditModalRef = useRef({});
  const handleCreator = () => {
    if (selectJob === -1) {
    } else {
      EditModalRef.current.open();
    }
  };

  const [selectJobName, setSelectJobName] = useState('');
  const [selectJobBadge, setSelectJobBadge] = useState('');

  useEffect(() => {
    job.map((list) => {
      if (list.id === selectJob) {
        setSelectJobName(list.name);
        setSelectJobBadge(list.badgePath);
      }
    });
  }, [selectJob]);

  return (
    <>
      <div className="dark:text-white  font-basic flex flex-1 md:flex-row flex-col h-[75vh] items-center  justify-center p-4">
        <div className="bg-white dark:bg-darkPoint dark:border-violet-200  rounded-sm shadow border border-indigo-50   md:w-6/12 w-full h-full flex flex-col text-center justify-between ">
          <div className="scrollbar-hide overflow-y-scroll">
            {job.map((list) => (
              <JobList
                key={list.id}
                list={list}
                selectJob={selectJob}
                setSelectJob={setSelectJob}
                update={update}
              />
            ))}
          </div>
          <div
            onClick={handleCreator}
            className="items-center flex flex-row justify-center rounded-md  hover:bg-slate-100 dark:hover:bg-black mt-4 p-1 w-full  cursor-pointer"
          >
            {selectJob === -1 ? (
              <div className="text-lg h-9">관리할 직책을 선택해주세요!</div>
            ) : (
              <>
                <div className="text-lg ">
                  {selectJobName.slice(5)}직책 관리하기
                </div>
                <img
                  src={selectJobBadge}
                  className="inline-block w-9 h-9 ml-1"
                />
              </>
            )}
          </div>
          <EditModal
            member={member}
            isDark={!isDark}
            selectJob={selectJob} //JOB id 넘겨줌
            ref={EditModalRef}
            update={update}
            setUpdate={setUpdate}
          ></EditModal>
        </div>
      </div>
      <AuthModal ref={ModalRef}>접근 권한이 없습니다.</AuthModal>
    </>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member, isDark: state.darkMode.isDark };
};

export default connect(mapStateToProps)(Appointment);
