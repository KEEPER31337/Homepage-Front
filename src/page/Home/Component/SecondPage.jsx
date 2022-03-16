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
        setTrendPostList(data.list);
      }
    });

    homeAPI.getLatests().then((data) => {
      if (data.success) {
        setLatestPostList(data.list);
      }
    });
  }, []);

  return (
    <div id="main-second-page" className="pt-16">
      <Trends postList={trendPostList} />
      <Latest postList={latestPostList} />
    </div>
  );
};

export default SecondPage;
