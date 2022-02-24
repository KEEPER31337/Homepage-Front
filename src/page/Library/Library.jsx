import React, { useState, useEffect } from 'react';
import LibraryList from './LibraryList';
import RecommendBook from './RecommendBook';
import ScrollHorizontal from 'react-scroll-horizontal';
import { connect } from 'react-redux';
import axios from 'axios';
const Library = () => {
  const [bookList, setBookList] = useState();
  const [mainBook, setMainBook] = useState({
    title: 'empty',
    author: 'empty',
    information: 'empty',
    total: '0',
    enable: '0',
    registerDate: '2022-02-20',
  });
  const API_URL = process.env.REACT_APP_API_URL;
  const getRecentBookList = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/v1/recentbooks`);
      setBookList(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRecentBookList();
  }, []);
  const listData = bookList?.list?.map((x) => {
    return (
      <LibraryList
        key={x?.id}
        id={x?.id}
        title={x?.title}
        author={x?.author}
        information={x?.information}
        department={x?.department}
        total={x?.total}
        enable={x?.enable}
        registerDate={x?.registerDate}
        setMainBook={setMainBook}
      />
    );
  });
  console.log(listData);
  return (
    <div
      className="text-center"
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'scroll',
        background: 'linear-gradient(#A2D2FF 80%, #ffffff 20%)',
      }}
    >
      <RecommendBook
        mainBook={mainBook}
        setBookList={setBookList}
      ></RecommendBook>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {listData}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.member.token,
    memberInfo: state.member.memberInfo,
  };
};

export default connect(mapStateToProps)(Library);
