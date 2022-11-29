import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import memberAPI from 'API/v1/member';
import authAPI from 'API/v1/auth';
import ipAPI from 'API/v1/ip';
import actionMember from 'redux/action/member';

//NOTE 프로필 UI
import './fonts.css';
import { MailIcon, PencilAltIcon } from '@heroicons/react/solid';
import Group from './Components/Group';
import DeleteUserModal from './Components/Modal/DeleteUserModal';

//날짜 포멧
import { formatDate } from './Utils/DateFormater';

const msgTextColor = {
  default: { nonDark: 'mainBlack', dark: 'mainWhite' },
  error: { nonDark: 'red-500', dark: 'red-500' },
};

const EditProfile = () => {
  const token = useSelector((store) => store.member.token);
  const memberInfo = useSelector((store) => store.member.memberInfo);

  const dispatch = useDispatch();
  const updateInfo = ({ memberInfo }) => {
    dispatch(actionMember.updateInfo({ memberInfo }));
  };
  const signOut = () => {
    dispatch(actionMember.signOut());
  };

  const navigate = useNavigate();

  const [followCnt, setFollowCnt] = useState(null);

  //탈퇴 모달
  const deleteUserModalState = useState(false);
  const [deleteUserModal, setDeleteUserModal] = deleteUserModalState;

  //프로필 이미지 변경
  const onProfileImg = () => {
    const imgInput = document.getElementById('ImgUpload');
    imgInput.click();
  };
  const updateImg = (event) => {
    if (!event?.target?.files[0]) return;
    else {
      const file = event.target.files[0];
      ipAPI.getIp().then((ipAddress) => {
        memberAPI
          .updateThumbnail({
            token,
            ipAddress: ipAddress,
            thumbnail: file,
          })
          .then((result) => {
            if (result.success) {
              updateInfo({ memberInfo: result.data });
            } else {
            }
          });
      });
    }
  };

  //프로필 정보 변경
  const [name, setName] = useState(memberInfo.name || '');
  const [nickName, setNickName] = useState(memberInfo.nickName || '');
  const [studentId, setStudentId] = useState(memberInfo.studentId || '');
  const [isInfoChanging, setIsInfoChanging] = useState(false);
  const [infoMsg, setInfoMsg] = useState({
    text: '변경사항이 저장되지 않았습니다',
    color: msgTextColor.default.nonDark,
    dark: msgTextColor.default.dark,
  });
  const saveInfo = () => {
    if (isInfoChanging) return;
    else {
      setIsInfoChanging(true);
      memberAPI
        .updateProfile({
          realName: name,
          nickName: nickName,
          studentId: studentId,
          token: token,
        })
        .then((data) => {
          if (!data.success) {
            //실패했을 경우
            setInfoMsg({
              text: `${data.code}:${data.msg}`,
              color: msgTextColor.error.nonDark,
              dark: msgTextColor.error.dark,
            });
          } else {
            setInfoMsg({
              text: '변경사항이 성공적으로 저장되었습니다.',
              color: msgTextColor.default.nonDark,
              dark: msgTextColor.default.dark,
            });
            memberInfo.nickName = nickName;
            updateInfo({ memberInfo });
          }
          setIsInfoChanging(false);
        });
    }
  };

  //이메일 변경
  const [email, setEmail] = useState('');
  const [passEmail, setPassEmail] = useState(false);
  const [emailMsg, setEmailMsg] = useState({
    text: '이메일을 입력해주세요',
    color: msgTextColor.default.nonDark,
    dark: msgTextColor.default.dark,
  });
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [code, setCode] = useState('');
  const [codeMsg, setCodeMsg] = useState({
    text: '',
    color: msgTextColor.default.nonDark,
    dark: msgTextColor.default.dark,
  });
  const [isEmailChanging, setIsEmailChanging] = useState(false);
  const checkEmail = () => {
    const emailAddressRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return emailAddressRegex.test(email);
  };
  const submitEmail = () => {
    if (isSendingCode) return;
    else {
      setIsSendingCode(true);
      authAPI.emailCheck({ emailAddress: email }).then((emailCheckResult) => {
        if (!emailCheckResult.success) {
          setEmailMsg({
            text: `${emailCheckResult.code}:${emailCheckResult.msg}`,
            color: msgTextColor.error.nonDark,
            dark: msgTextColor.error.dark,
          });
        } else if (emailCheckResult.data) {
          setEmailMsg({
            text: '이미 존재하는 이메일입니다.',
            color: msgTextColor.error.nonDark,
            dark: msgTextColor.error.dark,
          });
        } else {
          setEmailMsg({
            text: '해당 메일로 인증코드를 보냈습니다.',
            color: msgTextColor.default.nonDark,
            dark: msgTextColor.default.dark,
          });
          authAPI
            .emailAuth({
              emailAddress: email,
            })
            .then((emailAuthResult) => {
              if (!emailAuthResult.success) {
                setEmailMsg({
                  text: `${emailAuthResult.code}:알 수 없는 오류입니다`,
                  color: msgTextColor.error.nonDark,
                  dark: msgTextColor.error.dark,
                });
              } else {
                setEmailMsg({
                  text: '코드가 성공적으로 전송되었습니다',
                  color: msgTextColor.default.nonDark,
                  dark: msgTextColor.default.dark,
                });
                setCodeMsg({
                  text: '코드를 입력해주세요',
                  color: msgTextColor.default.nonDark,
                  dark: msgTextColor.default.dark,
                });
              }
            });
        }
      });
      setIsSendingCode(false);
    }
  };
  const changeEmail = () => {
    if (isEmailChanging) return;
    else {
      setIsEmailChanging(true);

      memberAPI
        .updateEmail({
          emailAddress: email,
          authCode: code,
          token: token,
        })
        .then((data) => {
          if (!data.success) {
            //실패했을 경우
            setCodeMsg({
              text: `${data.code}:${data.msg}`,
              color: msgTextColor.error.nonDark,
              dark: msgTextColor.error.dark,
            });
          } else {
            setCodeMsg({
              text: '이메일이 성공적으로 변경되었습니다',
              color: msgTextColor.default.nonDark,
              dark: msgTextColor.default.dark,
            });
            memberInfo.emailAddress = email;
            updateInfo({ memberInfo });
            setEmail('');
            setCode('');
          }
          setIsEmailChanging(false);
        });
    }
  };
  useEffect(() => {
    if (checkEmail()) {
      setPassEmail(true);
      setEmailMsg({
        text: '올바른 이메일 입니다',
        color: msgTextColor.default.nonDark,
        dark: msgTextColor.default.dark,
      });
    } else if (email == '') {
      setPassEmail(false);
      setEmailMsg({
        text: '이메일을 입력해주세요',
        color: msgTextColor.default.nonDark,
        dark: msgTextColor.default.dark,
      });
    } else {
      setPassEmail(false);
      setEmailMsg({
        text: '이메일 형식이 아닙니다',
        color: msgTextColor.error.nonDark,
        dark: msgTextColor.error.dark,
      });
    }
  }, [email]);

  //비밀번호 변경
  const [pwdMsg, setPwdMsg] = useState({
    text: '',
    color: msgTextColor.default.nonDark,
    dark: msgTextColor.default.dark,
  });
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [passPwd, setPassPwd] = useState(false);
  const [isPwdChanging, setIsPwdChanging] = useState(false);
  const [isPwdSuccess, setIsPwdSuccess] = useState(0);
  const checkPwd = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
    return passwordRegex.test(password);
  };
  const checkConfirm = () => password == confirm;
  const changePwd = () => {
    if (isPwdChanging || !passPwd) return;
    else {
      setIsPwdChanging(true);
      memberAPI
        .changePassword({ password: password, token: token })
        .then((data) => {
          if (!data.success) {
            setPwdMsg({
              text: `${data.code}:${data.msg}`,
              color: msgTextColor.error.nonDark,
              dark: msgTextColor.error.dark,
            });
          } else {
            setPwdMsg({
              text: '비밀번호가 성공적으로 변경되었습니다',
              color: msgTextColor.default.nonDark,
              dark: msgTextColor.default.dark,
            });
            setIsPwdSuccess(1);
            setPassword('');
            setConfirm('');
          }
          setIsPwdChanging(false);
        });
    }
  };
  useEffect(() => {
    setPassPwd(false);
    if (isPwdSuccess != 0) {
      setIsPwdSuccess((prev) => (prev + 1) % 3);
    } else if (password == '') {
      setPwdMsg({
        text: '',
        color: msgTextColor.default.nonDark,
        dark: msgTextColor.default.dark,
      });
    } else if (!checkPwd()) {
      setPwdMsg({
        text: '8~20자 영문과 숫자를 사용하세요',
        color: msgTextColor.error.nonDark,
        dark: msgTextColor.error.dark,
      });
    } else if (!checkConfirm()) {
      setPwdMsg({
        text: '비밀번호가 일치하지 않습니다',
        color: msgTextColor.error.nonDark,
        dark: msgTextColor.error.dark,
      });
    } else {
      setPwdMsg({
        text: '올바른 비밀번호 입니다 변경버튼을 눌러주세요',
        color: msgTextColor.default.nonDark,
        dark: msgTextColor.default.dark,
      });
      setPassPwd(true);
    }
  }, [password, confirm]);

  useEffect(() => {
    if (!token) return;
    else {
      memberAPI.getUsersFollowCnt({ token }).then((res) => {
        if (res.success) {
          setFollowCnt(res.data);
        }
      });
    }
  }, [token]);

  return (
    <div className="min-h-screen  dark:bg-mainBlack dark:text-mainWhite ">
      <div className="h-full sm:w-full md:w-full lg:w-10/12 xl:w-8/12 container mx-auto pt-10 p-5 justify-center items-center">
        {/* 1. 커스텀 색상 팔레트 */}
        {/* <div className="grid w-auto  place-items-end ">
          <div className="flex">
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-red-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-orange-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-amber-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-blue-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-green-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-violet-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-zinc-400 " />
          </div>
        </div> */}

        <div className="md:flex p-1 bg-backGray dark:bg-darkPoint  border-2 dark:border-transparent shadow-sm">
          {/* NOTE 프로필 */}
          <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-5/12 m-2 ">
            <div className="p-1 bg-white dark:bg-darkPoint">
              {/* 1.  닉네임 + 회원 뱃지 */}
              <div className="flex justify-between m-1">
                {/*닉네임*/}
                <div className="css-font text-5xl m-1">
                  {memberInfo?.nickName}
                </div>
                {/*회원 뱃지*/}
                <div className="flex">
                  {memberInfo.rank && (
                    <div className="mr-2">
                      <Group groupName={memberInfo.rank} />
                    </div>
                  )}
                  {memberInfo.type && (
                    <div className="mr-2">
                      <Group groupName={memberInfo.type} />
                    </div>
                  )}
                  {memberInfo.jobs &&
                    memberInfo.jobs.map((job, index) => (
                      <div key={index} className="mr-2">
                        <Group groupName={job} />
                      </div>
                    ))}
                </div>
              </div>
              {/*구분선*/}
              <div className="p-[2px] mb-2 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300  "></div>
              {/* 2.  프로필 이미지 + 팔로우 + 포인트 */}
              <div className="flex ">
                {/* 2-1. 프로필 이미지 */}
                <div className="w-1/2 m-1">
                  <div className="p-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 rounded">
                    <img
                      src={memberInfo?.thumbnailPath}
                      alt="profile"
                      className="w-full h-full rounded object-center object-cover"
                    />
                  </div>
                </div>

                {/* 2-2(내 프로필). 팔로우 + 포인트 (== 썸네일 옆 프로필 정보) */}
                <div className="w-1/2 flex flex-col justify-between m-1">
                  {/* 2-2-1 팔로우, 팔로워 */}
                  <div className="flex w-full justify-end">
                    <div className="p-2 mr-2 flex flex-row">
                      <div className="text-gray-500 mr-1">팔로워</div>
                      <div className="font-semibold">
                        {followCnt && followCnt.followerNumber}
                      </div>
                    </div>

                    <div className="p-2 flex flex-row">
                      <div className=" text-gray-500 mr-1">팔로우</div>
                      <div className="font-semibold">
                        {followCnt && followCnt.followeeNumber}
                      </div>
                    </div>
                  </div>
                  {/* 2-2-2 포인트 */}
                  <div className="flex w-full justify-between border-3 border-amber-500 bg-amber-300 rounded-md p-1 ">
                    <div className="css-font text-shadow  text-white sm:text-2xl md:text-xl lg:text-2xl text-xl  m-1 ">
                      Point
                    </div>
                    <div className="css-digit-font sm:text-4xl md:text-3xl lg:text-4xl text-3xl text-teal-900 pr-2 text-right">
                      {memberInfo?.point}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3.  프로필(이름, 아이디, 가입일, 생일) + 프로필 수정버튼 */}
              <div className="items-center text-left border-2 shadow p-3 m-1  rounded-md">
                <div className="flex py-1 ">
                  <div className="p-2  w-2/5 text-gray-500">기수</div>
                  <div className="p-2 w-3/5 font-bold">{`Keeper ${memberInfo?.generation}기`}</div>
                </div>
                <div className="flex py-1 ">
                  <div className="p-2  w-2/5  text-gray-500">이메일</div>
                  <div className="p-2 w-3/5 font-bold">
                    {memberInfo?.emailAddress}
                  </div>
                </div>
                <div className="flex py-1 ">
                  <div className="p-2  w-2/5 text-gray-500">가입일</div>
                  <div className="p-2 w-3/5 font-bold">
                    {formatDate({
                      origin: memberInfo?.registerDate,
                      separator: '.',
                    })}
                  </div>
                </div>
                <div className="flex py-1 ">
                  <div className="p-2  w-2/5  text-gray-500">생일</div>
                  <div className="p-2 w-3/5 font-bold">
                    {formatDate({
                      origin: memberInfo?.birthday,
                      separator: '/',
                    })}
                  </div>
                </div>
                {/* 3-1 프로필 수정 + 탈퇴버튼 */}
                <div className="py-1 text-right">
                  <button
                    className="mr-2 border hover:bg-backGray p-2 rounded  text-md font-bold dark:border-mainBlack dark:shadow dark:bg-[#090e1a] dark:hover:bg-mainBlack"
                    onClick={() => navigate(-1)}
                  >
                    돌아가기
                  </button>
                  <button
                    onClick={() => {
                      setDeleteUserModal(true);
                    }}
                    className=" border hover:bg-backGray p-2 rounded  text-md font-bold dark:border-mainBlack dark:shadow dark:bg-[#090e1a] dark:hover:bg-mainBlack"
                  >
                    탈퇴
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* 2. 프로필 수정 컴포넌트  */}
          <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-7/12 m-2">
            <div className=" flex rounded p-1 bg-amber-300 border-2 border-amber-400 shadow-[inset_0_2px_0_1px_#ffffff]">
              <div className=" text-lg ">
                <div className="m-1 p-1  rounded font-bold dark:text-mainBlack">
                  프로필 수정하기
                </div>
              </div>
            </div>
            <div className="mt-2 bg-white dark:bg-darkComponent p-3 shadow-sm rounded-sm ">
              <div>
                <div className="flex sm:flex-row md:flex-col lg:flex-row flex-col w-full m-1">
                  {/* 1. [이름, 닉네임, 학번, 썸네일 수정] */}
                  <div className="w-full items-center text-left border-2 dark:border-2 dark:bg-darkPoint dark:border-darkPoint shadow p-3 m-1  rounded-md">
                    {/* 1-1. 썸네일 컴포넌트 */}
                    <div className="pb-2">
                      {/* 1-1-1 버튼 */}

                      <div className="flex relative w-1/4">
                        <button
                          onClick={onProfileImg}
                          className="shadow-md hover:shadow-lg rounded"
                        >
                          <img
                            src={memberInfo?.thumbnailPath}
                            alt="profile"
                            className=" rounded object-center object-cover"
                          />
                          <div className="absolute bottom-0 right-0 bg-backGray  rounded p-1">
                            <PencilAltIcon className="h-7 w-7 rounded dark:text-amber-500 " />
                          </div>
                          <input
                            id="ImgUpload"
                            type="file"
                            accept="image/*"
                            onChange={updateImg}
                            className="hidden focus:outline-none"
                          />
                        </button>
                      </div>
                    </div>
                    {/* 1-2. 이름, 닉네임 학번 컴포넌트 */}
                    <div>
                      {/* 1-1 이름 */}
                      <div className="flex py-1 ">
                        <label
                          htmlFor="realName"
                          className="p-2 w-4/12 text-gray-500"
                        >
                          이름
                        </label>
                        <input
                          id="realName"
                          type="text"
                          required
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          className="w-8/12 p-2 dark:bg-[#080b14] dark:border-opacity-0 border rounded-lg border-divisionGray focus:border-amber-400 focus:ring-amber-200 focus:ring-2 shadow-[inset_0_2px_0_1px_#f1f5f9] dark:shadow-[inset_0_2px_0_1px_#000000]"
                        />
                      </div>
                      {/* 1-2 닉네임 */}
                      <div className="flex py-1 ">
                        <label
                          htmlFor="nickName"
                          className="p-2 w-4/12 text-gray-500"
                          style={{ wordBreak: 'keep-all' }}
                        >
                          닉네임
                        </label>
                        <input
                          id="nickName"
                          type="text"
                          required
                          value={nickName}
                          onChange={(event) => setNickName(event.target.value)}
                          className="w-8/12 p-2 dark:bg-[#080b14] dark:border-opacity-0 border rounded-lg border-divisionGray focus:border-amber-400 focus:ring-amber-200 focus:ring-2 shadow-[inset_0_2px_0_1px_#f1f5f9] dark:shadow-[inset_0_2px_0_1px_#000000]"
                        />
                      </div>
                      {/* 1-3 학번 */}
                      <div className="flex py-1 ">
                        <label
                          htmlFor="studentId"
                          className="p-2  w-4/12  text-gray-500"
                        >
                          학번
                        </label>
                        <input
                          id="studentId"
                          type="text"
                          required
                          value={studentId}
                          onChange={(event) => setStudentId(event.target.value)}
                          className="w-8/12 p-2 dark:bg-[#080b14] dark:border-opacity-0 border rounded-lg border-divisionGray focus:border-amber-400 focus:ring-amber-200 focus:ring-2 shadow-[inset_0_2px_0_1px_#f1f5f9] dark:shadow-[inset_0_2px_0_1px_#000000]"
                        />
                      </div>
                      <div className="py-1 text-right flex items-center">
                        <label
                          className={`p-2 w-5/6 text-left text-${infoMsg.color} dark:text-${infoMsg.dark} text-sm`}
                          style={{ wordBreak: 'keep-all' }}
                        >
                          {infoMsg.text}
                        </label>
                        <button
                          onClick={saveInfo}
                          className="border bg-backGray hover:bg-gray-200 p-2 rounded text-md font-bold dark:bg-darkPoint dark:hover:bg-mainBlack"
                          style={{ wordBreak: 'keep-all' }}
                        >
                          저장
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* 2. [이메일, 비밀번호 수정] */}
                  <div className="w-full items-center text-left border-2 dark:border-2 dark:bg-darkPoint dark:border-darkPoint shadow p-3 m-1  rounded-md">
                    {/* 2-1. 이메일 컴포넌트 */}
                    <div className="pb-6">
                      {/* 2-1-1 이메일 입력*/}
                      <div className="flex py-1 ">
                        <label
                          htmlFor="emailAddress"
                          className="p-2 w-4/12 text-gray-500"
                          style={{ wordBreak: 'keep-all' }}
                        >
                          이메일
                        </label>
                        <div className="w-8/12 flex">
                          <input
                            id="emailAddress"
                            type="email"
                            name="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full p-2 dark:bg-[#080b14] dark:border-opacity-0 border rounded-l-lg border-divisionGray focus:border-amber-400 focus:ring-amber-200 focus:ring-2 shadow-[inset_0_2px_0_1px_#f1f5f9] dark:shadow-[inset_0_2px_0_1px_#000000]"
                          />
                          <MailIcon
                            onClick={submitEmail}
                            className="bg-backGray dark:bg-mainBlack dark:border-mainBlack hover:bg-gray-200 border border-divisionGray h-full w-10 rounded-r-lg text-amber-300 hover:text-amber-400"
                          />
                        </div>
                      </div>
                      <div
                        className={`p-2 text-left text-${emailMsg.color} dark:text-${emailMsg.dark} text-sm`}
                        style={{ wordBreak: 'keep-all' }}
                      >
                        {emailMsg.text}
                      </div>
                      {/* 2-1-2 인증 코드 */}
                      <div className="flex py-1 ">
                        <label
                          htmlFor="authCode"
                          className="p-2 w-6/12 text-gray-500"
                          style={{ wordBreak: 'keep-all' }}
                        >
                          인증코드
                        </label>
                        <div className="flex justify-end w-full">
                          <input
                            id="authCode"
                            type="text"
                            name="authCode"
                            required
                            value={code}
                            onChange={(event) => setCode(event.target.value)}
                            className="w-full p-2 dark:bg-[#080b14] dark:border-opacity-0 border rounded-lg border-divisionGray focus:border-amber-400 focus:ring-amber-200 focus:ring-2 shadow-[inset_0_2px_0_1px_#f1f5f9] dark:shadow-[inset_0_2px_0_1px_#000000]"
                          />
                        </div>
                      </div>
                      <div className="py-1 text-right flex items-center">
                        <label
                          className={`w-5/6 p-2 text-left text-${codeMsg.color} dark:text-${codeMsg.dark} text-sm`}
                        >
                          {codeMsg.text}
                        </label>
                        <button
                          onClick={changeEmail}
                          className="border bg-backGray hover:bg-gray-200 p-2 rounded  text-md font-bold dark:bg-darkPoint dark:hover:bg-mainBlack"
                          style={{ wordBreak: 'keep-all' }}
                        >
                          저장
                        </button>
                      </div>
                    </div>
                    {/* 2-2. 비밀번호 컴포넌트 */}
                    <div>
                      {/* 2-2-1. 새로운 비밀번호*/}
                      <div className="flex py-1 items-center">
                        <label
                          htmlFor="password"
                          className="p-2 w-5/12 text-gray-500"
                          style={{ wordBreak: 'keep-all' }}
                        >
                          새로운 비밀번호
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          required
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          className="w-3/4 h-11 p-2 dark:bg-[#080b14] dark:border-opacity-0 border rounded-lg border-divisionGray focus:border-amber-400 focus:ring-amber-200 focus:ring-2 shadow-[inset_0_2px_0_1px_#f1f5f9] dark:shadow-[inset_0_2px_0_1px_#000000]"
                        />
                      </div>
                      {/* 2-2-2 비밀번호 재입력 */}
                      <div className="flex py-1 items-center">
                        <label
                          htmlFor="confirmPassword"
                          className="p-2 w-5/12 text-gray-500"
                          style={{ wordBreak: 'keep-all' }}
                        >
                          비밀번호 재입력
                        </label>
                        <input
                          type="password"
                          id="confirm"
                          name="confirm"
                          required
                          value={confirm}
                          onChange={(event) => setConfirm(event.target.value)}
                          className="w-3/4 h-11 p-2 dark:bg-[#080b14] dark:border-opacity-0 border rounded-lg border-divisionGray focus:border-amber-400 focus:ring-amber-200 focus:ring-2 shadow-[inset_0_2px_0_1px_#f1f5f9] dark:shadow-[inset_0_2px_0_1px_#000000]"
                        />
                      </div>

                      <div className="py-1 text-right flex items-center">
                        <label
                          className={`p-2 w-5/6 text-left text-${pwdMsg.color} dark:text-${pwdMsg.dark} text-sm`}
                        >
                          {pwdMsg.text}
                        </label>
                        <button
                          onClick={changePwd}
                          className="border bg-backGray hover:bg-gray-200 p-2 rounded  text-md font-bold dark:bg-darkPoint dark:hover:bg-mainBlack"
                          style={{ wordBreak: 'keep-all' }}
                        >
                          저장
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal창 */}
      <DeleteUserModal
        token={token}
        signOut={signOut}
        modalState={deleteUserModalState}
      />
    </div>
  );
};

export default EditProfile;
