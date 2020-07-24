const Tool = {};

Tool.toggleKey=(e)=> {
  console.log(e.context)
  const {toggleKey} = e.context;
  toggleKey && toggleKey(e.props.keyName || "index");
}

export default Tool;