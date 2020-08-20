<template>
  <div id="confirmCode" class='center'>
    <h3>Confirm Code</h3>
    <h4>Check your email {{newUserEmail}} for a confirmation code and submit it below.</h4>
    <input type="text" name="code" v-model="code" placeholder="Code" />
    <v-btn text color="grey" @click="submitConfirmCode()">Confirm Code</v-btn>
    <p v-if="statusMessage">{{statusMessage}}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapGetters, mapActions, mapState } from 'vuex'

@Component({
  computed: {
    ...mapState('Accounts', { newUserEmail: 'newUserEmail' }),
    ...mapGetters('Accounts', ['isNewUser', 'statusMessage'])
  },
  methods: {
    ...mapActions('Accounts', ['confirmCode'])
  }
})
export default class ConfirmCode extends Vue {
  confirmCode!: (code: string) => void
  newUserEmail!: string
  statusMessage!: string
  isConfirmCodeSuccess!: boolean // from the mapGetters above

  code = ''

  async submitConfirmCode () {
    if (this.code !== '') {
      await this.confirmCode(this.code)
      if (this.isConfirmCodeSuccess) {
        this.$router.push('/')
      }
    }
  }
}
</script>
