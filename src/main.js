import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

new Vue({
  el: '#app',
  render: h => h(App),
  http: {
    root: 'https://hacker-news.firebaseio.com/v0'
  }
})
