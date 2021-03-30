function create_fn_action(NAME, fn){
  return function(state){
    return {type:NAME, fn, state};
  }
}

export default {};
