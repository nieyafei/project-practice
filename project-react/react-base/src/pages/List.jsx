import React from 'react';
import { RouterQueryHandler } from '../component'

export default class Index extends React.Component{
  state = {filter: {cid: 'sdhjkfsdfsdf'}}
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
    this.props.history.push({pathname: "/login", search: "a=2"}, {m: 3, n: 4})
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
        <h1>列表列表</h1>
        {/* 筛选器 */}
        <RouterQueryHandler default_query={this.state.filter}>
          {
            parent=> (
              <form name="serchForm" onSubmit={(e)=> {e.preventDefault();parent.push(e)}} method="post">
                <input type="text" value={parent.state.data?.keyword} name="keyword" placeholder="请输入搜索词" onChange={e=> parent.changeFiled('data.keyword', e.target.value)} />
                <button type="submit">搜索</button>
              </form>
            )
          }
        </RouterQueryHandler>
        <RouterQueryHandler query={this.state.filter}>
          <form>
            <input type="text" placeholder="请输入搜索词" />
            <button type="submit">搜索</button>
          </form>
        </RouterQueryHandler>
        {/* result展示 */}

      </div>
    );
  }
}