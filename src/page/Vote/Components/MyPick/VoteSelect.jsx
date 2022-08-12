import { connect } from 'react-redux';

import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { StarIcon, ChevronDownIcon } from '@heroicons/react/solid';

// API
import voteAPI from 'API/v1/vote';

const BOSS = 1; // 회장
const MIDDLEBOSS = 2; // 부회장
const MONEYMEN = 7; // 총무

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const VoteSelect = (props) => {
  const [voterList, setVoterList] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    switch (props.job) {
      case BOSS:
        voteAPI
          .getCandidate({
            token: props.member.token,
            eid: props.vote.voteId,
            jid: BOSS,
          })
          .then((data) => {
            if (data.success) {
              setVoterList(data.list);
            }
          });

        break;
      case MIDDLEBOSS:
        voteAPI
          .getCandidate({
            token: props.member.token,
            eid: props.vote.voteId,
            jid: MIDDLEBOSS,
          })
          .then((data) => {
            if (data.success) {
              setVoterList(data.list);
            }
          });
        break;
      case MONEYMEN:
        voteAPI
          .getCandidate({
            token: props.member.token,
            eid: props.vote.voteId,
            jid: MONEYMEN,
          })
          .then((data) => {
            if (data.success) {
              setVoterList(data.list);
            }
          });
        break;

      default:
        break;
    }
  }, []);

  //selected바뀔때마다 부모로 넘겨주게.
  useEffect(() => {
    props.MyPick(selected.candidateId);
  }, [selected]);

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

                <span className="ml-3 block truncate">{selected.realName}</span>
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
                    key={voter.candidateId}
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
                            {voter.realName}
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
