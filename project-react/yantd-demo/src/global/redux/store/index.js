import { createStore, combineReducers } from 'redux';
import reducer from '../reducer';

const localStorage=window.localStorage;

const STORE_KEY='chafer_admin_redux';

function configureStore(){
  let initialState=JSON.parse(localStorage.getItem(STORE_KEY))||{};
  for(const name of Object.keys(initialState)){
    if(!reducer[name]){
      delete initialState[name];
    }
  }
  let store=createStore(combineReducers(reducer), initialState);
  store.subscribe(()=>{
    let state=store.getState();
    //此处仅保存in_city相关的数据，redux 持久化应该谨慎，不应该所有的数据都持久化
    const {in_city}=state;
    localStorage.setItem(STORE_KEY, JSON.stringify({in_city}));
  });
  return store;
}

const store=configureStore();

export default store;
