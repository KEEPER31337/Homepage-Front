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
        icon: ViewGridIcon,
      },
      // {
      //   id: 8,
      //   name: '이벤트',
      //   href: 'event',
      //   icon: ViewGridIcon,
      // },
      {
        id: 9,
        name: '동아리 일정',
        href: 'schedule',
        icon: ViewGridIcon,
      },
      {
        id: null,
        name: '스터디',
        href: 'study',
        icon: ViewGridIcon,
      },
      {
        id: null,
        name: 'CTF',
        href: 'ctf',
        icon: ViewGridIcon,
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
        icon: ViewGridIcon,
      },
      {
        id: 6105,
        name: '건의사항',
        href: 'board/6105',
        icon: ViewGridIcon,
      },
      {
        id: 116,
        name: '자유게시판',
        href: 'board/116',
        icon: ViewGridIcon,
      },
      {
        id: 63908,
        name: '익명게시판',
        href: 'board/63908',
        icon: ViewGridIcon,
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
        icon: ViewGridIcon,
      },
      {
        id: 5424,
        name: '스터디 발표자료',
        href: 'board/5424',
        icon: ViewGridIcon,
      },
      {
        id: 2996,
        name: '기술문서',
        href: 'board/2996',
        icon: ViewGridIcon,
      },
      {
        id: 23400,
        name: '회계부',
        href: 'board/23400',
        icon: ViewGridIcon,
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
        icon: ViewGridIcon,
      },
      {
        id: 1377,
        name: '시험',
        href: 'board/1377',
        icon: ViewGridIcon,
      },
    ],
  },
  {
    id: 5,
    name: '서비스',
    subs: [
      {
        id: 26,
        name: '도서 검색',
        href: 'library',
        icon: ViewGridIcon,
      },
      {
        id: 27,
        name: '도서 추가',
        href: 'library/add',
        icon: ViewGridIcon,
      },
      {
        id: 28,
        name: '도서 관리',
        href: 'library/manage',
        icon: ViewGridIcon,
      },
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
        icon: ViewGridIcon,
      },
      {
        id: 31,
        name: '출석부',
        href: 'attandance',
        icon: ViewGridIcon,
      },
      {
        id: 32,
        name: '게임',
        href: 'game',
        icon: ViewGridIcon,
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

        icon: ViewGridIcon,
      },
    ],
  },
];

export { categoriesAll, categoriesHidden };
