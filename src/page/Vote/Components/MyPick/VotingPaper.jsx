import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';
import vote from 'assets/img/vote.png';
const VotingPaper = (props) => {
  return (
    <div className="items-center flex justify-center w-8 h-11 bg-white  border border-slate-300 rounded-sm shadow-sm border-b-2 mr-1 mb-1">
      {props.isVote ? <img className="h-6 w-6" src={vote}></img> : ''}
    </div>
  );
};

export default VotingPaper;
