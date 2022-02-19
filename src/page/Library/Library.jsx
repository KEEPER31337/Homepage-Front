import React from 'react';
import LibraryList from './LibraryList';
import RecommendBook from './RecommendBook'
import ScrollHorizontal from 'react-scroll-horizontal';
const Library = () => {
  return (
    <div
      className="text-center"
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'scroll',
        background: 'linear-gradient(#A2D2FF 60%, #ffffff 40%)'        
      }}
    >
      <RecommendBook></RecommendBook>
      <div style={{display:'flex',flexDirection: 'row',justifyContent:'center'}}>
      <ScrollHorizontal style={{height:'450px',width:'100%',margin:0}}>
        <LibraryList></LibraryList>
        <LibraryList></LibraryList>
        <LibraryList></LibraryList>
        <LibraryList></LibraryList>
        <LibraryList></LibraryList>
        <LibraryList></LibraryList>
        <LibraryList></LibraryList>
      </ScrollHorizontal>
      </div>
    </div>
  );
};

export default Library;
