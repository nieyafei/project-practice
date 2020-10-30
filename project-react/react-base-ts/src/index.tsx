import React from 'react';
import ReactDOM from 'react-dom';
import './style/css/theme.less';
import './index.css';
import { Provider } from 'react-redux';
import CRouter from './routes';
import reportWebVitals from './reportWebVitals';
import store from './store/index'

ReactDOM.render(
  <Provider store={store}>
    {/* 严格模式 */}
    <React.StrictMode>
      <CRouter />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
