import React, {FC} from "react";
import {Breadcrumb} from "antd"
const { Item } = Breadcrumb;

interface Props{
  data?: any
}
// 面包屑
const Main: FC<Props> =(props: any)=> {
  return (
    <Breadcrumb>
      <Item>首页</Item>
      <Item>首页2</Item>
    </Breadcrumb>
  )
}

export default Main;