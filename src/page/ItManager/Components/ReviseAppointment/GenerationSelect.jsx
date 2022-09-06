import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import memberAPI from 'API/v1/member';

const GenerationSelect = ({ token, gen, setGen }) => {
  //모든 기수 불러오기
  const [generationList, setGenerationList] = useState([]);

  useEffect(() => {
    memberAPI
      .getGenerations({
        token: token,
      })
      .then((data) => {
        if (data.success) {
          setGenerationList(data.list);
        }
      });
    memberAPI
      .getGenerations({
        token: token,
      })
      .then((data) => {
        if (data.success) {
          setGen(data.list[0]);
        }
      });
  }, []);

  const changeGeneration = (e) => {
    setGen(parseInt(e.target.value));
  };

  return (
    <div className="flex items-center ">
      <div onChange={changeGeneration}>
        <select
          defaultValue={gen}
          className="text-md border-2 border-amber-200 rounded-md  focus:border-amber-200 focus:ring-amber-200"
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
  return { token: state.member.token };
};

export default connect(mapStateToProps)(GenerationSelect);
