import React from 'react';
import { Link } from 'react-router-dom';
import actionCtf from 'redux/action/ctf';
import { connect } from 'react-redux';
const ContestOverview = (props) => {
  const id = props.id; //바꿀 ctfid
  const name = props.name;
  const description = props.description;
  const creator = props.creator;

  const handleChange = (e) => {
    props.updateCtfId(id);
    props.updateCtfName(name);
  };
  return (
    <>
      <button
        className={
          'w-52 h-40 truncate mx-3 mb-6 rounded-md shadow-md bg-orange-100 hover:bg-orange-200 dark:bg-purple-200 dark:hover:bg-purple-300'
        }
        onClick={handleChange}
      >
        <Link to="/ctf/teamJoin">
          <div className="my-3">
            <div className="text-xl m-4">{name}</div>
            <div>{description}</div>
            <div>{creator}</div>
          </div>
        </Link>
      </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(ContestOverview);
