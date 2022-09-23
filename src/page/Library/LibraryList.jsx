import React from 'react';
import './font.css';
import keeper_logo_key from '../../assets/img/keeper_logo_key.png';
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
      <div className="flex flex-row p-1">
        <div className="">
          {thumbnailId === null ? (
            <img
              className="w-[85px] h-[105px] bg-mainWhite p-2"
              src={keeper_logo_key}
              style={{
                objectFit: 'contain',
              }}
            />
          ) : (
            <img
              className="w-[85px] h-[105px] bg-mainWhite p-2"
              src={`${thumbnailId}`}
              style={{
                objectFit: 'contain',
              }}
            />
          )}
        </div>

        <div className="flex flex-col truncate p-3">
          <div className=" text-left  truncate font-semibold text-slate-800">
            {title}
          </div>
          <div className="text-left truncate text-slate-500">by {author}</div>
        </div>
      </div>
    </button>
  );
};
export default LibraryList;
