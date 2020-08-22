<template>
  <div id="referralCounter" class='center'>
    <h1>Referral Counter</h1>
    <p>Thank you for assitance!</p>
    <p id="countMessage">You have created {{ count }} referrals</p>
    <router-link to='referralForm'>New Referral</router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapGetters, mapActions } from 'vuex'

@Component({
  methods: {
    ...mapActions('Referrals', ['fetchCount'])
  },
  computed: {
    ...mapGetters('Referrals', { count: 'getCount' })
  }
})
export default class ReferralCounter extends Vue {
  fetchCount!: () => void

  created () {
    this.fetchCount()
  }
}
</script>
