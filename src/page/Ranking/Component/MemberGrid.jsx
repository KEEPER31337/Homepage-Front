import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// API
import memberAPI from 'API/v1/member';

const thumbnailList = [
  'https://avatars.githubusercontent.com/u/23546441?s=400&u=db7abf2929e5518c12189034dc3fed9bda94f0a6&v=4',
  'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
  'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
  'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
];

const MemberGrid = ({ member }) => {
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    memberAPI.getMembers({ token: member.token }).then((data) => {
      setMemberList(data.list);
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
                <img
                  src={
                    member.thumbnail
                      ? member.thumbnail
                      : thumbnailList[index % 4]
                  }
                  alt="profile"
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm ">
                {member.generation
                  ? `Keeper ${member.generation}기`
                  : member.loginId}
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
