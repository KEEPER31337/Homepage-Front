import React, { useState } from 'react';
import testImg from '../../assets/img/libraryImg/example.png';
import axios from 'axios';
import './font.css';
const RecommendBook = ({ setBookList, mainBook }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [searchValue, setSearchValue] = useState();
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const bookSearch = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/v1/searchbooks?keyword='${searchValue}&page=0&size=5`
      );
      setBookList(data.list);
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
          style={{ width: '500px', height: '50px', marginTop: 50 }}
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
          flexDirection: 'row',
          width: '100%',
          height: '400px',
          paddingLeft: '20px',
          paddingRight: '20px',
          justifyContent: 'center',
        }}
      >
        <img
          src={testImg}
          // src={{uri:mainBook.thumbnail}}
          style={{
            boxShadow: '2px 2px 5px 2px #0000001A',
            width: '240px',
            height: '320px',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 50,
            marginBottom: 'auto',
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
          <div style={{ display:"flex",flexDirection: 'row' }}>
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
