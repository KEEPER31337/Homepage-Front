import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// local
import LibraryList from './LibraryList';
import RecommendBook from './RecommendBook';
import ScrollHorizontal from 'react-scroll-horizontal';
import AuthUser from 'shared/AuthUser';

const Library = () => {
  let page = 0;
  const [bookList, setBookList] = useState();
  const [mainBook, setMainBook] = useState({
    title: '책을 골라주세요 !',
    author: '키퍼',
    information: '',
    total: '',
    enable: '',
    registerDate: '',
    thumbnailId: 81,
  });
  const API_URL = process.env.REACT_APP_API_URL;
  const getRecentBookList = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/v1/recentbooks?page=${page}`
      );
      setBookList(data);
    } catch (err) {}
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
        thumbnailId={x?.thumbnailPath}
        setMainBook={setMainBook}
      />
    );
  });
  return (
    <AuthUser>
      <div
        className="text-center"
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          overflow: 'scroll',
          background: 'linear-gradient(#A2D2FF 60%, #ffffff 40%)',
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
        <nav
          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block"></div>
          <div className="flex-1 flex justify-between sm:justify-end">
            <button
              onClick={() => {
                if (page > 0) page -= 1;
                getRecentBookList();
              }}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              이전
            </button>
            <button
              onClick={() => {
                page += 1;
                getRecentBookList();
              }}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              다음
            </button>
          </div>
        </nav>
      </div>
    </AuthUser>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.member.token,
    memberInfo: state.member.memberInfo,
  };
};

export default connect(mapStateToProps)(Library);
