import React from 'react';
import './font.css'
import testImg from "../../assets/img/libraryImg/example.png"
const LibraryList = (props) =>{
    return (
      <>
        <div
          style={{
            display: 'flex',
            height: '350px',
            width: '300px',
            marginTop: '20px',
            marginBottom: '20px',
            marginLeft: '30px',
            marginRight: '30px',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={testImg}
            style={{
              boxShadow: '2px 2px 5px 2px #0000001A',
              width: '200px',
              height: '250px',
              objectFit: 'contain',
            }}
          />
          <div
            className="font"
            style={{
              textShadow: '0px 0px 74px 0px #0000001A',
              fontSize: '20px',
              textAlign: 'start',
              marginTop: 20,
              marginLeft: 5,
            }}
          >
            모던자바스크립트Deep Dive
          </div>
          <div
            className="font"
            style={{
              textShadow: '0px 0px 74px 0px #0000001A',
              fontSize: '15px',
              textAlign: 'start',
              marginLeft: 5,
              color:'gray'
            }}
          >
              by 이응모
          </div>
        </div>
      </>
    );
}
export default LibraryList;