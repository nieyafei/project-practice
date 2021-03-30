import action from '../action';

function create_fn_reducer(NAME){
  return function(state=null, action){
    if(action.type===NAME){
      if(action.fn){
        return action.fn(state, action.state);
      }
      return action.state==null? null:action.state;
    }
    return state;
  }
}

const reducers=Object.keys(action).reduce((ret, name)=> ({...ret, [name]:create_fn_reducer(name)}), {});

export default {
  ...reducers,
}
