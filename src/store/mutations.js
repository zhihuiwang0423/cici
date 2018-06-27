// import Vue from 'vue'
// 同步操作
export default {
  INCREMENT: (state) => {
    return state.count++
  },
  DECREMENT: (state) => {
    state.count--
  },
  CHEN2: (state) => {
    state.sum = state.sum * 2
    window.localStorage.setItem('sumStorage', state.sum)
  },
  INCREMENT_VALUE: (state, value) => {
    state.count += value
  },
  SHOW_WAITING_MESSAGE: (state) => {
    state.waiting = true
  },
  HIDE_WAITING_MESSAGE: (state) => {
    state.waiting = false
  },
  SET_ACTIVE_TYPE: (state, { data }) => {
    state.topicsData = data
  }
}
