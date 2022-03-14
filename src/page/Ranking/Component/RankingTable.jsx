import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

// local
import rankAPI from 'API/v1/rank';
import SimpleNotification from 'shared/SimpleNotification';
import iconPencilAlt from 'assets/img/icons/pecil-alt.svg';
import imgMemberCircle from 'assets/img/memberCircle.svg';

const headers = ['랭킹', '이름', '포인트', '직책'];

const AttandanceTable = ({ member }) => {
  const [rankList, setRankList] = useState([{}]);

  const successNotiRef = useRef({});
  const failNotiRef = useRef({});

  useEffect(() => {
    rankAPI
      .getRank({
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setRankList(data.list);
          console.log(data.list);
        }
      });
  }, [member]);

  return (
    <div className="min-w-full flex flex-col">
      <div className="min-w-full overflow-x-auto">
        <div className="align-middle inline-block min-w-full sm:px-0 lg:px-8">
          <div className="shadow overflow-hidden sm:rounded-lg border-b border-gray-200 dark:border-darkPoint">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-gray-500 dark:bg-darkPoint dark:text-mainYellow">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y bg-white divide-gray-200 dark:bg-darkComponent dark:divide-darkPoint">
                {rankList.map((member, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {member.rank ? member.rank : '?'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={
                              member.thumbnail
                                ? member.thumbnail
                                : imgMemberCircle
                            }
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-xl font-medium text-gray-900 dark:text-mainWhite">
                            {member.nickName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="w-xl px-6 py-4 whitespace-nowrap">
                      <div className="text-md text-gray-900 dark:text-mainWhite">
                        {member.point}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* TODO : backend 업데이트 되면 동기화 */}
                      {member.memberJobs?.map((job) => (
                        <span className="px-2 mx-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {job.id ? job.id : ''}
                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-500">
                      <span className="px-2 inline-flex text-xl leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {member.rank ? `${member.rank}등` : ''}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <SimpleNotification
        ref={successNotiRef}
        isSuccess={true}
        msg={'출석 메세지가 저장되었습니다.'}
      />
      <SimpleNotification
        ref={failNotiRef}
        isSuccess={false}
        msg={'출석 메세지 저장에 실패하였습니다.'}
      />
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};
export default connect(mapStateToProps)(AttandanceTable);
