import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CheckContent from './CheckContent';
import { useNavigate } from 'react-router-dom';
import clerkAPI from 'API/v1/clerk';

const Content = ({ token, type, typeMemberList, AllmemberList }) => {
  useEffect(() => {
    console.log(typeMemberList);
  }, [typeMemberList]);
  const [changeItems, setChangeItems] = useState(new Set());

  const navigate = useNavigate();
  const reviseClick = () => {
    changeItems.forEach((memberId) => {
      clerkAPI
        .changeType({
          token: token,
          memberId: memberId,
          typeId: type,
        })
        .then((data) => {
          if (data.success) {
            navigate('/clerk');
          }
        });
    });
  };

  return (
    <>
      <div className="bg-violet-50 grid grid-cols-6 w-full h-full px-2 pb-2 text-center">
        {AllmemberList.map((member, index) => (
          <CheckContent
            key={index}
            type={type}
            member={member}
            changeItems={changeItems}
            typeMemberList={typeMemberList}
          />
        ))}
      </div>{' '}
      <div className="w-full bg-white items-center flex justify-end p-2">
        <div className="px-2 pl-4">완료 버튼을 눌러주세요!</div>

        <div
          className="text-center bg-violet-200 hover:bg-violet-200 border-b-4  border-violet-300 w-20 p-1 rounded-md cursor-pointer"
          onClick={reviseClick}
        >
          완료
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { token: state.member.token };
};

export default connect(mapStateToProps)(Content);
