<template>
  <div id="referralCounter" class='center'>
    <div class="title">
    <h1>Refer Client</h1>
    </div>
    <p>Thank you for assitance!</p>
    <p id="countMessage">You have successfully referred this many clients:      {{ count }} </p> <br>

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
<style scoped>
.title{
  background:green;
  color: white;
  margin: 0px;
  text-align: center;
  padding-top: 15px;
}
</style>
