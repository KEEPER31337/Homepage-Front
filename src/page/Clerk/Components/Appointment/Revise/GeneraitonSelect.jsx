import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import memberAPI from 'API/v1/member';

const GeneraitonSelect = ({ setGen, member }) => {
  const [generationList, setGenerationList] = useState([]);
  useEffect(() => {
    memberAPI
      .getGenerations({
        token: member.token,
      })
      .then((gendata) => {
        if (gendata.success) {
          setGenerationList(gendata.list);
        }
      });
  }, []);

  const changeGeneration = (e) => {
    setGen(Number(e.target.value));
  };

  return (
    <div className="flex items-center ">
      <div onChange={changeGeneration}>
        <select
          defaultValue={generationList[0]}
          className="text-md border-2 dark:border-violet-200 dark:focus:border-violet-300 dark:focus:ring-violet-300 dark:bg-darkPoint border-amber-200 rounded-lg  focus:border-amber-300 focus:ring-amber-300"
        >
          {generationList.map((item, index) => (
            <option key={index} value={item}>
              {item}기
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(GeneraitonSelect);
