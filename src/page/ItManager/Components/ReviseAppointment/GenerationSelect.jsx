import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import memberAPI from 'API/v1/member';

const GenerationSelect = ({ token, setGen }) => {
  const [generation, setGeneration] = useState([]);
  const [initGen, setInitGen] = useState();
  useEffect(() => {
    memberAPI
      .getGenerations({
        token: token,
      })
      .then((data) => {
        if (data.success) {
          setGeneration(data.list);
          setInitGen(data.list[0]);
        }
      });
  }, []);

  const changeGeneration = (e) => {
    setGen(parseInt(e.target.value));
  };
  console.log(String(initGen));
  return (
    <div className="flex items-center ">
      <div onChange={changeGeneration}>
        <select
          defaultValue={String(initGen)}
          className="text-md border-2 border-amber-200 rounded-md  focus:border-amber-200 focus:ring-amber-200"
        >
          {generation.map((gen, index) => (
            <option key={index} value={gen}>
              {gen}기
            </option>
          ))}
        </select>
      </div>{' '}
    </div>
  );
};
const mapStateToProps = (state) => {
  return { token: state.member.token };
};

export default connect(mapStateToProps)(GenerationSelect);
