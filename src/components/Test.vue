<template>
<div>
  <router-link to="/">Home</router-link>
  <div>{{mode}}</div>
  <div>{{this.$store.state.count}}</div>
  <div><button @click="add">+1</button></div>
  <div><button @click="decrement">-1</button></div>
  <div>{{this.$store.state.sum}}</div>
  <div><button @click="chen2">*2</button></div>
  <div>
    <input type="text" v-model="incrementVal">
    <button @click="incrementValue">increment</button>
  </div>
  <div v-if="show">
    waiting
  </div>
  <div :class="active">{{fullSum}}</div>
</div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      mode: process.env.VUE_ENV === 'server' ? 'server' : 'client',
      incrementVal: 1
    }
  },
  mounted () {
    console.log(window.localStorage.getItem('sumStorage'))
    var sumStorage = window.localStorage.getItem('sumStorage')
    if (sumStorage) {
      this.$store.state.sum = sumStorage
    }
  },
  computed: {
    // show: function () {
    //   return this.$store.state.waiting
    // }
    ...mapState({
      show: (state) => state.waiting
    }),
    // fullSum () {
    //   return this.$store.getters.fullSum
    // }
    ...mapGetters(['fullSum'])
  },
  methods: {
    // babelrc
    ...mapActions({
      chen2: 'chen2',
      decrement: 'decrement',
      add: 'increment'
    }),
    incrementValue () {
      try {
        this.$store.dispatch('incrementValue', this.incrementVal)
        this.incrementVal = this.$store.state.count
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

