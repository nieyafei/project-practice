import {message} from "antd";

const api=(url: string, request?: any, token?: string)=>{
  return fetch(url, {
    credentials: 'include',
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token || ""
    },
    body: JSON.stringify(request)
  }).then(async (resp)=>{
    const data:any = resp.json();
    data.then((d: any)=> {
      if(d?.error){
        console.log(d.error)
        message.success(d?.error?.message);
      }
    })
    if(!resp.ok){
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  });
}

const apiResp =(url: string)=>{
  return fetch(url).then((resp)=>{
    const data=resp.json();
    if(!resp.ok){
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  });
}

export {
  api, apiResp
}