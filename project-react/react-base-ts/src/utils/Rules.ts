// 规则

export const PHONE_PATTERN = /^1(3|4|5|6|7|8|9)\d{9}$/;//手机验证正则表达式

// 手机号验证
export const PhoneRules = [{required: true, pattern: PHONE_PATTERN, message: "请输入正确格式手机号"}];