const proxy = require('http-proxy-middleware');
const path=require('path');
const isReachable = require('is-reachable');
const target= process.env.PROXY;// require('../package.json').proxy;
const fs=require('fs');
const names=require('../craco.names.json');

function proxy_filter(pathname, req){
  if(pathname === '' || pathname === '/'){
    return false;
  }
  return !path.extname(pathname) || req.method==='POST' ;
}

function until_file_exists(dir, names){
  return new Promise((resolve, reject)=>{
    const files=new Set();
    const fs_watcher=fs.watch(dir, {persistent:true}, (event_type, filename)=>{
      if(event_type === 'rename'){
        files.add(filename);
        if(names.every(name=>files.has(name))){
          resolve(true);
          fs_watcher.close();
        }
      }
    })
  });
}

module.exports = function(app) {
  if(target==null){
    return;
  }
  const proxy_middle=proxy(proxy_filter, {target, changeOrigin: true, cookieDomainRewrite: "localhost"});
  const target_port_only='portonly'+target.substring(4);
  const check_file_exists=until_file_exists(path.resolve(__dirname, `../dist`), ['index.html', ...(names.map(name=> `${name}.html`))]);
  const handle_request=async(req, res, next)=>{
    await check_file_exists;
    if(true){
      await isReachable(target_port_only);
      proxy_middle(req, res, next);
    }else{
      next();
    }
  }
  app.use((req, res, next)=>{
    handle_request(req, res, next);
  });
};