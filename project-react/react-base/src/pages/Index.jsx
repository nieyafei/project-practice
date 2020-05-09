import React from 'react';

export default class Index extends React.Component{
  state = {}
  static getDerivedStateFromProps(props, state){
    console.log(props);
    return null;
  }
  componentDidUpdate(prevProps){
    if (this.props !== prevProps) {
      console.log('数据更新');
    }
  }
  toLogin(){
    this.props.history.push({pathname: "/list", search: "a=2"}, {m: 3, n: 4})
  }
  toLogin2(){
    this.props.history.push("/login", {m: 3, n: 4})
  }
  toLogin3(){
    this.props.history.push({pathname: "/login", search: "?a=2", query: {m: 3, n: 4}})
  }
  render(){
    return (
      <div className="box-section">
        <h1>首页列表</h1>
        <button onClick={this.toLogin.bind(this)}>去列表页</button><br /><br />
        <button onClick={this.toLogin2.bind(this)}>点击跳转去登录2</button><br /><br />
        <button onClick={this.toLogin3.bind(this)}>点击跳转去登录3</button>
      </div>
    );
  }
}