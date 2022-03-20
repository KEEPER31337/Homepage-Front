import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// local
import AuthUser from 'shared/AuthUser';

const BookAdd = ({ token, memberInfo }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [information, setInformation] = useState('');
  const [department, setDepartment] = useState();
  const [quantity, setQuantity] = useState(1);
  const [thumbnail, setThumbnail] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;
  const titleChange = (e) => {
    setTitle(e.target.value);
  };
  const authorChange = (e) => {
    setAuthor(e.target.value);
  };
  const informationChnage = (e) => {
    setInformation(e.target.value);
  };
  const departmentChange = (e) => {
    setDepartment(e.target.value);
  };
  const quantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const thumbnailChange = (e) => {
    setThumbnail(e.target.value);
  };
  const headers = {
    Authorization: token,
  };
  const addBook = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('information', information);
    formData.append('department', department);
    formData.append('quantity', quantity);
    formData.append('thumbnail', thumbnail);
    try {
      const { data } = await axios.post(
        `${API_URL}/v1/admin/addbook`,
        formData,
        { headers: headers }
      );
      alert(data);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <AuthUser>
        <div>
          <div className="dark:bg-mainBlack">
            <div className="mt-5 md:mt-0 md:col-span-2 ">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="dark:bg-mainBlack dark:px-4 py-5 bg-white space-y-6 sm:p-6 ">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company-website"
                        className="dark:text-white block text-sm font-medium text-gray-700"
                      >
                        책 제목
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="dark:text-white dark:bg-slate-900 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-l-md rounded-r-md sm:text-sm border-gray-300"
                          placeholder="모던 자바스크립트"
                          onChange={titleChange}
                          value={title}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        저자
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="dark:text-white dark:bg-slate-900 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-l-md rounded-r-md sm:text-sm border-gray-300"
                          placeholder="이응모"
                          onChange={authorChange}
                          value={author}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      한줄평(선택사항)
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="dark:text-white dark:bg-slate-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="자바스크립트의 끝"
                        defaultValue={''}
                        onChange={informationChnage}
                        value={information}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        도서분류코드
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="dark:text-white dark:bg-slate-900 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-l-md rounded-r-md sm:text-sm border-gray-300"
                          placeholder=""
                          onChange={departmentChange}
                          value={department}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        추가 할 수량
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="dark:text-white dark:bg-slate-900 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-l-md rounded-r-md sm:text-sm border-gray-300"
                          placeholder="이응모"
                          onChange={quantityChange}
                          value={quantity}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      책 표지
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="dark:text-white dark:bg-slate-900 relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={thumbnailChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dark:bg-mainBlack px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    onClick={addBook}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthUser>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.member.token,
    memberInfo: state.member.memberInfo,
  };
};

export default connect(mapStateToProps)(BookAdd);
