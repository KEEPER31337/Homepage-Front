import React, { Component } from 'react';
import { connect } from 'react-redux';
import { board_read, board_remove } from './App_reducer';
import { testText } from 'page/Board/testText';
import marked from 'marked';

const renderText = (text) => {
  const __html = marked(text, { sanitize: true });
  return { __html };
};

const Item = () => {
  //현재 작성된 상황 저장(입력 내용, 체크박스 등)
  const [text, setText] = useState(testText);
  console.log(EditerState);

  useEffect(() => {
    console.log(test);
  }, [test]);

  return <div></div>;
};

export default Editer;
