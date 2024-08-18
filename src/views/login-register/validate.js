import { defineRule } from "vee-validate"
export const validateUsername = (val) => {
  if (!val) {
    return '用户名不能为空'
  }
  return true
}

export const validatePassword = (val) => {
  if (!val) {
    return '密码不能为空'
  }
  const reg = /^\d{6,6}$/
  if (!reg.test(val)) {
    return '密码必须由不小于六位的数字组成'
  }
  return true
}
export const isCheckedPolicy = (val) => {
  console.log(val);

  if (!val) {
    console.log('未选中协议');
    return '未选中协议'
  }
  console.log('选中协议');

  return true
}
defineRule('validateConfirmPassword', (val, [passward]) => {
  if (val === passward || val === '') return true
  return '两次输入密码必须一致'
})