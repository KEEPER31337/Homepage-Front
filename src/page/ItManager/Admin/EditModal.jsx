import { Dialog, Transition } from '@headlessui/react';
import {
  Fragment,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useSelector } from 'react-redux';

//local
import ChangeMemberJob from '../Components/ReviseAppointment/ChangeMemberJob';
import Header from '../Components/ReviseAppointment/Header';
import getContentData from '../Components/ReviseAppointment/GetContentData';
// API
import itmanagerAPI from 'API/v1/itmanager';
import memberAPI from 'API/v1/member';

const EditModal = forwardRef(
  ({ member, isDark, selectJob, update, setUpdate, darkMode }, ref) => {
    //redux 연결
    const token = useSelector((store) => store.member.token);

    //modal 관련
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
      setIsOpen(true);
    };
    const closeModal = () => {
      setIsOpen(false);
      setUpdate(!update);
    };
    useImperativeHandle(ref, () => ({
      open: () => {
        openModal();
      },
    }));

    //modal창에 띄워줄 현재 클릭한 직책 인원
    const [jobMemberList, setJobMemberList] = useState([]);

    //modal창에 기수별 모든 키퍼 인원
    const [gen, setGen] = useState();
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
    }, [selectJob]);

    useEffect(() => {
      memberAPI
        .getGenerations({
          token: token,
        })
        .then((data) => {
          if (data.success) {
            setGen(data.list[0]);
          }
        });
    }, []);

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
                  <Dialog.Panel className="font-basic relative inline-block bg-white rounded-lg  h-[50vh]   ">
                    <Header
                      selectJob={selectJob}
                      jobMemberList={jobMemberList}
                      setJobMemberList={setJobMemberList}
                      gen={gen}
                      setGen={setGen}
                      isDark={isDark}
                    />
                    <ChangeMemberJob
                      selectJob={selectJob}
                      genMemberList={genMemberList}
                      jobMemberList={jobMemberList}
                      setJobMemberList={setJobMemberList}
                      isDark={isDark}
                    />
                    <div
                      className={
                        isDark
                          ? 'bg-white rounded-b-lg text-lg flex justify-center p-2'
                          : 'bg-darkPoint text-white rounded-b-lg text-lg flex justify-center p-2'
                      }
                    >
                      <div
                        onClick={closeModal}
                        className={
                          isDark
                            ? '  truncate bg-white w-24 hover:bg-slate-100 cursor-pointer rounded-lg p-2'
                            : 'bg-darkPoint w-24 hover:bg-black cursor-pointer rounded-lg p-2'
                        }
                      >
                        완료
                      </div>
                    </div>
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

export default EditModal;
