import { connect } from 'react-redux';

import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { StarIcon, ChevronDownIcon } from '@heroicons/react/solid';

// API
import memberAPI from 'API/v1/member';

const people = [
  {
    id: 1,
    name: '장서윤',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: '이다은',
    avatar:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const VoteSelect = (props) => {
  const [voterList, setVoterList] = useState([]);

  useEffect(() => {
    //TODO 나중에 이것만 후보자 리스트 api로 바꾸기!
    memberAPI.getMembers({ token: props.member.token }).then((data) => {
      if (data.success) {
        setVoterList(data.list);
        console.log(voterList);
      }
    });
  }, [props.member]);

  const [selected, setSelected] = useState({
    memberId: 0,
    nickName: '',
    thumbnailPath: '',
  });

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="  relative text-xl font-basic">
            <Listbox.Button className="relative rounded-md  w-full bg-white p-2">
              <span className="flex items-center ">
                {/* 맨처음, 아무것도 클릭하지 않았을때, avatar가 없을때 */}
                {selected.thumbnailPath ? (
                  <img
                    src={selected.thumbnailPath}
                    className="flex-shrink-0 h-7 w-7 rounded-md "
                  />
                ) : (
                  ''
                )}

                <span className="ml-3 block truncate">{selected.nickName}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDownIcon
                  className="h-7 w-7 text-slate-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            {/* 선택박스 */}
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 rounded-md shadow-sm border border-slate-100  w-full bg-white max-h-56  overflow-auto">
                {voterList.map((voter) => (
                  <Listbox.Option
                    key={voter.memberId}
                    className={({ active }) =>
                      classNames(
                        active ? ' bg-slate-200' : 'text-gray-900',
                        'cursor-default select-none relative p-2'
                      )
                    }
                    value={voter}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            src={voter.thumbnailPath}
                            alt=""
                            className="flex-shrink-0 h-6 w-6 rounded-md"
                          />
                          <span
                            className={classNames(
                              selected ? 'font-bold' : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {voter.nickName}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-amber-400' : 'text-amber-400',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <StarIcon className="h-5 w-5 " aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { member: state.member, vote: state.vote };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VoteSelect);
