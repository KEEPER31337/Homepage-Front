import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Select,
  Chip,
  InputLabel,
  Input,
  MenuItem,
} from '@material-ui/core';

// API
import ctfAPI from 'API/v1/ctf';
import { connect } from 'react-redux';

const CategorySelector = ({ member, categories, onChange }) => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    ctfAPI
      .getCategoryList({
        token: member.token,
      })
      .then((data) => {
        if (!data.success) {
          alert('카테고리 목록을 받아오는 중 오류가 발생하였습니다.');
          return;
        }
        setCategoryList(data.list);
      });
  }, []);

  return (
    <FormControl>
      <InputLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        유형
      </InputLabel>
      <Select
        className="mt-1 dark:bg-darkComponent dark:border-darkComponent block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        name="categories"
        multiple
        value={categories}
        onChange={onChange}
        input={<Input />}
        renderValue={(selected) => (
          <div>
            {selected.map((value) => (
              <Chip key={value.id} label={value.name} />
            ))}
          </div>
        )}
      >
        {categoryList.map((category) => (
          <MenuItem key={category.id} value={category}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(CategorySelector);
