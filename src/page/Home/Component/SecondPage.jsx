import React, { useState, useEffect } from 'react';

// local
import Trends from './Trends';
import Latest from './Latest';

// API
import homeAPI from 'API/v1/home';

const SecondPage = ({ goToFirst, visibleArrow }) => {
  const [trendPostList, setTrendPostList] = useState([]);
  const [latestPostList, setLatestPostList] = useState([]);

  useEffect(() => {
    homeAPI.getTrends().then((data) => {
      if (data.success) {
        const trendPostList = data.list.map((item) => ({
          ...item,
          category: item.category.replace(' ', ''),
        }));
        setTrendPostList(trendPostList);
      }
    });

    homeAPI.getLatests().then((data) => {
      if (data.success) {
        const lastestPostList = data.list.map((item) => ({
          ...item,
          category: item.category.replace(' ', ''),
        }));
        setLatestPostList(lastestPostList);
      }
    });
  }, []);

  return (
    <div id="main-second-page">
      <Trends postList={trendPostList} />
      <Latest postList={latestPostList} />
    </div>
  );
};

export default SecondPage;
