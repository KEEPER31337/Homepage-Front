import React, { useState } from 'react';

const groups = {
  ROLE_회원: { name: '회원', img: '' },
  일반회원: { name: '일반회원', img: '' },
  비회원: { name: '비회원', img: '' },
};

export default function Group(props) {
  const group = groups[props.groupName];
  const [tooltip, setTooltip] = useState(false);
  return (
    <div>
      <img
        className="h-9 object-cover float-left w-9"
        src={group.img}
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
      />
      {tooltip && (
        <div role="tooltip" className="relative text-sm">
          <div className="absolute top-12">
            <div
              className="bg-mainYellow w-[100px] h-[50px] 
                              rounded-2xl flex justify-center items-center 
                              shadow-xl dark:text-mainWhite"
            >
              {group.name}
            </div>
            <div
              className="absolute w-0 h-0 
                            border-r-[8px] border-r-transparent 
                            border-l-[8px] border-l-transparent
                            border-b-[16px] border-b-mainYellow 
                            bottom-[90%] right-[70%]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
