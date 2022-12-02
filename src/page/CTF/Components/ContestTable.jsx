import React from 'react';
import { Link } from 'react-router-dom';
import actionCtf from 'redux/action/ctf';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ctfAPI from 'API/v1/ctf';

const ContestTable = (props) => {
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
          console.log(data.data.name);
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
      <tr
        onClick={handleChange}
        className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523] bg-white dark:text-white dark:bg-darkPoint cursor-pointer"
      >
        <td className="w-1/3 truncate px-4">{name}</td>
        <td className="w-1/3 truncate px-4">{description}</td>
        <td className="w-1/3 truncate px-4">{creator}</td>
      </tr>
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
export default connect(mapStateToProps, mapDispatchToProps)(ContestTable);
