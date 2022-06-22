import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//local
import memberImage from 'assets/img/memberCircle.svg';
// API
import memberAPI from 'API/v1/member';

const MemberGrid = ({ member }) => {
  const [memberList, setMemberList] = useState([]);

  const handleErrorImg = (e) => {
    e.target.src = memberImage;
  };

  useEffect(() => {
    memberAPI.getMembers({ token: member.token }).then((data) => {
      if (data.success) {
        setMemberList(data.list);
      }
    });
  }, [member]);

  return (
    <div className="bg-mainWhite dark:bg-mainBlack text-mainBlack dark:text-mainYellow">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">memberList</h2>

        <div className="grid grid-cols-2 justify-self-center justify-center justify-items-center content-center items-center gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8 ">
          {memberList?.map((member, index) => (
            <div key={index} href={member.href} className="group w-full">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <Link to={`/profile/${member.memberId}`}>
                  <img
                    src={
                      member.thumbnailPath ? member.thumbnailPath : memberImage
                    }
                    alt="profile"
                    onError={handleErrorImg}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </Link>
              </div>
              <h3 className="mt-4 text-sm ">
                {`Keeper ${
                  member.generation === null ? '?' : member.generation
                }기`}
              </h3>
              <p className="mt-1 text-lg font-medium truncate">
                {member.nickName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};
export default connect(mapStateToProps)(MemberGrid);
