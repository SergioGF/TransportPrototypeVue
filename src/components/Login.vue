<template>
  <!-- Material form login -->
  <form>
    <p class="h4 text-center mb-4">Log in</p>
    <div class="grey-text">
      <mdb-input label="Your email" icon="envelope" type="email"/>
      <mdb-input label="Your password" icon="lock" type="password"/>
    </div>
    <div class="text-center">
      <mdb-btn @click="login" color="grey">Login</mdb-btn>
    </div>
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
          console.log(err.message)
        }
      )
    }
  }
}
</script>
