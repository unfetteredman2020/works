export default {
  increment (state, n) {
    state.count += n
  },
  asynUserInfo (state, userInfo) {
    state.userInfo = userInfo
  }
}