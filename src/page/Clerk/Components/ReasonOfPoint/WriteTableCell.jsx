import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const WriteTableCell = ({
  no,
  appendData,
  setAppendData,
  Preason,
  Mreason,
  memberList,
  isChanged,
  state,
}) => {
  const [oneData, setOneData] = useState(appendData[no - 1]);
  const [searchMemberList, setSearchMemberList] = useState(memberList); //자동완성으로 보이는 회원들 리스트
  const [selectedMember, setSelectedMember] = useState();
  const [keyword, setKeyword] = useState('');

  const searchHandler = (e) => {
    setSearchMemberList(
      memberList.filter((member) => member?.nickName.includes(keyword))
    );
  };
  useEffect(() => {
    setOneData(appendData[0]);
    setSelectedMember(null);
    setKeyword('');
  }, [isChanged]);

  useEffect(() => {
    //한 셀의 데이터 변경시 최종 데이터 리스트 업데이트
    setAppendData(
      appendData.map((data) => {
        if (data.no === no) return oneData;
        return data;
      })
    );
  }, [oneData]);

  //pm이 바뀔 때
  useEffect(() => {
    if (oneData.pm === 'p') {
      setOneData({
        ...oneData,
        index: 0,
        typeId: Preason[0]?.id,
        point: Preason[0]?.merit,
      });
    } else {
      setOneData({
        ...oneData,
        index: 0,
        typeId: Mreason[0]?.id,
        point: Mreason[0]?.merit,
      });
    }
  }, [oneData.pm]);

  //reason이 바뀔 때 point 값도 같이 업데이트 되도록
  useEffect(() => {
    if (oneData.pm === 'p') {
      setOneData({ ...oneData, point: Preason[oneData.index]?.merit });
    } else {
      setOneData({ ...oneData, point: Mreason[oneData.index]?.merit });
    }
  }, [oneData.typeId]);

  //회원정보 선택 시 데이터 업데이트
  useEffect(() => {
    setOneData({ ...oneData, member: selectedMember });
  }, [selectedMember]);

  return (
    <p
      key={no}
      className="flex w-full items-center border mt-1 shadow-sm rounded-md dark:border-gray-600"
    >
      <p className=" min-w-[2em] p-1 text-center">{no}</p>
      <div className="flex flex-col w-full">
        <div className="flex w-full">
          <p className="border-x min-w-[7em] p-1 dark:border-gray-600">
            <input
              type="date"
              className="w-full inline-block px-1 py-2 text-xs border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 rounded-md dark:bg-mainBlack dark:border-darkComponent"
              value={oneData.date}
              onChange={(e) => setOneData({ ...oneData, date: e.target.value })}
              menu-class="w-100"
              required
            />
          </p>
          <p className="border-x min-w-[7em] w-full sm:w-[10em] p-1 dark:border-gray-600">
            <input
              type="text"
              className={
                (selectedMember ? 'text-violet-400 font-bold' : '') +
                ' peer inline-block px-3 py-2 w-full text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent'
              }
              value={selectedMember ? selectedMember.nickName : keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                searchHandler(e);
              }}
              onFocus={(e) => {
                searchHandler(e);
              }}
              onKeyUp={(e) => {
                //selectedMember가 설정된 상태에서 backspace 키를 누른 경우
                if (selectedMember && e.keyCode === 8) setSelectedMember();
              }}
              required
            />

            <div className="absolute z-[99] border-2 rounded-md shadow-md mt-1 bg-mainWhite w-[50vw] max-w-[20em] max-h-[10em] p-1 gap-1 grid-cols-1 sm:grid-cols-2 overflow-y-auto hidden peer-focus:grid hover:grid dark:bg-darkPoint dark:border-gray-600">
              {searchMemberList?.length !== 0 ? (
                searchMemberList.map((member, index) => (
                  <button
                    key={index}
                    type="button"
                    className="border rounded-sm p-1 flex hover:bg-slate-50 dark:border-gray-600 dark:hover:bg-darkComponent"
                    onClick={(e) => {
                      //console.log(member);
                      setSelectedMember(member);
                    }}
                  >
                    <div className="border shrink rounded-full h-8 w-8 overflow-hidden dark:border-gray-600">
                      <img src={member.thumbnailPath} alt="thumbnail" />
                    </div>
                    <div className="grow px-1 flex justify-center items-center h-full">
                      {member?.nickName}
                    </div>
                    <div className="shrink flex items-end text-gray-300 text-xs ">
                      {member?.generation}기
                    </div>
                  </button>
                ))
              ) : (
                <div className="w-full text-center text-slate-400">
                  회원이 없습니다.
                </div>
              )}
            </div>
          </p>
          <p className="min-w-[6em] w-[6em] sm:w-[10em] p-1">
            <select
              className={
                (oneData.pm === 'p' ? 'text-green-500' : 'text-red-500') +
                ' w-full inline-block pl-3  py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent'
              }
              onChange={(e) => setOneData({ ...oneData, pm: e.target.value })}
              value={oneData.pm}
              required
            >
              <option className="text-red-500" value="m">
                벌점
              </option>
              <option className="text-green-500" value="p">
                상점
              </option>
            </select>
          </p>
          <p className="hidden sm:flex flex-col gap-1 border-x w-full p-1 dark:border-gray-600">
            <select
              className="w-full  pl-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
              onChange={(e) => {
                //console.log(e.target.selectedIndex);
                setOneData({
                  ...oneData,
                  index: e.target.selectedIndex,
                  typeId: e.target.value,
                });
              }}
              value={oneData.typeId}
              required
            >
              {oneData.pm === 'p'
                ? Preason.map((reason, index) => (
                    <option key={index} value={reason.id}>
                      {reason.detail}
                    </option>
                  ))
                : Mreason.map((reason, index) => (
                    <option key={index} value={reason.id}>
                      {reason.detail}
                    </option>
                  ))}
            </select>
          </p>
          <p className="hidden sm:flex min-w-[6em] w-[6em] p-1 justify-center items-center">
            {oneData.pm === 'p'
              ? Preason[oneData.index]?.merit
              : Mreason[oneData.index]?.merit}
            점
          </p>
        </div>
        <div
          name="모바일 사유"
          className="flex border-t border-l bg-slate-100 p-1 items-center sm:hidden dark:bg-darkComponent dark:border-gray-600"
        >
          <span className="w-[4em] text-center font-bold">사유</span>
          <div className="flex flex-col w-full gap-1">
            <select
              className="w-full inline-block pl-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
              onChange={(e) =>
                setOneData({
                  ...oneData,
                  index: e.target.selectedIndex,
                  typeId: e.target.value,
                })
              }
              value={oneData.typeId}
              required
            >
              {oneData.pm === 'p'
                ? Preason.map((reason, index) => (
                    <option key={index} value={reason.id}>
                      {reason.detail}
                    </option>
                  ))
                : Mreason.map((reason, index) => (
                    <option key={index} value={reason.id}>
                      {reason.detail}
                    </option>
                  ))}
            </select>
          </div>
          <p className="min-w-[4em] w-[4em] flex items-center px-1 justify-center">
            {oneData.pm === 'p'
              ? Preason[oneData.index]?.merit
              : Mreason[oneData.index]?.merit}
            점
          </p>
        </div>
      </div>
    </p>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(WriteTableCell);
