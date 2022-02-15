import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotographIcon, TrashIcon } from '@heroicons/react/solid';
import { Input } from 'postcss';

const validateName = (fname) => {
  let extensions = ['jpeg', 'jpg', 'png'];
  let fparts = fname.split('.');
  let fext = '';

  if (fparts.length > 1) fext = fparts[fparts.length - 1];
  let validated = false;
  if (fext != '') {
    extensions.forEach(function (ext) {
      if (ext == fext) validated = true;
    });
  }
  return validated;
};

const FileUploadForm = () => {
  const [thumbnailBase64, setThumbnailBase64] = useState(null); // 파일 base64
  const [thumbnail, setThumbnail] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    console.log('acceptedFiles : ');
    console.log(acceptedFiles);
    setThumbnail(acceptedFiles);
    setThumbnailBase64('');
    acceptedFiles.forEach((file) => {
      if (validateName(file.name)) {
        const reader = new FileReader();
        console.log('file : ');
        console.log(file);

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onloadend = () => {
          const base64 = reader.result;
          //console.log(base64);
          if (base64) {
            const base64Sub = base64.toString();
            setThumbnailBase64(base64Sub);
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert('이미지 파일(.png/.jpg/.jpeg)만 업로드 가능합니다.');
      }
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const InputProps = {
    ...getInputProps(),
    multiple: false,
    accept: 'image/jpg, image/jpeg, image/png',
  };

  return (
    <>
      <div
        {...getRootProps()}
        className={
          (isDragActive ? 'bg-blue-300 bg-opacity-50' : '') +
          ' h-40 w-40 border-4 border-dashed rounded-xl flex items-center justify-center dark:border-slate-500'
        }
      >
        <input {...InputProps} />
        {thumbnailBase64 ? (
          <>
            <div className="peer h-full w-full">
              <img
                className={
                  (isDragActive ? 'opacity-50' : '') +
                  '   w-full h-full rounded-xl p-1 shadow-lg'
                }
                src={thumbnailBase64}
                alt="thumbnail"
              />
            </div>

            <button className="absolute  h-40 w-40 rounded-xl bg-red-300 bg-opacity-50 text-red-500 text-xl hidden peer-hover:inline-block hover:inline-block">
              <TrashIcon className="h-5 w-5 inline-block" aria-hidden="true" />
              삭제
            </button>
          </>
        ) : (
          <>
            {isDragActive ? (
              <p className="text-slate-500 flex items-center text-center dark:text-slate-300">
                파일을
                <br />
                놓으세요
              </p>
            ) : (
              <p className="text-slate-500 flex items-center">
                <PhotographIcon
                  className=" h-7 w-7 inline-block "
                  aria-hidden="true"
                />
                <div className=" inline-block text-center m-1">
                  썸네일
                  <br />
                  추가하기
                </div>
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default FileUploadForm;
