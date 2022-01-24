/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function PopDown(props) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'text-mainYellow' : 'text-mainYellow',
              'group rounded-md inline-flex items-center text-base font-semibold hover:text-mainYellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainYellow'
            )}
          >
            <span>{props.category.name}</span>
            <ChevronDownIcon
              className={classNames(
                open ? 'text-mainWhite' : 'text-mainWhite',
                'ml-2 h-5 w-5 group-hover:text-mainYellow'
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-mainYellow px-5 py-6 sm:gap-8 sm:p-8">
                  {props.category.subs.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 p-3 flex items-start rounded-lg hover:bg-pointYellow"
                    >
                      <item.icon
                        className="flex-shrink-0 h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                      <div className="ml-4">
                        <p className="text-base font-semibold text-mainWhite">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-mainWhite">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8"></div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
