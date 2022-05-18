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
          thumbnailId: thumbnailId,
          registerDate: moment(registerDate).format('YYYY/MM/DD'),
        });
      }}
    >
      <div className="flex   flex-col justify-center m-4">
        <div className="">
          {thumbnailId === null ? (
            <img
              src={testImg}
              style={{
                boxShadow: '2px 2px 5px 2px #0000001A',
                width: '250px',
                height: '250px',
                objectFit: 'contain',
                background: 'white',
              }}
            />
          ) : (
            <img
              className="w-full h-[162.5px] bg-mainWhite"
              src={`${thumbnailId}`}
              style={{
                objectFit: 'contain',
              }}
            />
          )}
        </div>

        <div className="flex flex-col">
          <div className="font text-left text-lg truncate mt-2">{title}</div>
          <div className="font text-left text-gray-400 truncate">
            by {author}
          </div>
        </div>
      </div>
    </button>
  );
};
export default LibraryList;
