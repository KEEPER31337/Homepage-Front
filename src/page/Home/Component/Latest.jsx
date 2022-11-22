import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll';

import '../style/scale.css';
import showDateAndTime from './showDateAndTime.jsx';
import DefaultUserThumbnail from 'assets/img/memberCircle.svg';
import StringLogo from 'assets/img/keeper_logo_string.png';

function Latest({ postList }) {
  const now = new Date();

  const handleImgErrorUser = (e) => {
    e.target.src = DefaultUserThumbnail;
  };

  const handleImgErrorPost = (e) => {
    e.target.src = StringLogo;
  };

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
            최근
          </h2>
        </div>
        <ScrollContainer vertical={false} className="overflow-hidden">
          <div className="flex flex-nowrap mt-12 m-3 mx-auto gap-3">
            {postList.map((post, index) => (
              <div
                key={index}
                className="w-[300px] grow-0 shrink-0 flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <div className="flex-shrink-0">
                  <Link
                    to={`/post/${post.category}/${post.id}`}
                    className="block mt-2"
                  >
                    <img
                      className="h-48 w-full object-scale-down"
                      src={post.thumbnailPath ? post.thumbnailPath : StringLogo}
                      alt="post"
                      onError={handleImgErrorPost}
                    />
                  </Link>
                </div>
                <div className="flex-1 bg-mainWhite dark:bg-mainBlack p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-mainYellow">
                      <Link
                        to={`/board/${post.category}`}
                        className="hover:underline"
                      >
                        {post.category}
                      </Link>
                    </p>
                    <Link
                      to={`/post/${post.category}/${post.id}`}
                      className="block mt-2"
                    >
                      <p className="truncate text-xl font-semibold dark:text-mainWhite">
                        {post.title}
                      </p>
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      {/* TO DO : Link to user information with "drop-down" */}
                      <span className="sr-only">{'author name'}</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={
                          post.writerThumbnailPath
                            ? post.writerThumbnailPath
                            : DefaultUserThumbnail
                        }
                        alt="user"
                        onError={handleImgErrorUser}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">
                        {/* TO DO : Link to user information with "drop-down" */}
                        {post.writer}
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={post.updateTime}>
                          {showDateAndTime(now, post.updateTime)}
                        </time>
                        <span aria-hidden="true">&middot;</span>
                        <span>{post.visitCount} watch</span>
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

export default Latest;
