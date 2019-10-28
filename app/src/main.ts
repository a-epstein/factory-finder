import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import _ from 'lodash';
import VueGAPI from 'vue-gapi';

const apiConfig = {
  apiKey: 'AIzaSyA-bn5RiTPUmUUoat3aL46_eI1KY1tYe9I',
  clientId: '975045708284-8mq2mm9v7tkb0qivcktqo0a8hpchrn79.apps.googleusercontent.com',
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  scope: 'https://www.googleapis.com/auth/spreadsheets'
}

Vue.use(VueGAPI, apiConfig)
Vue.set(Vue.prototype, '_', _)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker-cache.js')
    .then(() => {
      console.log('Service Worker Registered')
    })
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#root');
