import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

const CheckContent = ({ member, checkedItemHandler, currentItem }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(currentItem?.has(member.memberId));
  }, [currentItem]);

  const checkHandler = () => {
    setChecked(!checked);
    checkedItemHandler(member, !checked);
  };

  const selected =
    'flex flex-row justify-center items-center bg-green-200 rounded-lg px-2';
  const notSelected =
    'flex flex-row justify-center items-center bg-white rounded-lg px-2';

  return (
    <div onClick={checkHandler} className={checked ? selected : notSelected}>
      <div className="flex flex-col p-2 text-left">
        <div className="text-sm font-medium truncate w-16">
          {member.nickName?.length > 6 ? (
            <Marquee gradient={false} speed={10} className="text-black">
              {member.nickName}
            </Marquee>
          ) : (
            member.nickName
          )}
        </div>
        <div className="text-xs ">
          {`키퍼 ${member.generation === null ? '?' : member.generation}기`}
        </div>
      </div>
    </div>
  );
};

export default CheckContent;
