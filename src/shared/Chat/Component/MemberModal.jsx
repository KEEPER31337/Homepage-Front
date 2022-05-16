import { Fragment, useState, forwardRef, useImperativeHandle } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import { UsersIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/solid';

import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const MemberModal = forwardRef(({ people }, ref) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
  }));

  const filteredPeople = people.filter((person) => {
    return person?.nick_name?.toLowerCase()?.includes(query.toLowerCase());
  });

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')}>
      <Dialog
        as="div"
        className="fixed top-20 inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 sm:top-40"
        onClose={setOpen}
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
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            onChange={(person) => {
              // window.location = person.profileUrl;
            }}
          >
            {({ activeOption }) => (
              <>
                <div className="relative">
                  <SearchIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => {
                      setQuery(event.target.value);
                    }}
                  />
                </div>

                {(query === '' || filteredPeople.length > 0) && (
                  <Combobox.Options
                    as="div"
                    static
                    hold
                    className="flex divide-x divide-gray-100"
                  >
                    <div
                      className={classNames(
                        'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                        activeOption && 'sm:h-96'
                      )}
                    >
                      <div className="-mx-2 text-sm text-gray-700">
                        {(query === '' ? people : filteredPeople).map(
                          (person) => (
                            <Combobox.Option
                              as="div"
                              key={person.id}
                              value={person}
                              className={({ active }) =>
                                classNames(
                                  'flex cursor-default select-none items-center rounded-md p-2',
                                  active && 'bg-gray-100 text-gray-900'
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  <img
                                    src={person.image_path}
                                    alt=""
                                    className="h-6 w-6 flex-none rounded-full"
                                  />
                                  <span className="ml-3 flex-auto truncate">
                                    {person.nick_name}
                                  </span>
                                  {active && (
                                    <ChevronRightIcon
                                      className="ml-3 h-5 w-5 flex-none text-gray-400"
                                      aria-hidden="true"
                                    />
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          )
                        )}
                      </div>
                    </div>

                    {activeOption && (
                      <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                        <div className="flex-none p-6 text-center">
                          <img
                            src={activeOption.image_path}
                            alt=""
                            className="mx-auto h-16 w-16 rounded-full"
                          />
                          <h2 className="mt-3 font-semibold text-gray-900">
                            {activeOption.nick_name}
                          </h2>
                          <p className="text-sm leading-6 text-gray-500">
                            Keeper {activeOption.generation}기
                          </p>
                        </div>
                        <div className="flex flex-auto flex-col justify-between p-6">
                          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                            <dt className="col-end-1 font-semibold text-gray-900">
                              이름
                            </dt>
                            <dd>{activeOption.nick_name}</dd>
                            <dt className="col-end-1 font-semibold text-gray-900">
                              활동
                            </dt>
                            <dd>{activeOption.type}</dd>
                            <dt className="col-end-1 font-semibold text-gray-900">
                              직책
                            </dt>
                            <dd>{activeOption.jobs}</dd>
                          </dl>
                          <button
                            type="button"
                            className="mt-6 w-full rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm bg-mainYellow hover:bg-pointYellow focus:outline-none"
                            onClick={() => {
                              navigate(`/profile/${activeOption.id}`);
                              setOpen(false);
                            }}
                          >
                            Visit
                          </button>
                        </div>
                      </div>
                    )}
                  </Combobox.Options>
                )}

                {query !== '' && filteredPeople.length === 0 && (
                  <div className="py-14 px-6 text-center text-sm sm:px-14">
                    <UsersIcon
                      className="mx-auto h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mt-4 font-semibold text-gray-900">
                      No people found
                    </p>
                    <p className="mt-2 text-gray-500">
                      We couldn’t find anything with that term. Please try
                      again.
                    </p>
                  </div>
                )}
              </>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
});

export default MemberModal;
