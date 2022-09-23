import React, { useState, useEffect } from 'react';
import MinibookImg from './MinibookImg';

const Minibook = ({ total, enable }) => {
  const [tooltip, setTooltip] = useState(false);

  const [list, setlist] = useState([]);
  const exampleList = [];

  useEffect(() => {
    var step;
    for (step = 0; step < enable; step++) {
      exampleList[step] = { id: step, enable: true };
    }
    for (step; step < total; step++) {
      exampleList[step] = { id: step, enable: false };
    }
    setlist(exampleList);
  }, [total, enable]);

  return (
    <div className="flex justify-end mt-4  text-center ">
      {tooltip && (
        <div className="w-fit px-2 py-1 mr-2 bg-amber-200 rounded text-sm">
          {total}권 중, {enable}권 대여가능합니다
        </div>
      )}
      <div
        className="flex flex-row"
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
      >
        {list.map((info) => (
          <MinibookImg key={info.id} isEnable={info.enable} />
        ))}
      </div>
    </div>
  );
};
export default Minibook;
