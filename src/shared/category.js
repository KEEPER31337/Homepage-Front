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
        href: 'board',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 6105,
        name: '건의사항',
        href: 'board',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 12,
        name: '자유게시판',
        href: 'board',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 13,
        name: '익명게시판',
        href: 'board',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 14,
        name: '연재글',
        href: 'board',
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
        id: 15,
        name: '발표자료',
        href: 'board',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 16,
        name: '스터디',
        href: 'board',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 17,
        name: '기술문서',
        href: 'board',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 18,
        name: '회계부',
        href: 'board',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 19,
        name: 'KUCIS',
        href: 'board',
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
        id: 20,
        name: '해킹대회정보',
        href: 'board',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 21,
        name: '유용한사이트',
        href: 'board',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 22,
        name: 'Tools',
        href: 'board',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 23,
        name: '외부문서&강의',
        href: 'board',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 24,
        name: '취업&면접',
        href: 'board',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 25,
        name: '시험',
        href: 'board',
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
        name: '도서 신청',
        href: 'library',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 27,
        name: '기자재 신청',
        href: 'library',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 28,
        name: '도서 대여',
        href: 'library',
        description: '',
        icon: ViewGridIcon,
      },
      {
        id: 29,
        name: '기자재 대여',
        href: 'library',
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
