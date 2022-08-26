import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Job = ({ member, list, job, setJob }) => {
  const [badgePath, setJobBadgePath] = useState();
  const [currentJobId, setCurrentJobId] = useState(0);
  const [jobName, setJobName] = useState('');
  const [nickName, setNickName] = useState('');
  const [generation, setGeneration] = useState('');

  useEffect(() => {
    setCurrentJobId(list.hasJobs[0].id);
    setJobBadgePath(list.hasJobs[0].badgePath);
    setJobName(list.hasJobs[0].name);
    setNickName(list.nickName);
    setGeneration(list.generation);
  }, []);

  const checked =
    'h-fit w-full flex flex-row border-b mb-1 border-violet-200 bg-violet-100 rounded-md cursor-pointer';

  const notChecked =
    'h-fit w-full flex flex-row border-b mb-1 border-violet-200 bg-white hover:bg-violet-100 rounded-md cursor-pointer';

  return (
    <div
      onClick={() => {
        setJob(currentJobId);
      }}
      className={job === currentJobId ? checked : notChecked}
    >
      <div className="flex items-center justify-start text-indigo-900 w-1/2">
        <img src={badgePath} className="inline-block w-9 h-9  mr-2" />
        {jobName.slice(5)}
      </div>
      <div className="flex items-center justify-center w-1/2 text-slate-800">
        <div className="text-slate-400 text-sm mr-2">{generation}기</div>
        {nickName}
      </div>
    </div>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Job);
