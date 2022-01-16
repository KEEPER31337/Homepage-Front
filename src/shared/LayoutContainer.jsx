import React from 'react';

const LayoutContainer = (props) => {
  return <div className="container mx-auto px-4">{props.children}</div>;
};

export default LayoutContainer;
