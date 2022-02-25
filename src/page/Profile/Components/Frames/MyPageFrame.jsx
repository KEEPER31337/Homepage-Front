import React from 'react';
import MyPageNav from '../MyPageNav';
import PropTypes from 'prop-types';

const MyPageFrame = ({ renderHead, items, itemHeads }) => {
  const defaultHead = () => <></>;

  const renderItemComponents = (item) => {
    const itemComponents = new Array();
    for (const key in item) {
      itemComponents.push(<td className="text-center">{item[key]}</td>);
    }
    return itemComponents.map((component) => component);
  };

  return (
    <div className="bg-mainWhite dark:bg-mainBlack pt-20 overflow-auto min-h-screen">
      <div className="flex justify-start mx-auto w-[1200px] bg-mainWhite dark:bg-darkPoint dark:text-mainWhite rounded-3xl shadow-2xl overflow-auto p-5">
        <MyPageNav />
        <div className="w-full h-full mr-5">
          {renderHead != null ? renderHead() : defaultHead()}
          <div className="w-full h-full inline-block rounded-lg overflow-hidden dark:text-mainWhite">
            <table className="w-full">
              <thead>
                <tr className="h-10">
                  {itemHeads.map((thead) => (
                    <th className="bg-mainYellow">{thead}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    className="w-full h-10 bg-backGray dark:bg-darkComponent hover:bg-[#f4f4f4] dark:hover:bg-[#0b1523] select-none"
                    onClick={() => {
                      console.log(item);
                    }}
                  >
                    {renderItemComponents(item)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

MyPageFrame.prototype = {
  renderHead: PropTypes.func,
  items: PropTypes.array.isRequired,
  itemHeads: PropTypes.array.isRequired,
};

MyPageFrame.defaultProps = {
  renderHead: null,
};

export default MyPageFrame;
