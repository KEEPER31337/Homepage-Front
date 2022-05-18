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
    thumbnailId: null,
  });
  const API_URL = process.env.REACT_APP_API_URL;
  const getRecentBookList = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/v1/recentbooks?page=${page}&size=8`
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
      <div className="flex flex-col max-h-screen dark:bg-mainBlack">
        <div className="flex max-w-7xl  mx-auto w-full">
          <div className="flex  flex-col w-full md:flex-row">
            <div className="flex md:w-4/12 bg-amber-300 p-2 ">
              <RecommendBook
                mainBook={mainBook}
                setBookList={setBookList}
              ></RecommendBook>
            </div>
            {/* 책 좌라락  */}
            <div className="flex  md:w-7/12 ">
              <div className="p-4 grid grid-cols-4 grid-rows-2 bg-amber-200 ">
                {listData}
              </div>
            </div>
            {/* 네비 */}
            <div className=" flex md:w-1/12 dark:bg-mainBlack">
              <div className="flex flex-col w-full">
                <button
                  onClick={() => {
                    if (page > 0) page -= 1;
                    getRecentBookList();
                  }}
                  className="flex w-1/2 bg-red-300 p-2 hover:bg-red-400 shadow-[0_5px_5px_1px_[#bada55]]"
                >
                  이전
                </button>
                <button
                  onClick={() => {
                    page += 1;
                    getRecentBookList();
                  }}
                  className="mt-4 flex w-1/2 bg-amber-300 hover:bg-amber-400 p-2 shadow"
                >
                  다음
                </button>
              </div>
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
