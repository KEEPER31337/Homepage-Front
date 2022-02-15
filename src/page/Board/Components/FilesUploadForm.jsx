import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentAddIcon, TrashIcon } from '@heroicons/react/solid';
import { Input } from 'postcss';
import { useEffect } from 'react';
import AddedFiles from './AddedFiles';
const deleteClickHandler = () => {
  //TODO 첨부한 파일 삭제 기능 구현
  console.log('delete');
};

const decideUnit = (size) => {
  const kb = parseInt(size / 1000);
  if (kb < 10000) {
    return kb + 'KB';
  } else {
    const mb = parseInt(kb / 1000);
    if (mb < 10000) {
      return mb + 'MB';
    }
    return parseInt(mb / 1000) + 'GB';
  }
};
const getFileInfo = (file) => {
  return (
    <tr className="border-b">
      <td>
        {getFileIcon(file.name)}
        {file.name}
      </td>
      <td>{decideUnit(file.size)}</td>
      <td className="text-red-500">
        <button onClick={deleteClickHandler}>
          <TrashIcon className=" h-5 w-5 inline-block " aria-hidden="true" />
          삭제
        </button>
      </td>
    </tr>
  );
};
const getFileIcon = (filename) => {
  const extension = filename.split('.')[1];
  //TODO 파일 존재 여부에 따라 해당 이미지 or 디폴트 이미지를 가져올 수 있도록 하고싶다.(서버를 거치기엔 비효율적인것같고)
  return (
    <img
      src={require('assets/img/icons/' + 'default' + '.png')}
      className="h-7 w-7 inline-block"
    />
  );
};

const FilesUploadForm = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log(files);
  }, [files]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const InputProps = {
    ...getInputProps(),
    multiple: true,
  };

  return (
    <>
      <div className="mt-2 flex-column h-[200px] w-full border-4 border-dashed rounded-xl dark:border-slate-500">
        <div className="border w-full h-[100px] overflow-auto rounded-t-lg">
          {/*TODO 이 테이블이 files가 비어있을 땐 아예 안보였으면 좋겠는데 이게 잘 안된다.*/}
          <table className="w-full dark:text-mainWhite">
            <thead className=" sticky top-0 bg-divisionGray dark:bg-darkComponent">
              <tr className="">
                <th className="">파일명</th>
                <th className="">파일 크기</th>
                <th className="">삭제</th>
              </tr>
            </thead>
            <tbody>{files.map((file) => getFileInfo(file))}</tbody>
          </table>
        </div>

        <div
          {...getRootProps()}
          className={
            (isDragActive
              ? 'bg-blue-300 bg-opacity-50'
              : 'bg-slate-100 bg-opacity-50') +
            ' rounded-b-lg h-[92px] flex items-center justify-center '
          }
        >
          <input {...InputProps} />

          {isDragActive ? (
            <p className="text-slate-500 flex items-center text-center dark:text-slate-300">
              파일을
              <br />
              놓으세요
            </p>
          ) : (
            <p className="text-slate-500 flex items-center dark:text-slate-300">
              <DocumentAddIcon
                className=" h-10 w-10 inline-block "
                aria-hidden="true"
              />
              <div className=" inline-block text-center m-1">
                이 곳을 클릭하거나 파일을 드래그하여
                <br />
                파일을 첨부하세요
              </div>
            </p>
          )}
        </div>
      </div>
    </>
  );
};
export default FilesUploadForm;
