import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

//api
import itmanagerAPI from 'API/v1/itmanager';

const JobList = ({ member, list, selectJob, setSelectJob, update }) => {
  const [jobMembers, setJobMembers] = useState([]);
  useEffect(() => {
    itmanagerAPI
      .getRoleMember({
        token: member.token,
        jobId: list.id,
      })
      .then((data) => {
        if (data.success) {
          setJobMembers(data.list);
        }
      });
  }, [update]);
  const checked =
    'h-fit w-full flex flex-row border-b mb-1 border-slate-200 dark:border-violet-200 bg-slate-100  dark:bg-black rounded-md cursor-pointer';

  const notChecked =
    'h-fit w-full flex flex-row border-b mb-1 border-slate-200 dark:border-darkPoint bg-white dark:bg-darkPoint rounded-md hover:bg-slate-100 cursor-pointer';
  return (
    <>
      {jobMembers.length === 0 ? (
        <div
          onClick={() => {
            setSelectJob(list.id);
          }}
          className={selectJob === list.id ? checked : notChecked}
        >
          <div className="flex items-center justify-start text-indigo-900 dark:text-white w-1/2 p-[2px]">
            <img src={list.badgePath} className="inline-block w-9 h-9 mr-4 " />
            {list.name.slice(5)}
          </div>
          <div className="flex items-center justify-start w-1/2 ml-4 text-slate-800 dark:text-white">
            <div className="text-slate-400  text-sm ">추가해주세요</div>
          </div>
        </div>
      ) : (
        <>
          {jobMembers.map((cccclist) => (
            <div
              key={cccclist.memberId}
              onClick={() => {
                setSelectJob(list.id);
              }}
              className={selectJob === list.id ? checked : notChecked}
            >
              <div className="flex items-center justify-start text-indigo-900 dark:text-white w-1/2 p-[2px]">
                <img
                  src={list.badgePath}
                  className="inline-block w-9 h-9  mr-4"
                />
                {list.name.slice(5)}
              </div>
              <div className="flex items-center justify-start w-1/2 ml-4 text-slate-800 dark:text-white">
                <div className="text-slate-400 text-sm mr-2">
                  {cccclist.generation}기
                </div>
                {cccclist.nickName}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(JobList);
