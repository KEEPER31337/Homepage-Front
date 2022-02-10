import React from 'react';
import {useEffect, useState} from "react";

const SignUp = () => {
  
  //아이디, 비밀번호, 비밀번호 확인, 이메일, 이름, 닉네임, 학번
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [nickName, setNickName] = useState("")
  const [studentNumber, setStudentNumber] = useState("")

  //오류메시지 상태저장
  const [IdMessage, setIdMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("")
  const [emailMessage, setEmailMessage] = useState("")
  const [userNameMessage, setUserNameMessage] = useState("")
  const [nickNameMessage, setNickNameMessage] = useState("")
  const [studentNumberMessage, setStudentNumberMessage] = useState("")

  //유효성 검사
  const [isId, setIsId] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isUserName, setIsUserName] = useState(false)
  const [isNickName, setIsNickName] = useState(false)
  const [isStudentNumber, setIsStudentNumber] = useState(false)
  
  //아이디
  const onChangeId = (e)=>{
    setId(e.target.value);
    

    if(e.target.value === ""){
      setIdMessage('필수 정보입니다. or 이미 사용중이거나 탈퇴한 아이디입니다(아이디 존재 체크)')
      setIsId(false)
    }
    else{
      setIdMessage('멋진 아이디네요!')
      setIsId(true)
    }
  }

  //비밀번호
  const onChangePassword = (e)=>{
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/
    
    setPassword(e.target.value);
    

    if(!passwordRegex.test(e.target.value)){
      setPasswordMessage('6자 이상이어야 하며, 영문과 숫자를 사용하세요.')
      setIsPassword(false)
    }
    else{
      setPasswordMessage('올바른 비밀번호 형식입니다.')
      setIsPassword(true)
    }
  }

  // 비밀번호 확인
  const onChangePasswordConfirm = (e)=>{
    setPasswordConfirm(e.target.value);

    
      if(password === (e.target.value)){
        setPasswordConfirmMessage('비밀번호가 일치합니다.')
        setIsPasswordConfirm(true)
      }
      else{
        setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.')
        setIsPasswordConfirm(false)
      }
  }

  // 이메일
  const onChangeEmail = (e)=>{
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    setEmail(e.target.value)

    if (!emailRegex.test(e.target.value)) {
      setEmailMessage('이메일 형식이 틀렸습니다')
      setIsEmail(false)
    } else {
      setEmailMessage('올바른 이메일 형식입니다.')
      setIsEmail(true)
    }
  }
  // 이름
  const onChangeUserName = (e)=>{
    const userNameRegex = /^[가-힣]+$/
    setUserName(e.target.value)

    if (!userNameRegex.test(e.target.value)) {
      setUserNameMessage('한글 입력만 가능합니다')
      setIsUserName(false)
    } else {
      setUserNameMessage('올바른 이름 형식입니다.')
      setIsUserName(true)
    }
  }
  // 닉네임
  const onChangeNickName = (e)=>{
    const nickNameRegex = /^[가-힣]+$/
    setNickName(e.target.value)

    if (!nickNameRegex.test(e.target.value)) {
      setNickNameMessage('한글 입력만 가능합니다')
      setIsNickName(false)
    } else {
      setNickNameMessage('올바른 닉네임 형식입니다.')
      setIsNickName(true)
    }
  }

  // 학번
  const onChangeStudentNumber = (e)=>{
    const studentNumberRegex = /^[0-9]+$/
    setStudentNumber(e.target.value)

    if (!studentNumberRegex.test(e.target.value)) {
      setStudentNumberMessage('숫자 입력만 가능합니다')
      setIsStudentNumber(false)
    } else {
      setStudentNumberMessage('올바른 학번 형식입니다.')
      setIsStudentNumber(true)
    }
  }
 
  

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:text-mainWhite dark:bg-mainBlack" >
        <form className="max-w-md w-screen " action="#" method="POST">
          <div>
            
              <div className="mt-4 ">
                <h3 className="text-lg font-medium leading-6 ">회원가입</h3>
                <p className="mt-1 text-sm">
                  키퍼 회원가입 페이지입니다!
                </p>
              
              </div>
            

            <div className="mt-8 border-t border-divisionGray pt-4">
              
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                
                <div className="sm:col-span-2">
                  <label htmlFor="id" className="block text-sm font-medium ">아이디</label>
                  <div className="mt-2 ">
                    <input type="text" id="id" name="id" required 
                      value={id}
                      onChange = {onChangeId}
                      className=" rounded-md   
                        block w-full px-1 py-1 border border-divisionGray dark:border-transparent
                      focus:outline-mainYellow dark:bg-darkPoint dark:outline-white autofill:bg-yellow-200"
                    />
                  </div>
                  <div className={`block text-sm font-medium text${isId ? '-pointYellow' : '-red-500'}`}>{IdMessage}</div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="password" className="block text-sm font-medium ">비밀번호</label>
                  <div className="mt-2">
                    <input type="password" id="password" name="password" required 
                      value = {password}
                      onChange = {onChangePassword}
                      className=" rounded-md   
                        block w-full px-1 py-1 border border-divisionGray dark:border-transparent
                      focus:outline-mainYellow dark:bg-darkPoint dark:outline-white"
                    />
                  </div>
                  
                  <div className={`block text-sm font-medium text${isPassword ? '-pointYellow' : '-red-500'}`}>{passwordMessage}</div>
                </div>

                
                <div className="sm:col-span-2">
                  <label htmlFor="passwordConfirm" className="block text-sm font-medium ">비밀번호 확인</label>
                  <div className="mt-2">
                    <input type="password" id="passwordConfirm" name="passwordConfirm" 
                      value={passwordConfirm}
                      onChange={onChangePasswordConfirm}
                      className=" rounded-md   
                        block w-full px-1 py-1 border border-divisionGray dark:border-transparent
                      focus:outline-mainYellow dark:bg-darkPoint dark:outline-white"
                    />
                  </div>
                  <div className={`block text-sm font-medium text${isPasswordConfirm ? '-pointYellow' : '-red-500'}`}>{passwordConfirmMessage}</div>
                  
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email_address" className="block text-sm font-medium ">이메일</label>
                  <div className="mt-2">
                    <input type="email" id="email_address" name="email_address" required
                      value={email}
                      onChange={onChangeEmail}
                      className=" rounded-md   
                        block w-full px-1 py-1 border border-divisionGray dark:border-transparent
                      focus:outline-mainYellow dark:bg-darkPoint dark:outline-white"
                    />
                  </div>
                  <div className={`block text-sm font-medium text${isEmail ? '-pointYellow' : '-red-500'}`}>{emailMessage}</div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="userName" className="block text-sm font-medium ">이름</label>
                  <div className="mt-2">
                    <input type="text" id="userName" name="userName" required 
                      value = {userName}
                      onChange={onChangeUserName}
                      className=" rounded-md   
                        block w-full px-1 py-1 border border-divisionGray dark:border-transparent
                      focus:outline-mainYellow dark:bg-darkPoint dark:outline-white"
                    />
                  </div>
                  <div className={`block text-sm font-medium text${isUserName ? '-pointYellow' : '-red-500'}`}>{userNameMessage}</div>
                </div>


                <div className="sm:col-span-2">
                  <label htmlFor="nickName" className="block text-sm font-medium ">닉네임</label>
                  <div className="mt-2">
                    <input type="text" id="nickName" name="nickName" required
                      value = {nickName}
                      onChange={onChangeNickName}
                      className=" rounded-md   
                        block w-full px-1 py-1 border border-divisionGray dark:border-transparent
                      focus:outline-mainYellow dark:bg-darkPoint dark:outline-white"
                    />
                  </div>
                  <div className={`block text-sm font-medium text${isNickName ? '-pointYellow' : '-red-500'}`}>{nickNameMessage}</div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="studentNumber" className="block text-sm font-medium ">학번</label>
                  <div className="mt-2">
                    <input type="text" id="studentNumber" name="studentNumber" required 
                      value={studentNumber}
                      onChange={onChangeStudentNumber}
                      className=" rounded-md   
                        block w-full px-1 py-1 border border-divisionGray dark:border-transparent
                      focus:outline-mainYellow dark:bg-darkPoint dark:outline-white"
                    />
                  </div>
                  <div className={`block text-sm font-medium text${isStudentNumber ? '-pointYellow' : '-red-500'}`}>{studentNumberMessage}</div>
                </div>


                <div>
                  <label htmlFor="profile_image" className="block text-sm font-medium ">프로필 사진</label>
                  <div className="mt-3">
                       <input type="file" id ="profile_image" name = "profile_image" accept="image/*"/>
                    </div>
                </div>

               

                <div>
                  <label htmlFor="birthday" className="block text-sm font-medium ">생일</label>
                  <div className="mt-2">
                    <input type="date" id="date_birthday" name="birthday" 
                      className=" rounded-md   
                        block w-full px-1 py-1 border border-divisionGray
                      focus:outline-mainYellow"
                    />
                  </div>
                </div>

              </div>
            </div>


            
            <div className="mt-10 border-t border-divisionGray pt-10">
              <button
                type="submit"
                disabled={!(isId && isEmail && isPassword && isPasswordConfirm && isNickName && isUserName && isStudentNumber)}
                className={`group relative w-full 
                flex justify-center px-4 py-4 border 
                border-transparent text-lg font-bold
                rounded-lg text-white 
                 
                ${(isId && isEmail && isPassword && isPasswordConfirm && isNickName && isUserName && isStudentNumber) ? 'bg-mainYellow hover:bg-pointYellow' : 'bg-divisionGray dark:bg-darkPoint'}`}>
                회원가입
              </button>
            </div>
            
          </div>

          
          
              
          
        </form>
      </div>
    </div>
  )
    ;
};

export default SignUp;
