import { getUserInfo } from '../axios/api' 
export default {
  async increment({commit}, params) {
    setTimeout(() => {
      commit('increment',params );
    }, 2000);
  },
  async asynUserInfo({commit}, params) {
    console.log('params', params)
    commit('asynUserInfo',params );
  },
  async getUserInfo({commit}, user_id = '') {
    try {
      const res = await  getUserInfo(user_id)
      console.log('res', res)
      if(res && res.code == 200) {
        commit('asynUserInfo',res.data );
      }else {
        this.$message({
          type: 'error',
          message: '更新用户信息失败'
        })
      }
    } catch (error) {
      console.log('error', error)
      this.$message({
        type: 'error',
        message: '更新用户信息失败'
      })
    }
  }
}