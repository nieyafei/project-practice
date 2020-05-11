import React from 'react';
import { Link } from "react-router-dom";
import { stringify } from "query-string";

/* function userQuery(){
  return new URLSearchParams(useLocation().search);
} */

export default class Login extends React.Component{
  state = {filter: {}, title: "数据初始化"}
  static getDerivedStateFromProps(props, state){
    console.log("props更新：", props.location);
    let query = new URLSearchParams(props.location.search);
    console.log(query.getAll("a"));
    for (const [key, value] of query) {
      console.log(key, query.getAll(key))
    }
    console.log(query.values(),query.toString())
    state.filter = props.location.query;
    return state;
  }
  componentDidUpdate(prevProps){
    if (this.props !== prevProps) {
      console.log('数据更新');
      this.getData();
    }
  }
  getData(){
    this.setState({
      title: new Date().getTime()
    })
  }
  toLogin(){
    this.props.history.push({pathname: "/register", search: "a=2"}, {m: 3, n: 4})
  }
  toLogin2(){
    this.props.history.push("/register", {m: 3, n: 4})
  }
  toLogin3(){
    this.props.history.push({pathname: "/register", search: "?a=2", query: {m: 3, n: 4}})
  }
  render(){
    const { filter, title } = this.state;
    return (
      <div className="box-section">
        我是注册页面
        <br />
        <p>filter：{stringify(filter)}</p>
        <p>数据变化检测：{title}</p>
        <br />
        <button onClick={this.toLogin.bind(this)}>点击跳转去注册</button><br />{stringify({pathname: "/login", search: "a=2"})}<br /><br />
        <button onClick={this.toLogin2.bind(this)}>点击跳转去注册2</button><br /><br />
        <button onClick={this.toLogin3.bind(this)}>点击跳转去注册3</button><br />{stringify({pathname: "/login", search: "?a=2", query: {m: 3, n: 4}})}
        <br /><br />
        <Link to="/">去首页</Link>
      </div>
    );
  }
}