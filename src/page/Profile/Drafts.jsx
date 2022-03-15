import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import MyPageFrame from './Components/Frames/MyPageFrame';
import memberAPI from 'API/v1/member';
import { connect } from 'react-redux';

const itemHeads = ['번호', '카테고리', '제목', '날짜'];

const Drafts = ({ token }) => {
  const [items, setItems] = useState(new Array());
  const pageState = useState(0);
  const [page, setPage] = pageState;

  useEffect(() => {
    const size = 10;
    memberAPI.getUsersTempPosts({ token, page, size }).then((result) => {
      if (result.success) {
        setItems(
          result.list.map((item, index) => ({
            postId: index,
            category: item.category,
            title: item.title,
            createdAt: item.registerTime,
          }))
        );
      }
    });
  }, [page]);

  return (
    <MyPageFrame items={items} itemHeads={itemHeads} pageState={pageState} />
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.member.token,
  };
};

export default connect(mapStateToProps)(Drafts);
