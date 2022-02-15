import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentAddIcon, TrashIcon } from '@heroicons/react/solid';
import { Input } from 'postcss';
import { useEffect } from 'react';

const AddedFiles = (props) => {
  const file = props;

  return (
    <>
      <div className="border">
        {console.log(file.name)}

        <p className="border">{file.name}</p>
      </div>
      ;
    </>
  );
};
export default AddedFiles;
