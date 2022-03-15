import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MyPageFrame from './Components/Frames/MyPageFrame';
import memberAPI from 'API/v1/member';

const Posts = ({ token }) => {
  const postHeads = ['번호', '카테고리', '제목', '날짜', '조회수', '추천수'];
  const [items, setItems] = useState(new Array());
  const pageState = useState(0);
  const [page, setPage] = pageState;

  useEffect(() => {
    const size = 10;
    memberAPI.getUsersPosts({ token, page, size }).then((result) => {
      if (result.success) {
        setItems(
          result.list.map((item, index) => ({
            postId: index,
            category: item.category,
            title: item.title,
            createdAt: item.registerTime,
            visitCount: item.visitCount,
            likeCount: item.likeCount,
          }))
        );
      }
    });
  }, [page]);

  return (
    <MyPageFrame items={items} itemHeads={postHeads} pageState={pageState} />
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.member.token,
  };
};

export default connect(mapStateToProps)(Posts);
