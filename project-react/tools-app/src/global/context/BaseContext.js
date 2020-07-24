import React from "react";

// 用户数据
export const UserContext = React.createContext();

// 系统数据
/**
 * menuPath: 菜单选中的path
 */
export const SysMenuContext = React.createContext({
  selectedKey: "", mode: "inline",collapsed: false,
  toggleKey: ()=> {},
  toggleCollapsed: ()=> {}
});