import React, {useRef, useEffect, useState} from 'react';
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import { api } from '../../global/api';
import LoginCommon from "../../component/LoginCommon";
import {UserContext} from "../../global/context/BaseContext"
import Code from "./Code";
import Tool from "../../utils/Tool";
import {message} from "antd";
const useKey = "gfUser";
export default ({match})=> {
  const [user, setUser] = useState(JSON.parse(Tool.localItem(useKey)))
  let { url } = useRouteMatch();
  const loginRef = useRef();
  const refreshData=()=> {
    setUser(JSON.parse(Tool.localItem(useKey)));
  }
  useEffect(()=> {
    // 验证是否过期
    if(!(user?.id)){
      changeCancel();
    }else{
      checkLogin();
    }
  }, [user]);
  const checkLogin =async ()=> {
    const {code} = await api('/api/gufei/user/login-check', {},user.token);
    if(code === 100){
      message.error('请先登录');
      changeCancel();
    }
  }
  const changeCancel =()=>{
    if(loginRef?.current){
      loginRef.current.onCancel && loginRef.current.onCancel(true);
    }
  }
  return (
    <React.Fragment>
      { user?.id && 
        <UserContext.Provider value={user}>
          <Switch>
            <Route path={`${url}/code`} component={Code} />
            <Redirect exact to={`${url}/code`} from="/app/gufei" />
          </Switch>
        </UserContext.Provider>
      }
      <LoginCommon ref={loginRef} useKey={useKey} refreshData={refreshData} />
    </React.Fragment>
  )
}