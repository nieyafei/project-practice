import React, {useState, FC} from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux';
import {BetterHashRouter}  from './ext/react-router-dom';
import redux_store from './global/redux/store';
import Routes from './route/Routes';

const App: FC<any> = (props) => {
  return (
    <>
      <Routes />
    </>
  );
}

App.defaultProps = {
  id: '233'
}

const AppWrapper = () =>(
  <BetterHashRouter>
    <Provider store={redux_store}>
      <App/>
    </Provider>
  </BetterHashRouter>
);

export default AppWrapper;
