<template>
  <div id="signUp" class='center'>
    <h3>Sign Up</h3>
    <input type="text" name="email" v-model="email" placeholder="Email" />
    <input type="password" name="password" v-model="password" placeholder="Password" />
    <input type="password" name="passwordConfirm" v-model="passwordConfirm" placeholder="Password" />
    <v-btn text color="grey" @click="submitSignUp()">Sign Up</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

@Component({
  computed: {
    ...mapGetters(['isNewUser'])
  },
  methods: {
    ...mapActions(['signUp'])
  }
})
export default class SignUp extends Vue {
  signUp!: (credentials: {}) => void // from the mapActions above
  isNewUser!: boolean
  email = ''
  password = ''
  passwordConfirm = ''

  validateForm () {
    return (
      this.email !== '' &&
      this.password !== '' &&
      this.password === this.passwordConfirm
    )
  }

  async submitSignUp () {
    if (this.validateForm()) {
      const { email, password, passwordConfirm } = this
      await this.signUp({ email, password })
      if (this.isNewUser) { this.$router.push('/confirmCode') }
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
