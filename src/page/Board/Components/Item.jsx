//쓰이지 않는 파일입니다
//혹시 나중에 다시 사용할 수 있는 코드를 모아놨습니다.

import React, { createRef, useEffect } from 'react';
import { connect } from 'react-redux';

const Comments = ({ comments, state }) => {
  const commentRef = createRef();
  const isDark = state.darkMode;

  useEffect(() => {
    const isComment = commentRef.current.firstChild;
    if (isComment) {
      commentRef.current.removeChild(isComment);
    }

    const utterances = document.createElement('script');
    const theme = isDark ? 'photon-dark' : 'github-light';
    const utterancesConfig = {
      src: 'https://utteranc.es/client.js',
      repo: 'amaran-th/comments-test',
      theme: theme,
      async: true,
      crossorigin: 'anonymous',
      'issue-term': 'pathname',
    };

    Object.entries(utterancesConfig).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    commentRef.current.appendChild(utterances);
  }, [isDark, comments]);
  return (
    <div
      className="border-4 border-black dark:bg-mainBlack"
      ref={commentRef}
    ></div>
  );
};
/*
{comments.map((comment) => (
        <p key={comment.no} className="border">
          {comment.content}
        </p>
      ))}
      */
const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(Comments);
