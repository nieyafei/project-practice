import React, {useEffect} from "react";
import {Tips} from "../components/Base";
import { api } from "../global/api"

/* const Index =(props: any)=>{
  console.log(props)
  return (
    <div>
      <Tips />
    </div>
  )
} */
type Props = {
  className?: string;
  style?: React.CSSProperties;
};

async function fetchApi(){
  const resp = await api('/api/auth/code/checkImg', null, '');
  console.log(resp)
}

const Index: React.FC<Props> =(props)=> {
  console.log('打印数据', props)
  const { children } = props;
  useEffect(()=> {
    fetchApi();
  })
  return <>
    <Tips />
    {children}
  </>
}
export default Index;
/* import React from 'react'

interface Props {
    endDate: string,
    timeout: any
}
interface State {
    now: any
}
let timer: any = null
class CountDown extends React.Component<Props, State>{
    readonly state: Readonly<State> = {
        now: moment()
    }

    componentDidMount(){
        timer = setInterval((): void => {
            this.setState({
                now: moment()
            })
        }, 1000)
    }
    componentWillUnmount(){
        clearInterval(timer)
    }
    
    get countDown(){ //类似 vue 中的计算属性
        return (endDate: string): string => {}
        }
    }

    render(): any{
        return (
            ......
        )
    }
}

export default CountDown */