<template>
  <div id="signUp" class='center'>
     <div class="center-title">
      <h3>Child Safe</h3>
      <h3>Migration Referral App</h3><br>
    </div>
    <div class="row" id="app">
      <div class="col-md-6 mt-5 mx-auto">
        <form >
          <h3>Sign Up</h3><br>
          <div class="form-group">
            <label for="email">Email</label><br>
            <input type="email" name="email" v-model="email" placeholder="Email@email.com" /><br>
          </div>
          <div class="form-group">
              <label for="">Password</label><br>
              <!-- <input type="password" name="password" v-model="password" placeholder="Password" /><br><br> -->
          </div>
          <v-text-field
                  v-model="password"
                  type="password"
                  :rules="passwordRules"
                  error-count="5"
                  required
          ></v-text-field>
          <div class="form-group">
              <label for="">Verify Password</label><br>
              <input type="password" name="passwordConfirm" v-model="passwordConfirm" placeholder="Verify Password" />
          </div>
          <v-btn text color="white" class="block" @click="submitSignUp()">Sign Up</v-btn>
          <p>Have an account?</p><v-btn text color="green" class="block1" @click="navigate('/')">Sign In</v-btn>
        </form>
      </div>
      </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

@Component({
  computed: {
    ...mapGetters('Accounts', ['isNewUser'])
  },
  methods: {
    ...mapActions('Accounts', ['signUp'])
  }
})
export default class SignUp extends Vue {
  signUp!: (credentials: {}) => void // from the mapActions above
  isNewUser!: boolean
  email = ''
  password = ''
  passwordConfirm = ''
  navigate (path: string) {
    if (this.$route.path !== path) { this.$router.push(path) }
  }

  data () {
    return {
      passwordRules: [
        (v: string) => (v && v.length >= 8) || 'Password must have at least 8 characters',
        (v: string) => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
        (v: string) => /(?=.*\d)/.test(v) || 'Must have one number'
      ]
    }
  }

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
.block {
  display: block;
  width: 60%;
  border: none;
  background-color: #4CAF50;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  margin-bottom: 20px;
}
.block1{
  float: right;
  margin-right: 100px;
  margin-top: -47px;
}
input {
  border: 3px solid rgba(248, 251, 250, 0.561);
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;

}
</style>
