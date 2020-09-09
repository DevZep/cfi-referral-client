<template>
  <div id="login" class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
         <div class="center-title">
          <h3>Safe Movement</h3>
          <!-- <h4>Migration Referral App</h4><br> -->
        </div>
        <form>
          <div v-if="emailCodeConfirmed" clsss='block' style='color: red'>You have successfully verified your email. For your security, please log in now.</div>
          <h3>Sign In</h3><br>
            <div class="form-group">
              <label for="email">Email</label><br>
              <input type="email" name="email" v-model="email" placeholder="Email@email.com" />
            </div>
            <div class="form-group">
              <label for="">Password</label><br>
              <input type="password" name="password" v-model="password" placeholder="Password" /><br>
            </div>
            <v-btn text color="white" class="block" @click="submitLogin()">Sign In</v-btn>
            <v-btn text color="green" class="block1" @click="navigate('/signUp')">Sign Up</v-btn>
        </form>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'
import navigate from '../libs/navigate'

@Component({
  computed: {
    ...mapGetters('Auth', ['isAuthenticated']),
    ...mapGetters('Accounts', ['emailCodeConfirmed'])
  },
  methods: {
    ...mapActions('Auth', ['login']),
    navigate: navigate
  }
})
export default class Login extends Vue {
  login!: (credentials: {}) => void // from the mapActions above
  isAuthenticated!: boolean // from the mapGetters above
  emailCodeConfirmed!: boolean // from the mapGetters above
  email = ''
  password = ''

  async submitLogin () {
    if (this.email !== '' && this.password !== '') {
      const { email, password } = this
      await this.login({ email, password })
    }
  }
}
</script>
<style >
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
}
.block1{
  float: right;
  margin-right: 100px;
  margin-top: 10px;
}
input {
  border: 3px solid rgba(248, 251, 250, 0.561);
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.center-title{
  margin-bottom: 20px;
}

</style>
