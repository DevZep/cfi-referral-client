<template>
  <div id="confirmCode" class='center'>
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <div class="center-title">
          <v-img class="center image-logo" src="img/CSM_LogoSquare_NoTag_1.png"></v-img>
          <v-card-title>{{ $t('app.title') }}</v-card-title>
        </div>
        <v-form >
          <v-card-title>{{ $t('signUpEnterCode.title') }}</v-card-title>
          <v-card-title>{{ $t('signUpEnterCode.paragraph1') }} {{newUserEmail}} {{ $t('signUpEnterCode.paragraph2') }}</v-card-title>
          <div v-if="statusMessage" clsss='block' style='color: red'><b>{{statusMessage}}</b></div>
            <v-label>{{ $t('signUpEnterCode.code') }}</v-label><br>
            <v-row>
              <v-col cols="8">
                <v-text-field
                      type="email"
                        v-model="code"
                        :hint="$t('signUpEnterCode.insertCode')"
                        required
                ></v-text-field>
              </v-col>
            </v-row>
          <v-btn text color="white" class="block" @click="submitConfirmCode()" :loading='loading'>{{ $t('signUpEnterCode.submitCode') }}</v-btn>
          <p>{{ $t('signUpEnterCode.text') }}</p><br>
          <v-btn text color="green" class="block1" @click="navigate('/')">{{ $t('signUpEnterCode.signIn') }}</v-btn><br>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapGetters, mapActions, mapState } from 'vuex'
import navigate from '../libs/navigate'

@Component({
  computed: {
    ...mapState('Accounts', { newUserEmail: 'newUserEmail' }),
    ...mapGetters('Accounts', ['isNewUser', 'statusMessage'])
  },
  methods: {
    ...mapActions('Accounts', ['confirmCode']),
    navigate
  }
})
export default class ConfirmCode extends Vue {
  confirmCode!: (code: string) => void
  newUserEmail!: string
  statusMessage!: string
  code = ''
  loading= false

  async submitConfirmCode () {
    if (this.code !== '') {
      this.loading = true
      await new Promise(resolve => setTimeout(resolve, 1000))
      await this.confirmCode(this.code)
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
  margin-bottom: 100px;
}
.block1{
  float: right;
  margin-right: 100px;
  margin-top: -47px;
}
v-btn{
  margin-bottom: 40px;
}
.image-logo {
  border: none !important;
}
</style>
