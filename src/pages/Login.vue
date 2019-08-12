<template>
  <!-- Material form login -->
  <form>
    <p class="h4 text-center mb-4">Log in</p>
    <div class="grey-text">
      <mdb-input label="Your email" icon="envelope" type="email" v-model="email" required/>
      <mdb-input label="Your password" icon="lock" type="password" v-model="password" required/>
    </div>
    <div class="text-center">
      <mdb-btn @click="login" color="grey">Login</mdb-btn>
    </div><br>
    <p class="text-center mb-4">You don't have an account ? <router-link to="/signup">Create one</router-link></p>
  </form>
  <!-- Material form login -->
</template>

<script>
import firebase from 'firebase'
import { mdbInput, mdbBtn } from 'mdbvue';
export default {
  name: 'login',
  components: {
    mdbInput,
    mdbBtn
  },
  data () {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('dashboard')
        },
        (err) => {
          // alert('Oops. ' + err.message)
          alert.log(err.message)
        }
      )
    }
  }
}
</script>
