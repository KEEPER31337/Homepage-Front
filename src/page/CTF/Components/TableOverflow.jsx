import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, forwardRef, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';
//이건 home으로 이동안함. 그냥 alert만!
const TableOverflow = ({ info }) => {
  const [IsTruncate, setIsTruncate] = useState(true);
  const updateIsTruncate = () => {
    setIsTruncate(!IsTruncate);
  };
  const Truncate = () => {
    return (
      <td onClick={updateIsTruncate} className="truncate hover:bg-slate-100">
        {info}
      </td>
    );
  };

  const BreakAll = () => {
    return (
      <td onClick={updateIsTruncate} className="break-all hover:bg-slate-100">
        {info}
      </td>
    );
  };

  return <>{IsTruncate === true ? <Truncate /> : <BreakAll />}</>;
};

export default TableOverflow;
