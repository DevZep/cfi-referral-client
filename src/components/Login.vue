<template>
  <div id="login">
    <h3>Login</h3>
    <input type="text" name="email" v-model="email" placeholder="Email" />
    <input type="password" name="password" v-model="password" placeholder="Password" />
    <v-btn text color="grey" @click="submitLogin()">Login</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

@Component({
  computed: {
    ...mapGetters('Auth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('Auth', ['login'])
  }
})
export default class Login extends Vue {
  login!: (credentials: {}) => void // from the mapActions above
  isAuthenticated!: boolean // from the mapGetters above
  email = ''
  password = ''

  async submitLogin () {
    if (this.email !== '' && this.password !== '') {
      const { email, password } = this
      await this.login({ email, password })
      if (this.isAuthenticated && this.$route.path !== '/') { this.$router.push('/') }
    }
  }
}
</script>
