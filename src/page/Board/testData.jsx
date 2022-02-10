const testData = {
  maxNo: 5,
  boards: [
    {
      no: 1, //번호
      title: '게시글1', //글 제목
      user: '아무개', //작성자
      date: '2022-01-16', //작성된 날짜
      time: '16:00', //작성된 시간
      watch: '4', //조회수
      file: false, //파일이 첨부되었는지 여부
      image: false, //이미지가 첨부되었는지 여부
      secret: false, //비밀글인지 여부
      content: '게시글내용입니다~~~~~~\n두번째 줄입니다~',
      goodN: 5, //추천 수
      badN: 4, //비추천 수
      commentN: 6, //댓글 개수
      comments: [
        { no: 1, user: '아무개', content: '댓글1 내용입니다.', parent: null },
        { no: 2, user: '김무개', content: '댓글2 내용입니다.', parent: null },
        {
          no: 3,
          user: '김아무개',
          content: '댓글 2의 대댓글입니다.',
          parent: 2,
        },
        { no: 4, user: '김무개', content: '댓글 1의 대댓글입니다.', parent: 1 },
        { no: 5, user: '김아무개', content: '댓글3 내용입니다.', parent: null },
        {
          no: 6,
          user: '김아무개',
          content: '댓글2의 대댓글2입니다.',
          parent: 2,
        },
      ],
    },
    {
      no: 2,
      title:
        '게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글',
      user: '김무개',
      date: '2022-01-15',
      time: '16:00',
      watch: '10',
      file: true,
      image: true,
      secret: false,
      content: '## 게시글내용222입니다!\naaa',
      goodN: 5,
      badN: 4,
      commentN: 2,
      comments: [
        { no: 1, user: '아무개', content: '댓글 내용입니다.', parent: null },
        { no: 2, user: '김무개', content: '댓글2 내용입니다.', parent: 1 },
      ],
    },
    {
      no: 3,
      title: '게시글3',
      user: '김아무개',
      date: '2022-01-15',
      time: '16:00',
      watch: '10',
      file: true,
      image: false,
      secret: false,
      content: '게시글내용333입니다~~~~~~',
      goodN: 5,
      badN: 4,
      commentN: 2,
      comments: [
        { no: 1, user: '아무개', content: '댓글 내용입니다.', parent: null },
        { no: 2, user: '김무개', content: '댓글2 내용입니다.', parent: 1 },
      ],
    },
    {
      no: 4,
      title: '게시글4',
      user: '무개',
      date: '2022-01-15',
      time: '16:00',
      watch: '10',
      file: true,
      image: false,
      secret: false,
      content: '게시글내용444입니다~~~~~~',
      goodN: 5,
      badN: 4,
      commentN: 2,
      comments: [
        { no: 1, user: '아무개', content: '댓글 내용입니다.', parent: null },
        { no: 2, user: '김무개', content: '댓글2 내용입니다.', parent: 1 },
      ],
    },
    {
      no: 5,
      title: '게시글5',
      user: '김박아무개',
      date: '2022-01-15',
      time: '16:00',
      watch: '10',
      file: true,
      image: false,
      secret: false,
      content: '게시글내용555입니다~~~~~~',
      goodN: 5,
      badN: 4,
      commentN: 2,
      comments: [
        { no: 1, user: '아무개', content: '댓글 내용입니다.', parent: null },
        { no: 2, user: '김무개', content: '댓글2 내용입니다.', parent: 1 },
      ],
    },
  ],
  selectedBoard: {},
};

export default testData;
