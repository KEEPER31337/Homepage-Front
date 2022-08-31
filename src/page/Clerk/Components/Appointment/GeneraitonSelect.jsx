import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';

const GeneraitonSelect = ({ setGen }) => {
  const [generation, setGeneration] = useState([
    { id: '12' },
    { id: '13' },
    { id: '14' },
  ]);
  useEffect(() => {
    //TODO 현재 기수목록 불러오는 API
  }, []);

  const changeGeneration = (e) => {
    setGen(parseInt(e.target.value));
  };

  return (
    <div className="flex items-center ">
      <div onChange={changeGeneration}>
        <select
          defaultValue="13"
          className="text-md border-2 dark:border-violet-200 dark:focus:border-violet-300 dark:focus:ring-violet-300 dark:bg-darkPoint border-amber-200 rounded-lg  focus:border-amber-300 focus:ring-amber-300"
        >
          {generation.map((g) => (
            <option key={g.id} value={g.id}>
              {g.id}기
            </option>
          ))}
        </select>
      </div>{' '}
    </div>
  );
};
const mapStateToProps = (state) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(GeneraitonSelect);
