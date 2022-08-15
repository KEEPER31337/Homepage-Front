import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// redux
import store from 'redux/store';

// local
import './tailwind.css';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
