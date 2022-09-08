import React, { Fragment, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';

import { dates, users } from './testdata';
import useWindowDimensions from './WindowDimensions';
import {
  gridAll,
  gridDate,
  gridUser,
  gridAttend,
  gridGis,
} from './datesClassname';

const reasons = ['출석', '지각', '결석', '개인 사정'];

const TableContent = ({ member, state }) => {
  const { height, width } = useWindowDimensions();
  const [size, setSize] = useState(0);
  const [visible, setVisible] = useState(false);
  const [select, setSelect] = useState('출석');
  const isDark = state.darkMode?.isDark;
  const [content, setContent] = useState({
    name: '',
    user: '',
  });

  useEffect(() => {
    setSize(dates.length + 1);
  }, []);

  console.log('dark ', isDark);

  const clicked = (idx, idx2) => {
    console.log(idx, idx2);
    console.log(dates[idx2 - 1], users[idx].name);
    setContent({ name: dates[idx2 - 1], user: users[idx].name });
    setVisible(true);
  };

  const Child = ({ idx, idx2, atten }) => {
    return (
      <div
        className={gridAttend[idx + 2][idx2 + 2]}
        key={idx2}
        onClick={() => {
          clicked(idx, idx2);
        }}
      >
        {atten}
      </div>
    );
  };

  const closeBtn = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="relative rounded-xl overflow-auto w-full">
        <div className="overflow-hidden">
          <div className={gridAll[size]}>
            <div className="row-start-[1] col-start-[1] bg-violet-100 sticky left-0 flex items-center justify-center">
              기수
            </div>
            <div className="row-start-[1] col-start-[2] bg-violet-100 sticky left-[40px] flex items-center justify-center">
              이름
            </div>
            {dates.map((date, idx) => (
              <div key={idx} className={gridDate[idx + 3]}>
                {width < 640 ? date.substr(5) : date}
              </div>
            ))}
            {users.map((user, idx) => (
              <div className={gridGis[idx + 2]} key={idx}>
                {user.gis}
              </div>
            ))}
            {users.map((user, idx) => (
              <div className={gridUser[idx + 2]} key={idx}>
                {user.name}
              </div>
            ))}
            {users.map((user, idx) =>
              user.attend.map((atten, idx2) => (
                <Child atten={atten} idx={idx} idx2={idx2} />
              ))
            )}
          </div>
        </div>
      </div>
      <Transition appear show={visible} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeBtn}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={
                isDark
                  ? 'fixed inset-0 bg-black bg-opacity-25'
                  : 'fixed inset-0 bg-white bg-opacity-25'
              }
            />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-100"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-100"
              >
                <Dialog.Panel
                  className={
                    isDark
                      ? 'w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'
                      : 'w-full max-w-md transform overflow-hidden rounded-2xl bg-black text-violet-400 p-6 text-left align-middle shadow-xl transition-all'
                  }
                >
                  <div className="w-full flex flex-col justify-center items-center ">
                    <div className="text-xl text-bold">{content.name}</div>
                    <div className="text-lg">{content.user}</div>
                    <div className="w-full flex flex-row justify-center items-center">
                      <div>사유</div>
                      <select
                        className={
                          isDark
                            ? 'w-1/2 m-2 text-sm border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 rounded-md bg-mainWhite text-mainBlack'
                            : 'w-1/2 m-2 text-sm border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 rounded-md bg-mainBlack text-violet-200'
                        }
                        onChange={(e) => setSelect(e.target.value)}
                        value={select}
                        required
                      >
                        {reasons.map((reason, idx) => (
                          <option key={idx} className="text-sm">
                            {reason}
                          </option>
                        ))}
                      </select>
                    </div>
                    <textarea
                      rows="4"
                      cols="30"
                      placeholder="개인 사정 사유"
                      className={
                        isDark
                          ? 'border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 rounded-md bg-mainWhite text-mainBlack'
                          : 'border-gray-200 focus:outline-none focus:ring-violet-400 focus:border-violet-400 rounded-md bg-mainBlack text-violet-200'
                      }
                    ></textarea>
                  </div>
                  <div className="mt-4 w-full flex justify-end">
                    <button
                      type="button"
                      className="mx-2 inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                      onClick={closeBtn}
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                      onClick={closeBtn}
                    >
                      수정
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const mapStateToProps = (state) => {
  return { member: state.member, state: state };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContent);
