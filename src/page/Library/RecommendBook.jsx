import React, { useState } from 'react';
import axios from 'axios';
import testImg from '../../assets/img/libraryImg/book.png';
import './font.css';
import { SearchIcon, StarIcon } from '@heroicons/react/outline';

const RecommendBook = ({ setBookList, mainBook }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [searchValue, setSearchValue] = useState('');
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const bookSearch = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/v1/searchbooks?keyword=${searchValue}&size=8`
      );
      setBookList(data);
    } catch (err) {}
  };
  return (
    <div className="w-full justify-center">
      <div className="w-full flex">
        <div className="flex m-1 w-full justify-between">
          <input
            class="flex w-full bg-white h-12 p-2 focus:outline-none"
            onChange={onChange}
            value={searchValue}
          />

          <div className="flex h-12 bg-white rounded-r-sm">
            <div className="m-1 flex rounded-r-sm p-1 bg-amber-300 border-2 border-amber-400 shadow-[inset_0_2px_0_1px_#ffffff]">
              <button
                className="hover:bg-amber-500 hover:text-mainWhite rounded"
                onClick={bookSearch}
              >
                <SearchIcon className="inline-block h-7 w-7 text-mainWhite dark:text-purple-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="m-2 flex flex-col ">
        <div className="flex justify-center ">
          {mainBook.thumbnailId === null ? (
            <img
              src={testImg}
              style={{
                boxShadow: '2px 2px 5px 2px #0000001A',
                width: '260px',
                height: '325px',
                objectFit: 'contain',
                background: 'white',
              }}
            />
          ) : (
            <img
              className=" bg-mainWhite object-contain w-[260px] h-[325px]"
              src={`${mainBook.thumbnailId}`}
            />
          )}
        </div>

        <div className="flex flex-col justify-center m-2 text-mainWhite p-2">
          <div className="fontBold text-center text-4xl truncate ">
            {mainBook.title}
          </div>
          <div className="fontBold text-center">by {mainBook.author}</div>
          <div className="font pt-4 text-sm">{mainBook.information}</div>
          <div className="flex text-lg">
            <div className="font mx-4 p-2 w-1/2 bg-amber-200 text-black rounded-md text-center">
              수량 {mainBook.total}
            </div>
            <div className="font mx-4 p-2 w-1/2 bg-amber-200 text-black rounded-md text-center">
              대여가능 {mainBook.enable}
            </div>
            {/* <div
              className="font"
              style={{
                marginLeft: 20,
                marginTop: 20,
                display: 'flex',
                borderRadius: 5,
                backgroundColor: '#FEE440',
                width: 150,
                height: 40,
                color: 'black',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '2px 2px 5px 2px #0000001A',
              }}
            >
              등록일 {mainBook.registerDate}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecommendBook;
