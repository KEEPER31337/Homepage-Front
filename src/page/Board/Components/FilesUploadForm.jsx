import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentAddIcon, TrashIcon } from '@heroicons/react/solid';
import { Input } from 'postcss';
import { useEffect } from 'react';
import { formatFileSize } from '../BoardUtil';

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

const FilesUploadForm = ({
  files,
  setFiles,
  modifyFlag,
  deleteFileIdList,
  setDeleteFileIdList,
  originFiles,
  setOriginFile,
}) => {
  const deleteOriginClickHandler = (id) => {
    setOriginFile(originFiles.filter((file) => file.id !== id));
    setDeleteFileIdList([...deleteFileIdList, id]); //지울 파일 리스트에 아이디 추가
  };
  const getFileInfoOrigin = (file) => {
    //기존에 첨부되어 있던 파일의 상세 정보 display
    return (
      <tr className="border-b" key={file.fileName}>
        <td>
          {getFileIcon(file.fileName)}
          {file.fileName}
        </td>
        <td className="text-center">{formatFileSize(file.fileSize)}</td>
        <td className="text-red-500 text-center">
          <button onClick={() => deleteOriginClickHandler(file.id)}>
            <TrashIcon className=" h-5 w-5 inline-block " aria-hidden="true" />
            삭제
          </button>
        </td>
      </tr>
    );
  };
  const deleteClickHandler = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };
  const getFileInfo = (file) => {
    //새로 첨부한 파일의 상세 정보 display
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

  useEffect(() => {
    // console.log('origin:', originFiles);
    // console.log('new:', files);
  }, [files, originFiles]);
  useEffect(() => {
    if (modifyFlag) {
      //console.log('origin:', props.board.files);
      //props.setOriginFiles(props.board.files);
    }
  }, []);
  const onDrop = useCallback(
    (acceptedFiles) => {
      var temp = [...originFiles, ...files];
      // console.log(originFiles);
      // console.log(temp);
      var realAddFiles = []; //최종적으로 추가될 파일
      var notAddFiles = []; //중복된 파일
      acceptedFiles.forEach((newFile) => {
        const isRepeat = temp.filter(
          (file) => file.name == newFile.name || file.fileName == newFile.name
        );
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
          (files.length === 0 && originFiles.length === 0
            ? 'h-[200px]'
            : 'h-[400px]') +
          ' flex-column w-full border-4 border-dashed rounded-xl hidden sm:block dark:border-slate-500'
        }
      >
        <div
          className={
            files.length === 0 && originFiles.length === 0
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
            <tbody>
              {originFiles.map((file) => getFileInfoOrigin(file))}
              {files.map((file) => getFileInfo(file))}
            </tbody>
          </table>
        </div>

        <div
          {...getRootProps()}
          className={
            (isDragActive
              ? 'bg-blue-300 bg-opacity-50'
              : 'bg-slate-100 bg-opacity-50') +
            (files.length === 0 && originFiles.length === 0
              ? ' h-full rounded-lg'
              : ' h-[192px] rounded-b-lg ') +
            ' flex items-center justify-center '
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
        {files.length !== 0 || originFiles.length !== 0 ? ( //첨부된 파일이 있을 경우
          <table className="w-full dark:text-mainWhite">
            {/*console.log(files.length)*/}
            <thead className="bg-mainYellow bg-opacity-100 ">
              <tr className="">
                <th className="rounded-tl-lg">파일명</th>
                <th className="min-w-[5em] w-1/5">파일 크기</th>
                <th className="min-w-[4em] w-1/5 rounded-tr-lg">삭제</th>
              </tr>
            </thead>
            <tbody>
              {originFiles?.map((file) => getFileInfoOrigin(file))}
              {files?.map((file) => getFileInfo(file))}
            </tbody>
          </table>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
export default FilesUploadForm;
