import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentAddIcon, TrashIcon } from '@heroicons/react/solid';
import Modal from 'react-awesome-modal';
import { useEffect } from 'react';

const formatFileSize = (size) => {
  //파일 크기의 단위 처리
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

const getFileIcon = (filename) => {
  const extension = filename?.split('.')[1];

  try {
    return (
      <img
        src={require('assets/img/icons/' + extension + '.png')}
        className="h-7 w-7 inline-block"
      />
    );
  } catch (e) {
    return (
      <img
        src={require('assets/img/icons/default.png')}
        className="h-7 w-7 inline-block"
      />
    );
  }
};

const ChallengeFileUploadForm = (props) => {
  const [files, setFiles] = useState([]);

  const deleteClickHandler = (fileName) => {
    props.setFiles(files.filter((file) => file.name !== fileName));
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const getFileInfo = (file) => {
    return (
      <tr className="border-b" key={file.name}>
        <td>
          {getFileIcon(file.name)}
          {file.name}
        </td>
        <td className="text-center">{formatFileSize(file.size)}</td>
        <td className="text-red-500 text-center">
          <button onClick={() => deleteClickHandler(file.name)}>
            <TrashIcon className=" h-5 w-5 inline-block " aria-hidden="true" />
            삭제
          </button>
        </td>
      </tr>
    );
  };

  const [modalStatus, setModalState] = useState(false);
  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };
  useEffect(() => {
    /* console.log(files);
    console.log(files.length); */
    if (files.length >= 2) {
      openModal();
      deleteClickHandler(files[1].name);
    }
  }, [files]);
  useEffect(() => {
    if (props.modifyFlag) {
      // console.log(props.board.files);
      //setFiles(props.board.files);
    }
  }, []);
  const onDrop = useCallback(
    (acceptedFiles) => {
      var temp = [...files];
      var realAddFiles = []; //최종적으로 추가될 파일
      var notAddFiles = []; //중복된 파일
      acceptedFiles.forEach((newFile) => {
        const isRepeat = temp.filter((file) => file.name == newFile.name);
        if (isRepeat.length != 0) {
          //console.log('중복');
          notAddFiles = [...notAddFiles, newFile];
        } else {
          temp = [...temp, newFile];
          /*const date = new Date(newFile.lastModifiedDate);
          const uploadTime =
            date.getFullYear() +
            '-' +
            date.getMonth() +
            '-' +
            date.getDate() +
            'T' +
            newFile.lastModifiedDate.toString().split(' ')[4];*/
          realAddFiles = [...realAddFiles, newFile];
          /*realAddFiles = [
            ...realAddFiles,
            {
              id: Date.now(),
              fileName: newFile.name,
              filePath: newFile.path,
              fileSize: newFile.size,
              uploadTime: uploadTime,
              ipAddress: '1.1.1.1',
            },
          ];*/
        }
      });
      if (notAddFiles.length !== 0) {
        var fileNameList = ''; //이름이 중복된 파일들
        notAddFiles.forEach((file) => {
          fileNameList += ' ' + file.name + ' ';
        });
        alert(
          '중복된 파일이 있습니다.(' +
            fileNameList.replace('  ', ', ') +
            ') 기존 파일을 삭제하고 새로 업로드 해주십시오.'
        );
      }
      props.setFiles([...files, ...realAddFiles]);
      setFiles([...files, ...realAddFiles]);
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
      <div
        className={
          (files.length === 0 ? 'h-[200px]' : 'h-[400px]') +
          ' flex-column w-full border-4 border-dashed rounded-xl hidden sm:block dark:border-slate-500'
        }
      >
        <div
          className={
            files.length === 0
              ? 'hidden'
              : '' +
                ' w-full h-[200px] overflow-y-scroll rounded-t-lg border-b-4 border-dashed dark:border-slate-500 '
          }
        >
          <table className=" w-full dark:text-mainWhite ">
            <thead className=" sticky top-0 bg-divisionGray dark:bg-darkComponent">
              <tr className="">
                <th className="">파일명</th>
                <th className="min-w-[5em] w-1/5">파일 크기</th>
                <th className="min-w-[4em] w-1/5">삭제</th>
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
            (files.length === 0
              ? ' h-full rounded-lg'
              : ' h-[192px] rounded-b-lg ') +
            ' flex items-center justify-center '
          }
        >
          <input {...InputProps} />

          {isDragActive ? (
            <div className="text-slate-500 flex items-center text-center dark:text-slate-300">
              파일을
              <br />
              놓으세요
            </div>
          ) : (
            <div className="text-slate-500 flex items-center dark:text-slate-300">
              <DocumentAddIcon
                className=" h-10 w-10 inline-block "
                aria-hidden="true"
              />
              <div className=" inline-block text-center m-1">
                이 곳을 클릭하거나 파일을 드래그하여
                <br />
                파일을 첨부하세요
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="block sm:hidden space-y-2">
        <button
          {...getRootProps()}
          className="border-[2px]  border-divisionGray p-1 pr-2 shadow-md rounded-lg text-pointYellow flex items-center dark:bg-darkPoint"
        >
          <input {...InputProps} />
          <DocumentAddIcon
            className=" h-7 w-7 inline-block "
            aria-hidden="true"
          />
          파일 추가
        </button>
        {files.length !== 0 ? (
          <table className="w-full dark:text-mainWhite">
            {/*console.log(files.length)*/}
            <thead className="bg-mainYellow bg-opacity-100 ">
              <tr className="">
                <th className="rounded-tl-lg">파일명</th>
                <th className="min-w-[5em] w-1/5">파일 크기</th>
                <th className="min-w-[4em] w-1/5 rounded-tr-lg">삭제</th>
              </tr>
            </thead>
            <tbody>{files.map((file) => getFileInfo(file))}</tbody>
          </table>
        ) : (
          ''
        )}
      </div>
      <Modal // 파일 2개이상 넣을때모달
        visible={modalStatus}
        width="300"
        height="140"
        effect="fadeInDown"
        onClickAway={() => closeModal()}
      >
        <div className="m-5 p-3 flex flex-col items-center text-center dark:text-mainBlack">
          파일 첨부는 1개까지 가능합니다
          <div className="flex m-8">
            <button
              className="bg-white mx-1 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => {
                closeModal();
              }}
            >
              확인
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ChallengeFileUploadForm;
