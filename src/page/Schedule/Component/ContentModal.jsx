import React, { useState, useRef, memo } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import Modal from 'react-awesome-modal';
import Button from '@material-ui/core/Button';

const ContentModal = ({ info }) => {
  console.log(info.open);
  const close = () => {
    info.open = false;
    console.log(info.open);
  };
  return (
    <Modal visible={info.open} width="600" height="400" effect="fadeInDown">
      <div>
        {info.text}
        {info.date}
        {info.content}
      </div>
      <Button
        className="m-2"
        variant="contained"
        color="primary"
        onClick={close}
      >
        완료
      </Button>
    </Modal>
  );
};

/*
const ContentModal = ({ info }) => {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  console.log(info.text);
  return (
    <div>
      <div onClick={openModal()}>{info.text}</div>
      <Modal isOpen={isOpen} width="600" height="400" effect="fadeInDown">
        <div>
          {info.text}
          {info.date}
          {info.content}
        </div>
        <Button
          className="m-2"
          variant="contained"
          color="primary"
          onClick={closeModal()}
        >
          완료
        </Button>
      </Modal>
    </div>
  );
};
*/

export default ContentModal;
