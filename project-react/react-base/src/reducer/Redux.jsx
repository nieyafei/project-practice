import Tool from "../utils/Tool";

const type = {};
/**
 * 存储登录的用户信息
 *
 * @param {string} [state=JSON.parse(Tool.localItem('User'))]
 * @param {Object} action
 * @returns Object
 */
const User = (state = JSON.parse(Tool.localItem('User')), action) => {

  switch (action.type) {
      case 'loginSuccess': //登录成功
          Tool.localItem('User', JSON.stringify(action.UserJson));
          return action.UserJson;
      case 'loginOut': //退出
          // Util.loginOut();
          return null;
      case 'set_user_res':
          return state = JSON.parse(Tool.localItem('User'));
      default:
          return state;
  }
}

const handleData = (state = {isFetching: true, data: {}}, action) => {
    switch (action.type) {
        case type.REQUEST_DATA:
            return {...state, isFetching: true};
        case type.RECEIVE_DATA:
            return {...state, isFetching: false, data: action.data};
        default:
            return {...state};
    }
};
const httpData = (state = {}, action) => {
    switch (action.type) {
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
            return {
                ...state,
                [action.category]: handleData(state[action.category], action)
            };
        default:
            return {...state};
    }
};
/*
*
* */
const SystemConfig =(state={},action)=>{
    switch (action.type){
        case "set_system_config":
            return Object.assign({}, state, {
                [action.tab]: action.result
            });
        default:
            return state;
    }
};

/*
* 公用loading和modal数据
* */
const CommonSystem=(state={},action)=>{
    switch (action.type){
        case "set_common_obj_loading":
            return Object.assign({}, state, {
                [action.tab]: action.result
            });
        default:
            return state;
    }
};

/*
 * 基础接口数据
 * */
const BaseData=(state={},action)=>{
    switch (action.type){
        case "set_base_data":
            return Object.assign({}, state, {
                [action.tab]: action.result
            });
        case "reset_base_data":
            return Object.assign({});
        default:
            return state;
    }
};

export default {
    User,httpData,CommonSystem,SystemConfig,BaseData
};
