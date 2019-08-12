<template>
  <!-- Material form register -->
  <form>
    <p class="h4 text-center mb-4">Sign up</p>
    <div class="grey-text">
      <mdb-input label="Your name" icon="user" type="text"/>
      <mdb-input label="Your email" icon="envelope" type="email" v-model="email" required/>
      <mdb-input label="Confirm your email" icon="exclamation-triangle" type="text" required/>
      <mdb-input label="Your password" icon="lock" type="password" v-model="password" required/>
    </div>
    <div class="text-center">
      <mdb-btn @click="signUp" color="grey">Register</mdb-btn>
    </div><br>
    <p class="text-center mb-4">Do you alredy have one ? <router-link to="/login">Log in</router-link></p>
  </form>
  <!-- Material form register -->
</template>


<script>
import firebase from 'firebase'
import { mdbInput, mdbBtn } from 'mdbvue';
export default {
  name: 'signUp',
  components: {
    mdbInput,
    mdbBtn
  },
  data () {
    return {
      email: '',
      password: '',
      mdbInput,
      mdbBtn
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          alert("Account created!")
          this.$router.replace('login')
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    }
  }
}
</script>
