import React from 'react';

const App = (props) => {
  return (
    <div>
      <div className="bg-mainBlack h-1/2 ">
        <h1 className="text-mainWhite text-3xl text-center">
          mainWhite on mainBlack
        </h1>
        <h1 className="text-pointYellow text-3xl text-center">
          pointYellow on mainBlack
        </h1>
      </div>
      <h1 className="text-mainBlack text-3xl text-center">
        mainBlack on mainWhite
      </h1>
      <h1 className="text-pointYellow text-3xl text-center">
        pointYellow on mainWhite
      </h1>
    </div>
  );
};

export default App;
