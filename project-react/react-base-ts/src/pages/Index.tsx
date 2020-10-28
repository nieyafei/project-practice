import React from "react";
import {Tips} from "../components/Base";

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
const Index: React.FC<Props> =(props)=> {
  console.log('打印数据', props)
  const { children, ...restProps } = props;
  return <Tips />
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