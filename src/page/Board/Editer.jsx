import React, { useState, useEffect } from 'react';

const testContent = {
  title: '',
  content: '',
  files: [],
};

const Editer = () => {
  //현재 작성된 상황 저장(입력 내용, 체크박스 등)
  const [EditerState, setEditerState] = useState([]);
  console.log(EditerState);

  useEffect(() => {
    setEditerState([]);
  }, []);

  return (
    <div className="border-4 border-black">
      <div name="input" className="border border-black ">
        <div name="title_box" className="my-5">
          <p className="inline-block text-center w-1/12 bg-mainYellow rounded-r-full">
            제목
          </p>
          <input type="text" className="border-2 w-4/5"></input>
        </div>
        <div name="content_box" className="my-5">
          <p className="inline-block text-center w-1/12 bg-mainYellow rounded-r-full">
            내용
          </p>
          <input type="textArea" className="border-2 w-4/5 h-screen"></input>
        </div>
        <div name="file_box" className="my-5">
          <p className="inline-block text-center w-1/12 bg-mainYellow rounded-r-full">
            파일 첨부
          </p>
          <input type="textArea" className="border-2 w-4/5"></input>
        </div>
      </div>

      <div name="option" className="border border-red-400 inline-block">
        <input type="checkbox" value="댓글 허용" checked />
        댓글 허용
        <br />
        <input type="checkbox" value="엮인글 허용" checked />
        엮인글 허용
        <br />
        <input type="checkbox" value="알림" />
        알림
        <br />
        <input type="checkbox" value="공지" checked />
        공지
        <br />
        <input type="checkbox" value="비밀글" />
        비밀글
        <br />
      </div>
      <div className="inline-block border border-blue-400">
        <button className="border-2 border-mainYellow rounded-lg shadow-lg">
          게시하기
        </button>
        <br />
        <button className="border-2 border-divisionGray rounded-lg shadow-lg">
          임시저장
        </button>
        <button className="border-2 border-divisionGray rounded-lg shadow-lg">
          불러오기
        </button>
        <button className="border-2 border-divisionGray rounded-lg shadow-lg">
          미리보기
        </button>
      </div>
    </div>
  );
};

export default Editer;
