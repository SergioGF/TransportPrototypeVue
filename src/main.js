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
  clientId: '354521227503-2f4m6prq5jjs5g1qj1odcl6bhmqc2jv7.apps.googleusercontent.com'
}
Vue.use(GAuth, gauthOption)
Vue.use(VueResource)
Vue.use(GoogleSpreadsheet)
Vue.use(VueGAPI)
Vue.use(credsGoogle)
Vue.use(BootstrapVue)
Vue.use(firebase)
Vue.use(VueAnalytics, {
  id: 'UA-140020631-2'
})
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAdy4Tio9rLlY7UpvCe_G_vPZhM7tYByl8',
  authDomain: 'tfmv1-231410.firebaseapp.com',
  databaseURL: 'https://tfmv1-231410.firebaseio.com',
  projectId: 'tfmv1-231410',
  storageBucket: 'tfmv1-231410.appspot.com',
  messagingSenderId: '354521227503',
  appId: '1:354521227503:web:29ee727c11b5a099'
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
