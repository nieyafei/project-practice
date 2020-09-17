const api=(url, request, token)=>{
  return fetch(url, {
    credentials: 'include',
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(request)
  }).then((resp)=>{
    const data=resp.json();
    if(!resp.ok){
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  });
}

const apiResp =(url)=>{
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