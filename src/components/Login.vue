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

@Component
export default class Login extends Vue {
  username = ''
  password = ''

  async login () {
    const { dispatch } = this.$store
    if (this.username !== '' && this.password !== '') {
      const username = this.username
      const password = this.password
      await dispatch('login', { username, password })
      if (this.$store.state.isAuthenticated) { this.$router.push('/about') }
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
