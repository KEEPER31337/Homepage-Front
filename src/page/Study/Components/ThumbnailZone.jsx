import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotographIcon, TrashIcon } from '@heroicons/react/solid';

import utilAPI from 'API/v1/util';

const validateName = (fname) => {
  let extensions = ['jpeg', 'jpg', 'png'];
  let fparts = fname.split('.');
  let fext = '';

  if (fparts.length > 1) fext = fparts[fparts.length - 1];
  let validated = false;
  if (fext != '') {
    extensions.forEach((ext) => {
      if (ext == fext) validated = true;
    });
  }
  return validated;
};

const ThumbnailZone = (props) => {
  const [thumbnailBase64, setThumbnailBase64] = useState(null); // 파일 base64
  // const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (props.modifyFlag) {
      var list = props.study?.thumbnailPath.split('/');
      utilAPI
        .getThumbnail({ thumbnailId: list[list.length - 1] })
        .then((data) => {
          console.log(data);
          props.setThumbnail(data);

          const reader = new FileReader();
          reader.onabort = () => console.log('file reading was aborted');
          reader.onerror = () => console.log('file reading has failed');
          reader.onloadend = () => {
            const base64 = reader.result;
            if (base64) {
              setThumbnailBase64(base64);
            }
          };
          reader.readAsDataURL(data);
        });
    }
  }, []);

  const deleteClickHandler = () => {
    setThumbnailBase64(null);
    props.setThumbnail(null);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setThumbnailBase64('');
    acceptedFiles.forEach((file) => {
      if (validateName(file.name)) {
        console.log(file);
        props.setThumbnail(file);
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onloadend = () => {
          const array = [];
          for (var i = 0; i < reader.result.length; i++) {
            array.push(reader.result.charCodeAt(i));
          }
          console.log(new Uint8Array(array));
          const base64 = reader.result;
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
  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  const rootProps = {
    ...getRootProps({}),
    multiple: false,
    accept: 'image/jpg, image/jpeg, image/png',
  };

  return (
    <>
      <div
        {...rootProps}
        className={
          (isDragActive ? 'bg-blue-300 bg-opacity-50 h-full' : '') +
          (thumbnailBase64 ? ' w-fit h-fit' : ' h-full') +
          ' border-2 border-dashed rounded-lg flex items-center justify-center dark:border-slate-500'
        }
      >
        {thumbnailBase64 ? (
          <>
            <img
              className={
                (isDragActive ? 'opacity-50' : '') +
                '  rounded-xl p-1 shadow-lg max-h-[20em]'
              }
              src={thumbnailBase64}
              alt="thumbnail"
            />
          </>
        ) : (
          <>
            {isDragActive ? (
              <p className=" text-slate-500 flex items-center text-center dark:text-slate-300">
                파일을
                <br />
                놓으세요
              </p>
            ) : (
              <p className=" text-slate-500 flex items-center">
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
      {thumbnailBase64 ? (
        <button
          className="rounded-full my-1 pl-1 pr-2 bg-red-300 bg-opacity-50 text-red-500"
          onClick={deleteClickHandler}
        >
          <TrashIcon
            className="h-5 w-5 -mt-1 inline-block"
            aria-hidden="true"
          />
          삭제
        </button>
      ) : (
        ''
      )}
    </>
  );
};
export default ThumbnailZone;
