<template>
  <div id="login" class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form>
          <h3>Sign In</h3><br>
            <div class="form-group">
              <label for="email">Email</label><br>
              <input type="email" name="email" v-model="email" placeholder="Email@email.com" />
            </div>
            <div class="form-group">
              <label for="">Password</label><br>
                <span class="passwordEye" v-show="password">
                    <span><font-awesome-icon :icon="['fas', 'eye']" @click="password = !password" /></span>
                </span>
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

  navigate (path: string) {
    if (this.$route.path !== path) { this.$router.push(path) }
  }

  async submitLogin () {
    if (this.email !== '' && this.password !== '') {
      const { email, password } = this
      await this.login({ email, password })
      if (this.isAuthenticated && this.$route.path !== '/') { this.$router.push('/') }
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
</style>
