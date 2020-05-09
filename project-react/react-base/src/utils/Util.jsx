import axios from "axios";
import { AxiosStore } from "./Config";
const Util = {};

Util.AxiosStore=()=>{
    console.log("取消api接口访问");
    const CancelToken = axios.CancelToken;
    AxiosStore.source.cancel && AxiosStore.source.cancel();
    AxiosStore.source = CancelToken.source();
}

export default Util;
