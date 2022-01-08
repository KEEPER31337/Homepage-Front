import React from 'react';
import Header from 'shared/Header.jsx';

const App = (props) => {
  return (
    <div>
      <Header />
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
