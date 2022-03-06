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
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 8,
        name: '이벤트',
        href: 'event',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 9,
        name: '동아리 일정',
        href: 'schedule',
        description: '',
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
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 6105,
        name: '건의사항',
        href: 'board/6105',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 116,
        name: '자유게시판',
        href: 'board/116',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 63908,
        name: '익명게시판',
        href: 'board/63908',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 147718,
        name: '연재글',
        href: 'board/147718',
        description: '',
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
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 105900,
        name: '스터디',
        href: 'board/105900',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 2996,
        name: '기술문서',
        href: 'board/2996',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 23400,
        name: '회계부',
        href: 'board/23400',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 34608,
        name: 'KUCIS',
        href: 'board/34608',
        description: '',
        icon: ViewGridIcon,
      },
    ],
  },
  {
    id: 4,
    name: '정보',
    subs: [
      {
        id: 508,
        name: '해킹대회정보',
        href: 'board/508',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 648,
        name: '유용한사이트',
        href: 'board/648',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 647,
        name: 'Tools',
        href: 'board/647',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 662,
        name: '외부문서&강의',
        href: 'board/662',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 81570,
        name: '취업&면접',
        href: 'board/81570',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 1377,
        name: '시험',
        href: 'board/1377',
        description: '',
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
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 27,
        name: '도서 추가',
        href: 'library/add',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 28,
        name: '도서 관리',
        href: 'library/manage',
        description: '',
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
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 31,
        name: '출석부',
        href: 'attandance',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 32,
        name: '게임',
        href: 'game',
        description: '',
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
        description: '',
        icon: ViewGridIcon,
      },
    ],
  },
];

export { categoriesAll, categoriesHidden };
