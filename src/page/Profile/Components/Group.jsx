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
          <div className="absolute bottom-2 ">
            <div
              className="bg-amber-400 w-[80px] h-[40px] bg-opacity-75 
                              rounded-md flex justify-center items-center 
                              shadow shadow-zinc-400/40 "
            >
              {group.name}
            </div>
            <div
              className="absolute w-0 h-0 border-opacity-75
               
                            border-r-[6px] border-r-transparent 
                            border-l-[6px] border-l-transparent
                            border-t-[7px] border-t-amber-400 
                            top-[100%] right-[70%]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
