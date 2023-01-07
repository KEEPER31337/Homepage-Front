import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// local
import ChallengeResponsiveEditor from '../Components/ChallengeResponsiveEditor';
import ChallengeFileUploadForm from '../Components/ChallengeFileUploadForm';
import AuthModal from '../Components/AuthModal';
import AlertModal from '../Components/AlertModal';

// API
import ctfAPI from 'API/v1/ctf';
import CategorySelector from '../Components/CategorySelector';

//TODO 반응형

const ChallengeWrite = ({ member, ctfId }) => {
  //권한 없을시 나가게
  const [auth, setAuth] = useState(['ROLE_회장', 'ROLE_출제자']);
  const jobs = member?.memberInfo?.jobs;
  const ModalRef = useRef({});

  const MAX_SUBMIT_COUNT_RANGE = {
    min: 1,
    max: 50,
    default: 15,
  };

  // 모달
  const errorModalRef = useRef({});

  useEffect(() => {
    if (!jobs?.some((i) => auth.includes(i))) {
      ModalRef.current.open();
    }
  }, []);

  // 세연's->
  const isDark = false; //Dark모드 여부
  const editorRef = useRef();
  const [files, setFiles] = useState([]);
  // <-세연's

  const [content, setContent] = useState('');
  const [solvable, setSolvable] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const updateContent = () => {
    const editorInstance = editorRef.current.getInstance();
    const getContent_md = editorInstance.getMarkdown();
    setContent(getContent_md);
  };

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    challengeName: '',
    categories: [],
    flag: '',
    maxSubmitCount: MAX_SUBMIT_COUNT_RANGE.default,
    type: 0,
    score: '',
    maxScore: '',
    minScore: '',
  });
  const {
    challengeName,
    categories,
    flag,
    maxSubmitCount,
    type,
    score,
    maxScore,
    minScore,
  } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {
    if (type == 1) {
      setInputs({ ...inputs, ['maxScore']: '', ['minScore']: '' });
    } else if (type == 2) {
      setInputs({ ...inputs, ['score']: '' });
    }
  }, [type]);

  let typeScore;
  if (type == 1) {
    typeScore = (
      <div className="col-span-5 sm:col-span-1">
        <label
          htmlFor="score"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          배점
        </label>
        <input
          type="text"
          name="score"
          onChange={onChange}
          className="mt-1 dark:bg-darkComponent dark:border-darkComponent focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    );
  } else if (type == 2) {
    typeScore = (
      <>
        <div className="col-span-5 sm:col-span-1">
          <label
            htmlFor="minScore"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            최저 점수
          </label>
          <input
            type="text"
            name="minScore"
            onChange={onChange}
            className="mt-1 dark:bg-darkComponent dark:border-darkComponent focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-5 sm:col-span-1">
          <label
            htmlFor="maxScore"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            최고 점수
          </label>
          <input
            type="text"
            name="maxScore"
            onChange={onChange}
            className="mt-1 dark:bg-darkComponent dark:border-darkComponent focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </>
    );
  }

  const onClick = () => {
    if (challengeName == '') {
      setErrorMsg('제목을 넣어주세요');
      errorModalRef.current.open();
    } else if (categories.length === 0) {
      setErrorMsg('유형을 선택해주세요');
      errorModalRef.current.open();
    } else if (content == '') {
      setErrorMsg('문제 설명을 넣어주세요');
      errorModalRef.current.open();
    } else if (flag == '') {
      setErrorMsg('플래그를 넣어주세요');
      errorModalRef.current.open();
    } else if (flag.length > 200) {
      setErrorMsg('플래그는 200이하의 글자수만 가능합니다.');
      errorModalRef.current.open();
    } else if (maxSubmitCount == '') {
      setErrorMsg('최대 제출 횟수 넣어주세요');
      errorModalRef.current.open();
    } else if (
      maxSubmitCount < MAX_SUBMIT_COUNT_RANGE.min ||
      maxSubmitCount > MAX_SUBMIT_COUNT_RANGE.max
    ) {
      setErrorMsg('최대 제출 횟수 1이상 50이하의 값만 가능합니다.');
      errorModalRef.current.open();
    } else if (type == 0) {
      setErrorMsg('타입을 선택해주세요');
      errorModalRef.current.open();
    } else if (score == '' && (maxScore == '' || minScore == '')) {
      setErrorMsg('점수를 넣어주세요');
      errorModalRef.current.open();
    } else if (isNaN(score) || isNaN(maxScore) || isNaN(minScore)) {
      setErrorMsg('점수는 숫자만 가능합니다');
      errorModalRef.current.open();
    } else if (Number(maxScore) < Number(minScore)) {
      setErrorMsg('최고점수는 최저점수보다 더 커야합니다');
      errorModalRef.current.open();
    } else {
      ctfAPI
        .createProb({
          title: challengeName,
          content: content,
          contestId: ctfId,
          categories: categories,
          type: {
            id: Number(type),
          },
          isSolvable: solvable,
          score: Number(score),
          dynamicInfo: {
            maxScore: Number(maxScore),
            minScore: Number(minScore),
          },
          flag: flag,
          maxSubmitCount,
          token: member.token,
        })
        .then((data) => {
          if (data.success) {
            // console.log(data);
            if (files.length != 0) {
              ctfAPI
                .addProbFile({
                  challengeId: data.data.challengeId,
                  files: files,
                  token: member.token,
                })
                .then((data) => {
                  if (data.success) {
                    // console.log('good', data);
                  } else {
                    // console.log('fail', data);
                  }
                });
            }
            navigate(`/ctf/admin/challengeAdmin`);
          } else {
            // console.log(data);
            alert('문제 생성 중 오류가 발생하였습니다.');
          }
        });
    }
  };

  return (
    <div className="w-full flex flex-col flex-1 p-3">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-3">
            <div className="overflow-hidden sm:rounded-md md:p-10 bg-white dark:bg-black dark:text-white">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-5 gap-6">
                  <div className="col-span-5 sm:col-span-3">
                    <label
                      htmlFor="challengeName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      문제명
                    </label>
                    <input
                      type="text"
                      name="challengeName"
                      onChange={onChange}
                      defaultValue={challengeName}
                      className="mt-1 dark:bg-darkComponent dark:border-darkComponent focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-5 sm:col-span-1">
                    <CategorySelector
                      categories={categories}
                      onChange={onChange}
                    />
                  </div>

                  <div className="col-span-5 sm:col-span-5">
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      문제 설명
                    </label>
                    <div className="w-full  h-[50vh] min-h-[500px] inline-block mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md">
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
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {`플래그 (${flag.length}/200)`}
                    </label>
                    <input
                      type="text"
                      name="flag"
                      placeholder="KEEPER{...}"
                      defaultValue={flag}
                      onChange={onChange}
                      className="mt-1  dark:bg-darkComponent dark:border-darkComponent focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-5 sm:col-span-2">
                    {/* 빈공간 주고 싶을때 어떻게 하는 지 찾아보기 귀찮아서 내용없는 빈 거 임시로 가져다놓음 */}
                  </div>

                  <div className="col-span-5 sm:col-span-1">
                    <label
                      htmlFor="maxSubmitCount"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      최대 제출 횟수
                    </label>
                    <input
                      type="number"
                      name="maxSubmitCount"
                      min={MAX_SUBMIT_COUNT_RANGE.min}
                      max={MAX_SUBMIT_COUNT_RANGE.max}
                      defaultValue={maxSubmitCount}
                      onChange={onChange}
                      className="mt-1  dark:bg-darkComponent dark:border-darkComponent focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-5 sm:col-span-1">
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      타입
                    </label>
                    <select
                      name="type"
                      defaultValue={type}
                      onChange={onChange}
                      className="mt-1 dark:bg-darkComponent dark:border-darkComponent block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value={0}>선택</option>
                      <option value={1}>STANDARD</option>
                      <option value={2}>DYNAMIC</option>
                    </select>
                  </div>

                  {typeScore}

                  <div className="col-span-5 sm:col-span-5">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      문제 파일
                    </label>
                    <div className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                      <ChallengeFileUploadForm
                        files={files}
                        setFiles={setFiles}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between my-8">
                  <div className="flex py-2">
                    <input
                      name="solvable"
                      type="checkbox"
                      className="w-7 h-7 text-mainYellow focus:ring-mainYellow rounded border-gray-400 dark:border-darkComponent dark:bg-darkComponent dark:checked:bg-mainYellow mr-2"
                      /* checked={true} */
                      value={solvable}
                      onChange={() => {
                        setSolvable(!solvable);
                      }}
                    />
                    <div className=" text-xl dark:text-gray-300 "> 공개 </div>
                  </div>
                  <button
                    type="submit"
                    onClick={onClick}
                    className="my-0.5 px-4 border border-transparent shadow-sm text-lg tracking-widest font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-60"
                  >
                    출제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthModal ref={ModalRef}>CTF관리자만 접근할 수 있습니다</AuthModal>
      <AlertModal ref={errorModalRef}>{errorMsg}</AlertModal>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member, ctfId: state.ctf.ctfId };
};

export default connect(mapStateToProps)(ChallengeWrite);
