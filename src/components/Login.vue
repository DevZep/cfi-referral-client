<template>
  <div id="login" class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <v-form>
        <v-container>
         <div class="center-title">
          <v-img class="center image-logo" src="img/CSM_LogoSquare_NoTag_1.png"></v-img>

          <v-card-title>{{ $t('app.title') }}</v-card-title>
         </div>

          <div v-if="emailCodeConfirmed" clsss='block' style='color: red'>{{ $t('login.text') }}</div>
          <v-card-title>{{ $t('login.sign-in') }}</v-card-title>
            <v-label for="email">{{ $t('login.email') }}</v-label><br>
            <v-row>
               <v-col
                cols="8"
              >
                <v-text-field
                  v-model="email"

                  :hint="$t('login.email')"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-label for="password">{{ $t('login.password') }}</v-label><br>
            <v-row>
               <v-col
                cols="8"
              >
                <v-text-field
                  type="password"

                  v-model="password"

                  :hint="$t('login.password')"

                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn text color="white" class="block"  @click="submitLogin()" :loading='loading'>{{ $t('login.signin') }}</v-btn>
            <v-btn text color="green" class="block1" @click="navigate('/signUp')">{{ $t('login.signup') }}</v-btn>
            </v-container>
        </v-form>
      </div>
    </div>
    <p>Build: {{buildSHA}}</p>
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
  loading= false
  buildSHA = process.env.COMMIT_REF // env var from netlify build process

  async submitLogin () {
    if (this.email !== '' && this.password !== '') {
      this.loading = true
      const { email, password } = this
      await new Promise(resolve => setTimeout(resolve, 1000))
      await this.login({ email, password })
      this.loading = false
    }
  }
}
</script>
<style scoped>
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
.center-title{
  margin-bottom: 20px;
}
.image-logo {
  border: none !important;
}
</style>
