import { ViewGridIcon } from '@heroicons/react/outline';

const categoriesAll = [
  {
    id: 1,
    name: 'KEEPER',
    subs: [
      {
        id: 7,
        name: '동아리 소개',
        href: 'about',
        auth: null,
      },
      // {
      //   id: 8,
      //   name: '이벤트',
      //   href: 'event',
      //   auth :null
      // },
      {
        id: 9,
        name: '동아리 일정',
        href: 'schedule',
        auth: null,
      },
      {
        id: null,
        name: '스터디',
        href: 'study',
        auth: null,
      },
      {
        id: null,
        name: 'CTF',
        href: 'ctf',
        auth: null,
      },
      {
        id: null,
        name: '투표',
        href: 'vote',
        auth: null,
      },
      {
        id: null,
        name: '위키',
        href: 'https://keeper.or.kr/wiki/%EB%8C%80%EB%AC%B8',
        auth: null,
        external: true,
      },
    ],
  },
  {
    id: 2,
    name: '게시판',
    subs: [
      {
        id: 105,
        name: '공지사항',
        href: 'board/105',
        auth: null,
      },
      {
        id: 6105,
        name: '건의사항',
        href: 'board/6105',
        auth: null,
      },
      {
        id: 116,
        name: '자유게시판',
        href: 'board/116',
        auth: null,
      },
      {
        id: 63908,
        name: '익명게시판',
        href: 'board/63908',
        auth: null,
      },
      {
        id: 11,
        name: '졸업생게시판',
        href: 'board/11',
        auth: null,
      },
    ],
  },
  {
    id: 3,
    name: '동아리활동',
    subs: [
      {
        id: 117,
        name: '발표자료',
        href: 'board/117',
        auth: null,
      },
      {
        id: 5424,
        name: '스터디 발표자료',
        href: 'board/5424',
        auth: null,
      },
      {
        id: 2996,
        name: '기술문서',
        href: 'board/2996',
        auth: null,
      },
      {
        id: 23400,
        name: '회계부',
        href: 'board/23400',
        auth: null,
      },
    ],
  },
  {
    id: 4,
    name: '정보',
    subs: [
      {
        id: 5125,
        name: '정보',
        href: 'board/5125',
        auth: null,
      },
      {
        id: 1377,
        name: '시험',
        href: 'board/1377',
        auth: null,
      },
    ],
  },
  {
    id: 5,
    name: '도서/기자재',
    subs: [
      {
        id: 26,
        name: '도서 검색',
        href: 'library',
        auth: null,
      },
      // {
      //   id: 27,
      //   name: '도서 추가',
      //   href: 'library/add',
      //   auth :null
      // },
      {
        id: 28,
        name: '도서 관리',
        href: 'library/manage',
        auth: 'ROLE_사서',
      },
      // {
      //   id: null,
      //   name: '기자재 검색',
      //   href: 'equipment',
      //   auth :null
      // },
      // {
      //   id: null,
      //   name: '기자재 관리',
      //   href: 'equipment/manage',
      //   auth: 'ROLE_사서',
      // },
    ],
  },
  {
    id: 6,
    name: '포인트',
    subs: [
      {
        id: 30,
        name: '랭킹',
        href: 'ranking',
        auth: null,
      },
      {
        id: 31,
        name: '출석부',
        href: 'attandance',
        auth: null,
      },
      {
        id: 32,
        name: '게임',
        href: 'game',
        auth: null,
      },
    ],
  },
  {
    id: 33,
    name: '출석체크',
    subs: [
      {
        id: 34,
        name: '출석체크',
        href: 'autoAttend',
        auth: null,
      },
      {
        id: 35,
        name: '활동인원조사',
        href: 'research',
        auth: null,
      },
      {
        id: 36,
        name: 'admin서기',
        href: 'clerk',
        auth: null,
      },
      {
        id: 37,
        name: 'admin전산관리자',
        href: 'itManager',
        auth: null,
      },
    ],
  },
];

const categoriesHidden = [
  {
    id: 1,
    name: 'KEEPER',
    subs: [
      {
        id: 7,
        name: '동아리 소개',
        href: 'about',
        auth: null,
      },
    ],
  },
];

export { categoriesAll, categoriesHidden };
