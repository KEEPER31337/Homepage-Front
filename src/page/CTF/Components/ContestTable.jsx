import React from 'react';
import { Link } from 'react-router-dom';
import actionCtf from 'redux/action/ctf';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ContestTable = (props) => {
  const id = props.id; //바꿀 ctfid
  const name = props.name;
  const description = props.description;
  const creator = props.creator;
  const navigate = useNavigate();

  const handleChange = (e) => {
    props.updateCtfId(id);
    navigate('/ctf/teamJoin');
  };
  return (
    <>
      <tr
        onClick={handleChange}
        className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523] cursor-pointer"
      >
        <td>{name}</td>
        <td>{description}</td>
        <td>{creator}</td>
      </tr>
    </>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { ctfId: state.ctfId };
};
const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateCtfId: (id) => {
      dispatch(actionCtf.updateInfo(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContestTable);
