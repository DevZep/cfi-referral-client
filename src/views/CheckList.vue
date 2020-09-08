<template>
  <div id="checkList" class="center">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
          <v-container>
            <v-row>
               <p class="text-left">Does the person you wish to refer have the following:</p>
            </v-row>
             <v-row>
               <p class="text-left">Travel Ticket(bus or plane ticket)</p>
                <v-radio-group v-model="radio" row>
                    <v-radio label="Yes" value="yes" required></v-radio>
                    <v-radio label="No" value="no" required></v-radio>
                </v-radio-group>
            </v-row>
            <v-row>
               <p class="text-left">Cambodia Overseas worker card (Card issued by the Cambodian government)</p>
                <v-radio-group v-model="radio" row>
                    <v-radio label="Yes" value="yes" required></v-radio>
                    <v-radio label="No" value="no" required></v-radio>
                </v-radio-group>
            </v-row>
            <v-row>
               <p class="text-left">Black Passport (document issued by the Cambodian government)</p>
                <v-radio-group v-model="radio" row>
                    <v-radio label="Yes" value="yes" required></v-radio>
                    <v-radio label="No" value="no" required></v-radio>
                </v-radio-group>
            </v-row>
            <v-row>
               <p class="text-left">Work Visa (document or Stamp in your Black passport or Work permit (issued by your country you are moving to)</p>
                <v-radio-group v-model="radio" row>
                    <v-radio label="Yes" value="yes" required></v-radio>
                    <v-radio label="No" value="no" required></v-radio>
                </v-radio-group>
            </v-row>
            <v-row>
               <p class="text-left">Employment Contract (issued by the person you plan to work for) or Service Contract / Guarantee Agreement (an agreement between you and a recruitment agency)</p>
                <v-radio-group v-model="radio" row>
                    <v-radio label="Yes" value="yes" required></v-radio>
                    <v-radio label="No" value="no" required></v-radio>
                </v-radio-group>
            </v-row>
            <v-row>
               <p class="text-left">Do you have these documents with you?</p>
                <v-radio-group v-model="radio" row>
                    <v-radio label="Yes" value="yes" name="test" required></v-radio>
                    <v-radio label="No" value="no" name="test" required></v-radio>
                </v-radio-group>
            </v-row>
            <v-row>
               <p class="text-left">Do you know where you can access support and help in your destination country?</p>
                <v-radio-group v-model="radio" row>
                    <v-radio label="Yes" value="yes"  name="test"  required></v-radio>
                    <v-radio label="No" value="no"    name="test" required></v-radio>

                </v-radio-group>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-card-text class="text--primary">
                <v-btn color="success" id='btnNavigateCheckList' @click="navigate('/referralForm')">
                  Next
                </v-btn>
              </v-card-text>
            </v-card-actions>

          </v-container>
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
        (v: string) => /(?=.*\d)/.test(v) || 'Must have one number',
        (v: string) => /(?=.*[a-z])/.test(v) || 'Must have one lower case'
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

.v-radio-group{
    margin-bottom: 100px;
    padding: 100px;
}
</style>
