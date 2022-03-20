import { Fragment } from 'react';

const Modal = ({ children, modalState }) => {
  const [state, setState] = modalState;

  const outsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setState(false);
    }
  };

  if (!state) {
    return <Fragment />;
  } else {
    return (
      <div
        className="bg-transparent 
                    w-full h-full 
                    z-10 fixed 
                    top-0 left-0"
        onClick={outsideClick}
      >
        <div
          className="bg-amber-50 dark:bg-darkComponent
                    border-amber-400 border-2 rounded-2xl
                    absolute
                    left-1/3 top-1/4 z-20
                    translate-x-1/2 translate-y-1/2 
                    shadow-2xl"
        >
          {children}
        </div>
      </div>
    );
  }
};

export default Modal;
