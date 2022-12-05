const { render, screen, fireEvent } = require('@testing-library/react');
const { Routes, Route, BrowserRouter } = require('react-router-dom');
const { default: EditProfile } = require('./EditProfile');
const { default: MyProfile } = require('./MyProfile');
// testing-library
import '@testing-library/jest-dom';

// redux
import { Provider } from 'react-redux';
import store from 'redux/store';

test('프로필 수정 버튼이 있는가?', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route exact path="" element={<MyProfile />} />
      </Routes>
    </BrowserRouter>
  );
  const button = screen.getByText('프로필 수정');
  expect(button).toBeInTheDocument();
});

test('프로필 수정 버튼을 누르면 "프로필 수정하기" 가 보이는가?', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="" element={<MyProfile />} />
          <Route exact path="edit" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
  const button = screen.getByText('프로필 수정');

  fireEvent.click(button);

  const text = screen.getByText('프로필 수정하기');
  expect(text).toBeInTheDocument();
});
