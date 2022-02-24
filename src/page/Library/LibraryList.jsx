import React from 'react';
import './font.css';
import testImg from '../../assets/img/libraryImg/book.png';
import moment from 'moment';
import 'moment/locale/ko';
const LibraryList = ({
  id,
  title,
  author,
  information,
  department,
  total,
  enable,
  registerDate,
  thumbnailId,
  setMainBook,
}) => {
  const API_URL = process.env.REACT_APP_API_URL;
  return (
    <button
      onClick={() => {
        setMainBook({
          id: id,
          title: title,
          author: author,
          information: information,
          department: department,
          total: total,
          enable: enable,
          thumbnailId:thumbnailId,
          registerDate: moment(registerDate).fromNow(),
        });
      }}
    >
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
        {thumbnailId === null ? (
          <img
            src={testImg}
            style={{
              boxShadow: '2px 2px 5px 2px #0000001A',
              width: '200px',
              height: '250px',
              objectFit: 'contain',
              background:"white"
            }}
          />
        ) : (
          <img
            src={`${API_URL}/v1/util/thumbnail/${thumbnailId}`}
            style={{
              boxShadow: '2px 2px 5px 2px #0000001A',
              width: '200px',
              height: '250px',
              objectFit: 'contain',
              background:"white"
            }}
          />
        )}
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
          {title}
        </div>
        <div
          className="font"
          style={{
            textShadow: '0px 0px 74px 0px #0000001A',
            fontSize: '15px',
            textAlign: 'start',
            marginLeft: 5,
            color: 'gray',
          }}
        >
          by {author}
        </div>
      </div>
    </button>
  );
};
export default LibraryList;
