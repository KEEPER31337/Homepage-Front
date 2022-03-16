import React from 'react';
import { Link } from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll';

import '../style/scale.css';

const imageTemp =
  'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80';
const imageMember =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

export default function Trends({ postList }) {
  console.log(postList);
  return (
    <div
      className="relative bg-gray-50 dark:bg-neutral-900 h-auto pt-16 pb-4 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8"
      data-aos="fade-in"
    >
      <div className="absolute inset-0">
        <div className="bg-mainWhite dark:bg-mainBlack h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold sm:text-4xl ">
            트렌딩
          </h2>
        </div>
        <ScrollContainer vertical={false} className="overflow-hidden">
          <div className="flex flex-nowrap mt-12 m-3 mx-auto gap-3">
            {postList.map((post, index) => (
              <div
                key={index}
                className="main-post grow-0 shrink-0 flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src={imageTemp} // thumbnail
                    alt=""
                  />
                </div>
                <div className="flex-1 bg-mainWhite dark:bg-mainBlack p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-mainYellow">
                      <a href={'category link'} className="hover:underline">
                        {post.category}
                      </a>
                    </p>
                    <Link
                      to={`/post/${post.categoryId}/${post.id}`}
                      className="block mt-2"
                    >
                      <p className="truncate text-xl font-semibold dark:text-mainWhite">
                        {post.title}
                      </p>
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <a href={'temp'}>
                        <span className="sr-only">{''}</span>
                        <img
                          className="h-10 w-10 rounded-full"
                          src={imageMember} // Member Profile Image
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">
                        <a href={null} className="hover:underline">
                          {post.user}
                        </a>
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={post.dateTime}>{post.dateTime}</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>{post.watch} watch</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollContainer>
      </div>
    </div>
  );
}
