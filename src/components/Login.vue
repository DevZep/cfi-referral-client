<template>
  <div id="login">
    <h3>Login</h3>
    <input type="text" name="username" v-model="username" placeholder="Username" />
    <input type="password" name="password" v-model="password" placeholder="Password" />
    <v-btn text color="grey" @click="login()">Login</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Auth } from 'aws-amplify'

@Component
export default class Login extends Vue {
  username = ''
  password = ''

  async login () {
    if (this.username !== '' && this.password !== '') {
      try {
        const user = await Auth.signIn(this.username, this.password)
        console.log('Success! User: ', user)
      } catch (error) {
        console.log('error signing in', error)
      }
    }
  }
}
</script>

<style scoped>
input {
  border: 3px solid rgba(248, 251, 250, 0.561);
  padding: 10px;
}
</style>
