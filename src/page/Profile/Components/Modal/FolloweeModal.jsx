import { Fragment, useEffect, useState } from 'react';
import Modal from './Modal';
import memberAPI from 'API/v1/member';

const FolloweeModal = ({ modalState, token, navigate }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    memberAPI.getUsersFollowee({ token }).then((res) => {
      if (res.success) {
        setData(res.list);
      }
    });
  }, []);
  return (
    <Modal modalState={modalState}>
      <div className="m-3">
        <div className="py-1 css-font text-xl m-1">팔로우</div>
        <div className="p-[2px] mb-2 bg-mainYellow" />
        <div className="max-h-24 overflow-scroll scrollbar-hide">
          {data.map((item, index) => (
            <Fragment key={index}>
              {index != 0 && (
                <div className="ml-2 p-[1px] mb-2 bg-mainYellow" />
              )}
              <div
                className="mx-2 flex flex-row w-40 h-16 hover:opacity-20"
                onClick={() => navigate(`/profile/${item?.id}`)}
              >
                <img
                  src={item?.thumbnailPath}
                  alt="profile"
                  className="w-1/2 h-full rounded object-cover object-center"
                />
                <div className="flex w-1/2 h-full">
                  <div className="m-auto">{item?.nickName}</div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default FolloweeModal;
