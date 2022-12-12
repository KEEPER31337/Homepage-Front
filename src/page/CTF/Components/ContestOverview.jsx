import React from 'react';
import { Link } from 'react-router-dom';
import actionCtf from 'redux/action/ctf';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ctfAPI from 'API/v1/ctf';

const ContestOverview = (props) => {
  const id = props.id; //바꿀 ctfid
  const name = props.name;
  const description = props.description;
  const creator = props.creator;
  const navigate = useNavigate();
  const handleChange = (e) => {
    props.updateCtfId(id);
    props.updateCtfName(name);

    ctfAPI
      .seeMyTeam({
        ctfId: id,
        token: props.member.token,
      })
      .then((data) => {
        if (data.code === 0) {
          console.log('dd');
          props.updateCtfTeamName(data.data.name);
          navigate('/ctf/challenge');
        } else {
          //팀 없을 경우에만 teamjoin으로 이동
          props.updateCtfTeamName(null);
          navigate('/ctf/teamJoin');
        }
      });
  };
  return (
    <>
      <button
        className={
          'w-52 h-40 truncate mx-3 mb-6 rounded-md shadow-md bg-orange-100 hover:bg-orange-200 dark:bg-purple-200 dark:hover:bg-purple-300'
        }
        onClick={handleChange}
      >
        <div className="my-3">
          <div className="text-xl m-2 truncate px-4">{name}</div>
          <div className="truncate px-4">{description}</div>
          <div className="truncate px-4">{creator}</div>
        </div>
      </button>
    </>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { member: state.member, ctfId: state.ctfId };
};
const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateCtfId: (id) => {
      dispatch(actionCtf.updateId(id));
    },
    updateCtfName: (name) => {
      dispatch(actionCtf.updateName(name));
    },
    updateCtfTeamName: (teamName) => {
      dispatch(actionCtf.updateTeamName(teamName));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContestOverview);
