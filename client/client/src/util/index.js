export default {
  //获取用户信息
  getUserInfo() {
    const userInfo = window.localStorage.getItem('userInfo')
    return JSON.parse(userInfo)
  },
  //保存用户信息
  saveUserInfo(userInfo) {
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
  },
  updateUserInfo(key, value) {
    //先获取信息
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    //更新信息
    userInfo[key] = value
    //存储信息
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
  },
  //删除用户信息
  delUserInfo(key) {
    window.localStorage.removeItem(key)
  },
  //检查登录状态
  checkLogin(_this) {
    const userInfo = window.localStorage.getItem('userInfo')
    if (!userInfo) {
      //如果缓存中没有用户信息，则是没登录
      //跳转到登录页
      _this.$router.replace('/login')
    }
  }
}