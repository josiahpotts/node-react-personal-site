import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import store from './store/store'; // Import your Redux store
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
