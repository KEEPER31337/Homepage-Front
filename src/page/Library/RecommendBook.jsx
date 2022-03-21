import React, { useState } from 'react';
import axios from 'axios';
import testImg from '../../assets/img/libraryImg/book.png';
import './font.css';
const RecommendBook = ({ setBookList, mainBook }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [searchValue, setSearchValue] = useState('');
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const bookSearch = async () => {
    try {
      console.log(searchValue);
      const { data } = await axios.get(
        `${API_URL}/v1/searchbooks?keyword=${searchValue}`
      );
      console.log(data);
      setBookList(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <input
          style={{ width: '50%', height: '50px', marginTop: 50 }}
          onChange={onChange}
          value={searchValue}
        ></input>
        <div
          style={{
            height: '50px',
            marginTop: 50,
            width: '120px',
            backgroundColor: 'white',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            className="font"
            onClick={bookSearch}
            style={{
              width: '100px',
              height: '35px',
              backgroundColor: '#FEE440',
              borderRadius: 5,
              boxShadow: '2px 2px 5px 2px #0000001A',
              color: 'black',
            }}
          >
            <div
              style={{
                fontSize: 15,
                marginTop: 'auto',
                marginBottom: 'auto',
              }}
            >
              검색하기
            </div>
          </button>
        </div>
      </div>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '800px',
          marginTop: '50px',
          paddingLeft: 'auto',
          paddingRight: 'auto',
          justifyContent: 'center',
        }}
      >
        {mainBook.thumbnailId === null ? (
          <img
            src={testImg}
            style={{
              boxShadow: '2px 2px 5px 2px #0000001A',
              width: '200px',
              height: '250px',
              objectFit: 'contain',
              background: 'white',
            }}
          />
        ) : (
          <img
            src={`${mainBook.thumbnailId}`}
            style={{
              boxShadow: '2px 2px 5px 2px #0000001A',
              width: '200px',
              height: '250px',
              objectFit: 'contain',
              background: 'white',
            }}
          />
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 50,
            marginBottom: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '350px',
          }}
        >
          <div
            className="fontBold"
            style={{
              marginLeft: 20,
              textShadow: '0px 0px 74px 0px #0000001A',
              fontSize: '35px',
              color: 'white',
              textAlign: 'start',
              width: 500,
            }}
          >
            {mainBook.title}
          </div>
          <div
            className="fontBold"
            style={{
              marginLeft: 20,
              textShadow: '0px 0px 74px 0px #0000001A',
              fontSize: '20px',
              color: 'white',
              textAlign: 'start',
            }}
          >
            by {mainBook.author}
          </div>
          <div
            className="font"
            style={{
              marginLeft: 20,
              textShadow: '0px 0px 74px 0px #0000001A',
              fontSize: '15px',
              color: 'white',
              textAlign: 'start',
              marginTop: 10,
              width: 500,
            }}
          >
            {mainBook.information}
          </div>
          <div className="flex">
            <div
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
              수량 {mainBook.total}
            </div>
            <div
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
              대여가능 {mainBook.enable}
            </div>
            <div
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
              빌린 날 {mainBook.registerDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecommendBook;
