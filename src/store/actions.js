import axios from 'axios'
export default {
  // 异步操作
  // increment (context) {
  //   context.commit('INCREMENT')
  // },
  // decrement (context) {
  //   context.commit('DECREMENT')
  // }
  increment: ({ commit }) => {
    commit('INCREMENT')
  },
  decrement: ({ commit }) => {
    commit('DECREMENT')
  },
  chen2: ({ commit }) => {
    commit('CHEN2')
  },
  incrementValue: ({ commit }, value) => {
    commit('SHOW_WAITING_MESSAGE')
    let intValue = parseInt(value)
    if (isNaN(intValue)) {
      console.log('not an interger')
    } else {
      commit('HIDE_WAITING_MESSAGE')
      commit('INCREMENT_VALUE', intValue)
    }
  },
  FETCH_LIST_DATA: ({ commit }) => {
    return axios.get('https://cnodejs.org/api/v1/topics', {
      params: {
        page: 1,
        tab: 'good'
      }
    }).then((res) => {
      var data = res.data.data
      commit('SET_ACTIVE_TYPE', { data })
    })
  }
}
