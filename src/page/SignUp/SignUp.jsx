import React from 'react';


const SignUp = () => {
  return (
    <div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form className="max-w-md w-full " action="#" method="POST">
          <div>
            
              <div className="mt-4 ">
                <h3 className="text-lg font-medium leading-6 text-gray-900">회원가입</h3>
                <p className="mt-1 text-sm text-gray-600">
                  키퍼 회원가입 페이지입니다!
                </p>
              
              </div>
            

            <div className="mt-8 border-t border-divisionGray pt-4">
              
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                
                <div className="sm:col-span-2">
                  <label htmlFor="user_id" className="block text-sm font-medium ">아이디</label>
                  <div className="mt-2">
                    <input type="text" id="user_id" name="user_id" required 
                      className=" rounded-md   
                        block w-full px-1 py-1 border border-divisionGray
                      focus:outline-mainYellow "
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="password" className="block text-sm font-medium ">비밀번호</label>
                  <div className="mt-2">
                    <input type="password" id="password" name="password" required 
                      className=" rounded-md   
                        block w-full px-1 py-1 border border-divisionGray
                      focus:outline-mainYellow "
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="password2" className="block text-sm font-medium ">비밀번호 확인</label>
                  <div className="mt-2">
                    <input type="password" id="password2" name="password2" 
                      className=" rounded-md   
                        block w-full px-1 py-1 border border-divisionGray
                      focus:outline-mainYellow "
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email_address" className="block text-sm font-medium ">이메일</label>
                  <div className="mt-2">
                    <input type="email" id="email_address" name="email_address" required
                      className=" rounded-md   
                        block w-full px-1 py-1 border border-divisionGray
                      focus:outline-mainYellow"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="user_name" className="block text-sm font-medium ">이름</label>
                  <div className="mt-2">
                    <input type="text" id="user_name" name="user_name" required 
                      className=" rounded-md   
                        block w-full px-1 py-1 border border-divisionGray
                      focus:outline-mainYellow "
                    />
                  </div>
                </div>


                <div className="sm:col-span-2">
                  <label htmlFor="nick_name" className="block text-sm font-medium ">닉네임</label>
                  <div className="mt-2">
                    <input type="text" id="nick_name" name="nick_name" required
                      className=" rounded-md   
                        block w-full px-1 py-1 border border-divisionGray
                      focus:outline-mainYellow"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="studentnumber" className="block text-sm font-medium ">학번</label>
                  <div className="mt-2">
                    <input type="text" id="studentnumber" name="studentnumber" required
                      className=" rounded-md   
                        block w-full px-1 py-1 border border-divisionGray
                      focus:outline-mainYellow"
                    />
                  </div>
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
                className="group relative w-full 
                flex justify-center px-4 py-4 border 
                border-transparent text-sm font-medium 
                rounded-lg text-white bg-mainYellow 
                hover:bg-pointYellow ">
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
