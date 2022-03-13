import React from 'react';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileFrame from './Components/Frames/ProfileFrame';
import InfoBox from './Components/InfoBox';
import DeleteUserModal from './Components/Modal/DeleteUserModal';
import actionMember from 'redux/action/member';
import utilAPI from 'API/v1/util';
import memberAPI from 'API/v1/member';
//local
import ipAPI from 'API/v1/ip';
import Modal from './Components/Modal/Modal';

const EditProfile = ({ token, memberInfo, signOut, updateInfo }) => {
  console.log(memberInfo);
  const params = useParams();
  const navigate = useNavigate();

  const deleteUserModalState = useState(false);
  const [deleteUserModal, setDeleteUserModal] = deleteUserModalState;

  const [img, setImg] = useState(null);
  const infoState = useState(null);
  const [info, setInfo] = infoState;

  useEffect(() => {
    utilAPI
      .getThumbnail({ thumbnailId: memberInfo.thumbnailId })
      .then((result) => {
        setImg(result);
      });
  }, [memberInfo]);

  const onProfileImg = () => {
    const imgInput = document.getElementById('ImgUpload');
    imgInput.click();
  };

  const updateImg = (event) => {
    ipAPI.getIp().then((ipAddress) => {
      console.log(ipAddress, event.target.files[0]);
      memberAPI
        .updateThumbnail({
          token,
          ipAddress: ipAddress,
          thumbnail: event.target.files[0],
        })
        .then((result) => {
          if (result.success) {
            console.log(result.data);
            setInfo(result.data);
          } else {
            console.log(`${result.code}:${result.msg}`);
          }
        });
    });
  };

  const headBtns = [
    { text: '돌아가기', onClick: () => navigate(-1) },
    {
      text: '탈퇴',
      onClick: () => {
        setDeleteUserModal(true);
      },
    },
  ];

  const renderImgBtn = () => (
    <button
      className="pr-2 w-4/12 object-contain hover:brightness-75"
      onClick={onProfileImg}
    >
      <img className="w-full h-full rounded-2xl" src={img} />
      <input
        id="ImgUpload"
        type="file"
        accept="image/*"
        onChange={updateImg}
        className="hidden focus:outline-none"
      />
    </button>
  );

  const renderBody = () => (
    <div className="w-full">
      <InfoBox
        type="setInfo"
        params={{ token: token, memberInfo: memberInfo, infoState: infoState }}
      />
      <InfoBox
        type="setEmail"
        params={{ token: token, infoState: infoState }}
      />
      <InfoBox type="setPwd" params={{ token: token }} />
    </div>
  );

  useEffect(() => {
    console.log('info:', info);
    if (info) updateInfo({ memberInfo: info });
  }, [info]);

  if (params.userId != memberInfo.id) {
    return <div>접근할수 없습니다</div>;
  } else {
    return (
      <div>
        <ProfileFrame
          profileBtns={headBtns}
          renderHeadLeft={renderImgBtn}
          renderBody={renderBody}
          memberInfo={memberInfo}
        />
        <DeleteUserModal
          token={token}
          signOut={signOut}
          modalState={deleteUserModalState}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.member.token,
    memberInfo: state.member.memberInfo,
  };
};
const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ memberInfo }) => {
      dispatch(actionMember.updateInfo({ memberInfo }));
    },
    signOut: () => {
      dispatch(actionMember.signOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
