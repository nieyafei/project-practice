import { HashRouter } from 'react-router-dom';

const queryString = require('query-string');
const pathlib = require('path');

function wrapHistory(history){
  var parseSearch=(location)=>{
    if(location.search){
      location.query={...queryString.parse(location.search)};
    }
  }
  parseSearch(history.location);
  history.listen(parseSearch);
  const patch=(fn)=>{
    return (path, ...params)=>{
      if(typeof(path)!=='string'){
        path.pathname=pathlib.normalize(path.pathname);
        path.search=path.query? queryString.stringify(path.query):'';
      }else{
        path=pathlib.normalize(path);
      }
      return fn(path, ...params);
    }
  }
  const {createHref, push, replace}=history;
  history.push=patch(push);
  history.createHref=patch(createHref);
  history.replace=patch(replace);
  return history;
}
export class BetterHashRouter extends HashRouter{
  history = wrapHistory(this.history)
  render(){
    return super.render();
  }
}
