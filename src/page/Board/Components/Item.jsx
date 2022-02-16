import React, { useState, useCallback } from 'react';
import { useDropzone, DropZone } from 'react-dropzone';
import { DocumentAddIcon, TrashIcon } from '@heroicons/react/solid';
import { Input } from 'postcss';

const FilesUploadForm = () => {
  const { getRootProps } = useDropzone({
    // Note how this callback is never invoked if drop occurs on the inner dropzone
    onDrop: (files) => console.log(files),
  });

  return (
    <div className="container">
      <div {...getRootProps({ className: 'dropzone border p-2 m-2' })}>
        <InnerDropzone />
        <p>Outer dropzone</p>
      </div>
    </div>
  );
};

function InnerDropzone(props) {
  const { getRootProps } = useDropzone({ noDragEventsBubbling: true });
  return (
    <div {...getRootProps({ className: 'dropzone border p-2 m-2' })}>
      <p>Inner dropzone</p>
    </div>
  );
}
export default FilesUploadForm;
