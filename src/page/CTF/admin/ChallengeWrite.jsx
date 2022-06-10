import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// local
import ChallengeResponsiveEditor from '../Components/ChallengeResponsiveEditor';
import FilesUploadForm from '../Components/ChallengeFilesUploadForm';

// API
import ctfAPI from 'API/v1/ctf';

//TODO 반응형

const ChallengeWrite = ({ member, ctfId }) => {
  // 세연's->
  const content = '';
  const isDark = false; //Dark모드 여부
  const updateContent = '';
  const editorRef = useRef();
  const [files, setFiles] = useState([]);
  // <-세연's

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    challengeName: '',
    category: 0,
    flag: '',
    type: 0,
    score: '',
  });
  const { challengeName, category, flag, type, score } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const onClick = () => {
    ctfAPI
      .createProb({
        title: inputs.challengeName,
        content: 'aaaaa', // TODO
        contestId: ctfId,
        category: {
          id: Number(inputs.category),
        },
        type: {
          id: Number(inputs.type),
        },
        isSolvable: true, // TODO check box 만들기
        score: Number(inputs.score),
        dynamicInfo: {
          maxScore: 1000,
          minScore: 100,
        },
        flag: inputs.flag,
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          console.log(data);
          console.log('files : ', files);
          ctfAPI
            .addProbFile({
              challengeId: data.data.challengeId,
              files: files,
              token: member.token,
            })
            .then((data) => {
              if (data.success) {
                console.log('good', data);
              } else {
                console.log('fail', data);
              }
            });
          navigate(`/ctf/admin/challengeAdmin`);
        } else {
          console.log(data);
          alert('문제 생성 중 오류가 발생하였습니다.');
        }
      });
  };
  const onReset = () => {
    //TODO 리셋적용 안 됨
    setInputs({ challengeName: '', category: 0, flag: '', type: 0, score: '' });
  };

  return (
    <div className="w-full flex flex-col flex-1 p-3">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-3">
            <div className="overflow-hidden sm:rounded-md md:p-10 bg-white">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-5 gap-6">
                  <div className="col-span-5 sm:col-span-3">
                    <label
                      htmlFor="challengeName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      문제명
                    </label>
                    <input
                      type="text"
                      name="challengeName"
                      onChange={onChange}
                      defaultValue={challengeName}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-5 sm:col-span-1">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      유형
                    </label>
                    <select
                      name="category"
                      onChange={onChange}
                      defaultValue={category}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {/* TODO map 사용하는 걸로 수정하자! */}
                      <option value={0}>선택</option>
                      <option value={5}>WEB</option>
                      <option value={2}>SYSTEM</option>
                      <option value={3}>REVERSING</option>
                      <option value={6}>CRYPTO</option>
                      <option value={4}>FORENSICS</option>
                      <option value={1}>MISC</option>
                      <option value={7}>OSINT</option>
                    </select>
                  </div>

                  <div className="col-span-5 sm:col-span-5">
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium text-gray-700"
                    >
                      문제 설명
                    </label>
                    <div className="w-full h-[50vh] min-h-[500px] inline-block mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md">
                      <ChallengeResponsiveEditor
                        content={content}
                        isDark={isDark}
                        updateContent={updateContent}
                        editorRef={editorRef}
                      />
                    </div>
                  </div>

                  <div className="col-span-5 sm:col-span-3">
                    <label
                      htmlFor="flag"
                      className="block text-sm font-medium text-gray-700"
                    >
                      플래그
                    </label>
                    <input
                      type="text"
                      name="flag"
                      placeholder="KEEPER{...}"
                      defaultValue={flag}
                      onChange={onChange}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-5 sm:col-span-2">
                    {/* 빈공간 주고 싶을때 어떻게 하는 지 찾아보기 귀찮아서 내용없는 빈 거 임시로 가져다놓음 */}
                  </div>

                  <div className="col-span-5 sm:col-span-1">
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      타입
                    </label>
                    <select
                      name="type"
                      defaultValue={type}
                      onChange={onChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value={0}>선택</option>
                      <option value={1}>STANDARD</option>
                      <option value={2}>DYNAMIC</option>
                    </select>
                  </div>
                  {/* TODO 타입 선택 후 거기 해당하는 거 나오도록 */}
                  <div className="col-span-5 sm:col-span-1">
                    <label
                      htmlFor="score"
                      className="block text-sm font-medium text-gray-700"
                    >
                      배점
                    </label>
                    <input
                      type="text"
                      name="score"
                      defaultValue={score}
                      onChange={onChange}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-5 sm:col-span-1">
                    <label
                      htmlFor="max score"
                      className="block text-sm font-medium text-gray-700"
                    >
                      최고 점수
                    </label>
                    <input
                      type="text"
                      name="max score"
                      onChange={onChange}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-5 sm:col-span-1">
                    <label
                      htmlFor="min score"
                      className="block text-sm font-medium text-gray-700"
                    >
                      최저 점수
                    </label>
                    <input
                      type="text"
                      name="min score"
                      onChange={onChange}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-5 sm:col-span-5">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      문제 파일
                    </label>
                    <div className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      <FilesUploadForm files={files} setFiles={setFiles} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  onClick={onClick}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-60"
                >
                  출제
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member, ctfId: state.ctf.ctfId };
};

export default connect(mapStateToProps)(ChallengeWrite);
