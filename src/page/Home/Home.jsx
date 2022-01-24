import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <section className="keeper_homepage_main">
        <img className="m-auto pt-60" alt="keeper_logo" src={require("../../assets/img/keeper_logo.png").default}></img>
        <div className="keeper_introduction text-center pt-12">
          '지키다'라는 의미를 가진 단어 'KEEP'에서 착안하여, <br></br> 
          정보보호에 관한 연구를 진행하고 그 성과를 공유하기 위해 만들어진 동아리입니다.
        </div>
      </section>
      <section className="number_of_visitors">
        <div className="text-center pt-32">KEEPER의 어제, 오늘, 그리고 누적 방문자 수</div>
        {/* TO DO : Back-End에서 방문자 수 받아와서 출력해야 함  */}
        <div className="text-center">어제: 94, 오늘: 98, 전체: 167,621</div>
      </section>
      <section className="posts_preview grid grid-cols-2 gap-8 justify-between text-center pt-40">
        <section className='notice_posts_preview'>
          <div>공지</div>
          <div className='pt-8'>
            <div>
              1. 공지 제목, (댓글 수), 작성자 닉네임, 시간 또는 날짜
            </div>
            <div>
              2. 공지 제목, (댓글 수), 작성자 닉네임, 시간 또는 날짜
            </div>
            <div>
              3. 공지 제목, (댓글 수), 작성자 닉네임, 시간 또는 날짜
            </div>
            <div>
              4. 공지 제목, (댓글 수), 작성자 닉네임, 시간 또는 날짜
            </div>
            <div>
              5. 공지 제목, (댓글 수), 작성자 닉네임, 시간 또는 날짜
            </div>
          </div>
        </section>
        <section className='information_posts_preview'>
          <div>정보 게시판</div>
          <div className='pt-8'>
            <div>
              1. 공지 제목, (댓글 수), 작성자 닉네임, 시간 또는 날짜
            </div>
            <div>
              2. 공지 제목, (댓글 수), 작성자 닉네임, 시간 또는 날짜
            </div>
            <div>
              3. 공지 제목, (댓글 수), 작성자 닉네임, 시간 또는 날짜
            </div>
            <div>
              4. 공지 제목, (댓글 수), 작성자 닉네임, 시간 또는 날짜
            </div>
            <div>
              5. 공지 제목, (댓글 수), 작성자 닉네임, 시간 또는 날짜
            </div>
          </div>
        </section>
        <section className='recent_posts_preview'></section>
        <section className='recent_comment_posts_preview'></section>
      </section>
    </div>
    
  );
};

export default Home;
