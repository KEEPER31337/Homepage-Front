import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// local
import authAPI from 'API/v1/auth';
import actionMember from 'redux/action/member';
import ResponsiveEditor from 'page/Board/Components/ResponsiveEditor';
import FilesUploadForm from 'page/Board/Components/FilesUploadForm';

//TODO 반응형

const ChallengeWrite = (props) => {
  const [loginInfo, setLoginInfo] = useState({ loginId: '', password: '' });
  // 세연's->
  const content = '';
  const isDark = false; //Dark모드 여부
  const updateContent = '';
  const editorRef = useRef();
  const [files, setFiles] = useState([]);
  const modifyFlag = false;
  const board = false;
  // <-세연's

  return (
    <div className="flex items-center justify-center py-12 dark:text-mainWhite dark:bg-mainBlack">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg text-center font-medium leading-6 text-gray-900">
                미리보기로 여기 띄워줄지, <br />
                (- 사이드바(헤더) 들어가면 비좁을듯)
                <br />
                상단에 미리보기 버튼 만들어서 <br />
                클릭하면 미리보기 할지,
                <br />
                미리보기 안 할지 고민중!!
              </h3>
            </div>
          </div>
          <div className="mt-5 mr-56 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-5 gap-6">
                    <div className="col-span-5 sm:col-span-3">
                      <label
                        for="challenge-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        문제명
                      </label>
                      <input
                        type="text"
                        name="challenge-name"
                        id="challenge-name"
                        autocomplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-5 sm:col-span-1">
                      <label
                        for="category"
                        className="block text-sm font-medium text-gray-700"
                      >
                        유형
                      </label>
                      <select
                        id="category"
                        name="category"
                        autocomplete="category-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>WEB</option>
                        <option>SYSTEM</option>
                        <option>REVERSING</option>
                        <option>CRYPTO</option>
                        <option>FORENSICS</option>
                        <option>MISC</option>
                        <option>OSINT</option>
                        <option>직접 입력.. (유형 추가할 때 어카지)</option>
                      </select>
                    </div>

                    <div className="col-span-5 sm:col-span-5">
                      <label
                        for="content"
                        className="block text-sm font-medium text-gray-700"
                      >
                        문제 설명
                      </label>
                      <div className="w-full h-[50vh] min-h-[500px] inline-block mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md">
                        <ResponsiveEditor
                          content={content}
                          isDark={isDark}
                          updateContent={updateContent}
                          editorRef={editorRef}
                        />
                      </div>
                    </div>

                    <div className="col-span-5 sm:col-span-3">
                      <label
                        for="flag"
                        className="block text-sm font-medium text-gray-700"
                      >
                        플래그
                      </label>
                      <input
                        type="text"
                        name="flag"
                        id="flag"
                        autocomplete="given-name"
                        placeholder="KEEPER{...}"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-5 sm:col-span-3">
                      {/* 빈공간 주고 싶을때 어떻게 하는 지 찾아보기 귀찮아서 내용없는 빈 거 임시로 가져다놓음 */}
                    </div>

                    <div className="col-span-5 sm:col-span-3">
                      <label
                        for="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        배점
                      </label>
                      <input
                        type="text"
                        name="region"
                        id="region"
                        autocomplete="address-level1"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-5 sm:col-span-3">
                      {/* 빈공간 주고 싶을때 어떻게 하는 지 찾아보기 귀찮아서 내용없는 빈 거 임시로 가져다놓음 */}
                    </div>

                    <div className="col-span-5 sm:col-span-5">
                      <label
                        for="postal-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        문제 파일
                      </label>
                      <div className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                        <FilesUploadForm
                          setFiles={setFiles}
                          modifyFlag={modifyFlag}
                          board={board}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    출제
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(ChallengeWrite);
