import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Echo from 'laravel-echo';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { PinsProvider } from './context/PinsContext ';
import store from './store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

// configure Laravel Echo
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '0dde047a945cb7363c43',
  wsHost: '127.0.0.1',
  cluster: 'mt1',
  wsPort: 6001,
  forceTLS: false,
  disableStats: true
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
