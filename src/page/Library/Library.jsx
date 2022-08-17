import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// local
import LibraryList from './LibraryList';
import RecommendBook from './RecommendBook';
import AuthUser from 'shared/AuthUser';

const Library = () => {
  const [bookList, setBookList] = useState();
  const [mainBook, setMainBook] = useState({
    title: '책을 골라주세요!',
    author: 'KEEPER',
    information: '',
    total: '',
    enable: '',
    registerDate: '',
    thumbnailId: null,
  });
  const API_URL = process.env.REACT_APP_API_URL;

  const getRecentBookList = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/v1/recentbooks?&size=8`);
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
  const [isSearch, setIsSearch] = useState(false);
  return (
    <AuthUser>
      <div className="flex  w-full justify-center min-h-screen  dark:bg-black font-basic ">
        <div className="flex max-h-[80vh] md:flex-row flex-col w-10/12 h-full bg-white mt-2">
          <div className="flex md:w-4/12 w-full border-2 border-slate-100 shadow-sm p-5">
            <RecommendBook
              mainBook={mainBook}
              setBookList={setBookList}
              setIsSearch={setIsSearch}
            ></RecommendBook>
          </div>
          {/* 책 좌라락  */}
          <div className="flex flex-col md:w-8/12 w-full bg-slate-100 border-2 border-slate-100 shadow-sm ">
            {!isSearch && (
              <div className=" px-2 py-1 bg-amber-300">최근 추가된 도서</div>
            )}

            <div className="p-2 flex flex-col overflow-y-scroll ">
              {listData}
            </div>
          </div>
        </div>
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
