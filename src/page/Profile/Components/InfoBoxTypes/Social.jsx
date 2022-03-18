import React from 'react';

export default function Social({ socialList }) {
  return (
    <div className="w-full h-full flex-row rounded-lg overflow-hidden dark:text-mainWhite">
      {socialList.map((social) => (
        <button
          onClick={social.onClick}
          className="w-35 h-35 m-9 hover:brightness-75"
        >
          <img src={social.img} className="w-32 h-32" />
          {social.text}
        </button>
      ))}
    </div>
  );
}
