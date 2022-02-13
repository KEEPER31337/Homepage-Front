import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentAddIcon, TrashIcon } from '@heroicons/react/solid';

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
    console.log(acceptedFiles);
    setThumbnail(acceptedFiles);
    setThumbnailBase64('');
    acceptedFiles.forEach((file) => {
      if (validateName(file.name)) {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onloadend = () => {
          const base64 = reader.result;
          console.log(base64);
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
          (isDragActive ? 'bg-blue-50' : '') +
          ' h-40 w-40 border-4 border-dashed rounded-xl flex items-center justify-center'
        }
      >
        <input {...InputProps} />
        {thumbnailBase64 ? (
          <>
            <img
              className={
                (isDragActive ? 'opacity-50' : '') +
                '  w-full h-full rounded-xl p-1 shadow-lg peer'
              }
              src={thumbnailBase64}
              alt="thumbnail"
            />
            <div className="m-1">
              <TrashIcon
                className="h-5 w-5 inline-block text-slate-500 "
                aria-hidden="true"
              />
              삭제
            </div>
          </>
        ) : (
          <>
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p className="text-slate-500 flex items-center">
                <DocumentAddIcon
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
