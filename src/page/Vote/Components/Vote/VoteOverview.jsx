import React from 'react';
import { Link } from 'react-router-dom';
import actionCtf from 'redux/action/ctf';
import actionVote from 'redux/action/vote';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ctfAPI from 'API/v1/ctf';

const ContestOverview = (props) => {
  const id = props.id; //바꿀 선거 id
  const name = props.name;
  const description = props.description;

  const navigate = useNavigate();

  const handleChange = (e) => {
    //redux 업데이트
    props.updateVoteId(id);
    props.updateVoteName(name);

    //TODO 투표 여부 확인 api
    //-> 했던 안했던 둘다 투표하기 페이지로
    //-> 보여주는건,
    navigate('/vote/mypick');
  };
  return (
    <>
      <button
        className={
          'w-52 h-48 truncate mt-4 rounded-sm shadow-md border bg-slate-50 hover:bg-slate-200 dark:bg-darkPoint hover:dark:border-dashed  dark:text-white dark:border-slate-300 dark:border-2'
        }
        onClick={handleChange}
      >
        <div className="my-3">
          <div className="text-xl m-4">{name}</div>
          <div>{description}</div>
        </div>
      </button>
    </>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};
const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateVoteId: (id) => {
      dispatch(actionVote.updateId(id));
    },
    updateVoteName: (name) => {
      dispatch(actionVote.updateName(name));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContestOverview);
