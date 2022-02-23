import React, { useState, useEffect } from 'react';

// local
import '../style/height.css';
import Trends from './Trends';
import Latest from './Latest';
import GrayUpArrow from 'assets/img/gray-up-arrow.png';

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
      {!visibleArrow && (
        <a href="#">
          <img
            className="m-auto w-16 h-16"
            src={GrayUpArrow}
            onClick={() => {
              goToFirst();
            }}
          ></img>
        </a>
      )}
      <Trends postList={trendPostList} />
      <Latest postList={latestPostList} />
    </div>
  );
};

export default SecondPage;
