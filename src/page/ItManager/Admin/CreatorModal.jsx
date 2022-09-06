import { Dialog, Transition } from '@headlessui/react';
import {
  Fragment,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useSelector } from 'react-redux';

import ChangeMemberJob from '../Components/ReviseAppointment/ChangeMemberJob';
import Header from '../Components/ReviseAppointment/Header';
import getContentData from '../Components/ReviseAppointment/GetContentData';
// API
import itmanagerAPI from 'API/v1/itmanager';
import memberAPI from 'API/v1/member';
const CreatorModal = forwardRef(
  ({ member, selectJob, update, setUpdate }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    //redux 연결
    const token = useSelector((store) => store.member.token);

    const closeModal = () => {
      setIsOpen(false);
      setUpdate(!update);
    };

    const openModal = () => {
      setIsOpen(true);
    };

    useImperativeHandle(ref, () => ({
      open: () => {
        openModal();
      },
    }));

    const [jobMemberList, setJobMemberList] = useState([]);

    const [gen, setGen] = useState(13);
    const genMemberList = getContentData({ member, gen });

    useEffect(() => {
      itmanagerAPI
        .getRoleMember({
          token: token,
          jobId: selectJob,
        })
        .then((data) => {
          if (data.success) {
            setJobMemberList(data.list);
          }
        });

      memberAPI
        .getGenerations({
          token: token,
        })
        .then((data) => {
          if (data.success) {
            setGen(data.list[0]);
          }
        });
    }, [selectJob]);

    return (
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto bg-red"
            onClose={closeModal}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="mt-32 md:mt-32  flex justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden sm:inline-block" aria-hidden="true" />
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="font-basic relative inline-block bg-white rounded-lg  h-[60vh]   ">
                    <Header
                      selectJob={selectJob}
                      jobMemberList={jobMemberList}
                      setJobMemberList={setJobMemberList}
                      setGen={setGen}
                    />
                    {/* 기수 관련 */}
                    <ChangeMemberJob
                      selectJob={selectJob}
                      genMemberList={genMemberList}
                      jobMemberList={jobMemberList}
                      setJobMemberList={setJobMemberList}
                    />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }
);

export default CreatorModal;
