import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  configure,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Lotto from './Lotto';
import { Provider } from 'react-redux';

// redux
import store from 'redux/store';

describe('같은 맥락의 테스트 그룹화', () => {
  it('테스트1 - 뽑기버튼이 보이는가', async () => {
    <Provider store={store}>
      render( <Lotto /> );
    </Provider>; // redux못 불러와서 provider넣어줌
    //https://velog.io/@ragnarok_code/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%A0%95%EB%A6%AC-Provider

    const button = screen.findByRole('button', { name: '뽑기' }); //getByRole로 하면 비동기문제인지 안됨.

    waitFor(() => expect(button).toBeInTheDocument()); //import '@testing-library/jest-dom' 필요
    //https://stackoverflow.com/questions/66516348/why-do-i-get-the-error-received-value-must-be-an-htmlelement-or-an-svgelement
  });

  it('테스트2 - 뽑기버튼 눌렀을때 70%이상 글자가 뜨는가!', () => {
    <Provider store={store}>
      render( <Lotto /> );
    </Provider>;

    const button = screen.findByRole('button', { name: '캬햐햐햐' });
    waitFor(() => fireEvent.click(button)); // 버튼 클릭하는 이벤트

    const text = screen.findByText('70%이상 긁어야 합니다');
    waitFor(() => expect(text).toBeInTheDocument());
  });
});
//https://medium.com/hcleedev/web-react-testing-library%EC%9D%98-%EA%B0%9C%EB%85%90%EA%B3%BC-%EA%B0%84%EB%8B%A8%ED%95%9C-%EC%98%88%EC%8B%9C-b94ea633bdaa
//https://tecoble.techcourse.co.kr/post/2021-10-22-react-testing-library/

//1. 너무 느림.. 하나 테스트하는데 10초이상 걸림
//2. [모르게써욤ㅠㅠ]
//getByText~ 다 안먹음. 비동기 문제,,,? findBy, waitfor써야하는데 이거 잘쓸 자신이 업댱,,,

//https://www.daleseo.com/react-testing-library-async/

//4. 다른사람이 하면, 그 코드 하나하나 다뜯어봐야되는데
//5. 스스로 하는게 낫다고 생각
