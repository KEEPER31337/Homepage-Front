import React, { useState } from 'react';
import axios from 'axios';
import testImg from '../../assets/img/keeper_logo.png';
import Minibook from './Minibook';
import Modal from 'react-awesome-modal';
import './font.css';
import { SearchIcon, StarIcon } from '@heroicons/react/outline';

const RecommendBook = ({ setBookList, mainBook, setIsSearch }) => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [searchValue, setSearchValue] = useState('');
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const bookSearch = async () => {
    if (searchValue == '') {
      openModal();
    } else {
      try {
        const { data } = await axios.get(
          `${API_URL}/v1/searchbooks?keyword=${searchValue}&size=80&page=0`
        );
        setBookList(data);
        setIsSearch(true);
      } catch (err) {}
    }
  };

  //  모달 창 관리
  const [modalStatus, setModalState] = useState(false);
  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };

  return (
    <div className="flex flex-col w-full ">
      {/* 검색 창 */}
      <div className="flex w-full justify-between">
        <input
          placeholder="책 제목 / 저자를 검색해주세요"
          className="flex w-full bg-slate-100 rounded-l-md h-12 p-2 pl-4 focus:outline-none"
          onChange={onChange}
          value={searchValue}
        />

        <button className="bg-slate-100  p-1 rounded-r-md" onClick={bookSearch}>
          <SearchIcon className="inline-block h-7 w-7 text-slate-400 " />
        </button>
      </div>

      <div className="flex flex-col  w-full h-full   justify-between">
        <div className="flex justify-center mt-5">
          {mainBook.thumbnailId === null ? (
            <img
              className="bg-mainWhite object-contain w-[240px] h-[300px]"
              src={testImg}
            />
          ) : (
            <img
              className="bg-mainWhite object-contain w-[240px] h-[300px]"
              src={`${mainBook.thumbnailId}`}
            />
          )}
        </div>

        <div className="text-center text-3xl truncate">{mainBook.title}</div>
        <div className="text-right text-slate-500 truncate pr-2">
          by {mainBook.author}
        </div>
        <div className="text-center text-slate-800 h-4 text-sm">
          {mainBook.information}
        </div>
        {/* total에 아무것도 없을때 */}
        {mainBook.total === '' ? (
          <>
            <Minibook total={1} enable={1} />
          </>
        ) : (
          <>
            <Minibook total={mainBook.total} enable={mainBook.enable} />
          </>
        )}
      </div>
      <Modal // 한글자 이상 입력하라는 모달창
        visible={modalStatus}
        width="300"
        height="150"
        effect="fadeInDown"
        onClickAway={() => closeModal()}
      >
        <div className=" p-3 w-full h-full flex flex-col justify-center  items-center text-center ">
          <div className="h-full w-full p-7">한글자 이상 입력해주세요</div>
          <div className="flex ">
            <button
              className="bg-white   mx-1 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => {
                closeModal();
              }}
            >
              확인
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default RecommendBook;
