import React from "react";
import { withRouter } from "react-router-dom";
import Tool from "../utils/Tool";
import { Map } from "immutable";

class RouterQueryHandler extends React.Component{
  state = {filter: {}}
  static getDerivedStateFromProps(props, state){
    const { query } = props.location; // path上的query参数
    console.log(state);
    if(state.filter !== query || !state.data){
      state.filter = query;
      state.data = {...query}
      return state;
    }
    return null;
  }
  push(){
    let form = document.forms['serchForm']
    console.log(form["keyword"].value);
    let object= Tool.handlerPath(this.props, {...this.props.default_query, ...this.state.filter, ...this.state.data});
    this.props.history.push(object);
  }
  changeFiled(key, value){
    // console.log(key.split(".", 1)[0], key.split(".", 2)[1], value);
    let keyStr = key.split(".", 1)[0];
    let map = Map(this.state[keyStr]);
    let map1 = map.set(key.split(".", 2)[1], value);
    console.log(map1 === map)
    console.log(map.toObject());
    // filter[key.split(".", 2)[1]] = value
    this.setState({
      data: map1.toObject()
    }, ()=> {
      console.log(this.state)
    });
  }
  render(){
    const { children } = this.props;
    return typeof(children) === "function"?children(this):children;
  }
}

export default withRouter(RouterQueryHandler);