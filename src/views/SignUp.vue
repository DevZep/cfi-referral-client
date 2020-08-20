<template>
  <div id="login">
    <h3>Sign Up</h3>
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
    ...mapActions(['signUp'])
  }
})
export class SignUp extends Vue {
  signUp!: (credentials: {}) => void // from the mapActions above
  username = ''
  password = ''

  async submitLogin () {
    if (this.username !== '' && this.password !== '') {
      const username = this.username
      const password = this.password
      await this.signUp({ username, password })
    }
  }
}
</script>
