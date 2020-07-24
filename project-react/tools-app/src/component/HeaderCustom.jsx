import React, {Component} from "react";
import { Link } from "react-router-dom";
import { SysMenuContext } from "../global/context/BaseContext";
import Tool from "../utils/Tool"
// 菜单
export default class Main extends Component {
  state = {}
  componentDidMount(){
    console.log(this)
    Tool.toggleKey(this)
  }
  static contextType = SysMenuContext;
  render() {
    return (
      <div>
        我是导航
      </div>
    )
  }
}