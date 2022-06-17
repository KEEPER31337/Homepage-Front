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
    props.updateCtfName(name);

    navigate('/ctf/teamJoin');
  };
  return (
    <>
      <tr
        onClick={handleChange}
        className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523] bg-white dark:text-white dark:bg-darkPoint cursor-pointer"
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
      dispatch(actionCtf.updateId(id));
    },
    updateCtfName: (name) => {
      dispatch(actionCtf.updateName(name));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContestTable);
