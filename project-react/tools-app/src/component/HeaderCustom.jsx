import React, {Component} from "react";
import { Link } from "react-router-dom";
import { SysMenuContext } from "../global/context/BaseContext";
import Tool from "../utils/Tool"
// 菜单
export default class Main extends Component {
  state = {}
  componentDidMount(){
    Tool.toggleKey(this)
  }
  static contextType = SysMenuContext;
  render() {
    return (
      <div />
    )
  }
}