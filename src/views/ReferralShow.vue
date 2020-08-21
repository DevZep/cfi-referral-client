<template>
  <div id="referralShow" class='center'>
    <h1>Referral Details</h1>
    <p>ID: {{ $route.params.id }}</p>
    <p>Name: {{ referral.name }}</p>
    <p>Phone: {{ referral.phone }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapGetters, mapActions } from 'vuex'

@Component({
  methods: {
    ...mapActions('Referrals', ['fetchReferral'])
  },
  computed: {
    ...mapGetters('Referrals', { referral: 'getReferral' })
  }
})
export default class ReferralCounter extends Vue {
  fetchReferral!: (referralId: string) => void

  created () {
    this.fetchReferral(this.$route.params.id)
  }
}
</script>
