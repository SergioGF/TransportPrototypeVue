import Vue from "vue";
import App from "./App";
import router from "./router/index";
import GAuth from 'vue-google-oauth2'
import VueResource from 'vue-resource'
import GoogleSpreadsheet from 'google-spreadsheet'
import VueGAPI from 'vue-gapi'
import credsGoogle from './google-generated-creds.json'
import BootstrapVue from 'bootstrap-vue'
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import VueAnalytics from 'vue-analytics'

const gauthOption = {
  clientId: 'XXXXXXX.apps.googleusercontent.com'
}
Vue.use(GAuth, gauthOption)
Vue.use(VueResource)
Vue.use(GoogleSpreadsheet)
Vue.use(VueGAPI)
Vue.use(credsGoogle)
Vue.use(BootstrapVue)
Vue.use(firebase)
Vue.use(VueAnalytics, {
  id: 'XXXXXX'
})
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'XXXXXXX',
  authDomain: 'XXXXX.firebaseapp.com',
  databaseURL: 'https://XXXXXX.firebaseio.com',
  projectId: 'XXXXX',
  storageBucket: 'XXXXX.appspot.com',
  messagingSenderId: 'XXXXXX',
  appId: 'XXXXXX'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
/* firebase.auth().createUserWithEmailAndPassword('sergon@gmail.com', 'sergio').then(
  function (user) {
    alert('user created')
  },
  function (err) {
    alert(err)
  }
) */

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbvue/build/css/mdb.css';

Vue.use(PaperDashboard);

/* eslint-disable no-new */
/* eslint-disable no-new */
let app = ''
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
})
