import React from 'react';
import { Link } from 'react-router-dom';

const Table = (props) => {
  const { headList, bodyList } = props;

  return (
    <div className="w-full h-full inline-block rounded overflow-hidden text-center">
      <table className="w-full shadow bg-white">
        <thead>
          <tr className="h-10 w-full bg-gradient-to-r from-amber-400 via-red-800 to-black dark:from-pink-300 dark:via-purple-400 dark:to-indigo-400  text-lg text-white font-extrabold text-center ">
            {headList.map((head, headIdx) => (
              <th key={headIdx}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyList.map((body, bodyIdx) => (
            <tr
              key={bodyIdx}
              className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]"
            >
              {body.map((d, dIdx) => (
                <td key={dIdx}>{d}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
