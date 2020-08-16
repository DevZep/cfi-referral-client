<template>
  <div id="login">
    <h3>Login</h3>
    <input type="text" name="username" v-model="username" placeholder="Username" />
    <input type="password" name="password" v-model="password" placeholder="Password" />
    <v-btn text color="grey" @click="submitLogin()">Login</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapActions } from 'vuex'

@Component({
  methods: {
    ...mapActions(['login'])
  }
})
export default class Login extends Vue {
  login!: (credentials: {}) => void // from the mapActions above
  username = ''
  password = ''

  async submitLogin () {
    if (this.username !== '' && this.password !== '') {
      const username = this.username
      const password = this.password
      await this.login({ username, password })
      if (this.$store.state.authenticated) { this.$router.push('/about') }
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
