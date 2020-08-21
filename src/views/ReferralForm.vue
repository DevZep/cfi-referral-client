<template>
  <div id="referralForm" class="center">
    <h3>Referral Form</h3>
    <input type="text" name="clientname" v-model="clientname" placeholder="Client Name" />
    <input type="text" name="clientphone" v-model="clientphone" placeholder="Client Phone" />
    <v-btn text color="grey" @click="submit()">Submit Referral</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapActions } from 'vuex'

@Component({
  methods: {
    ...mapActions('Referrals', ['submitReferral'])
  }
})
export default class ReferralForm extends Vue {
  submitReferral!: (referral: {}) => void // from the mapActions above
  clientname = ''
  clientphone = ''

  validateForm () {
    return this.clientname !== '' && this.clientphone !== ''
  }

  async submit () {
    if (this.validateForm()) {
      const { clientname, clientphone } = this
      await this.submitReferral({ clientname, clientphone })
    }
  }
}
</script>
