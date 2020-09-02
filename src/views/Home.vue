<template>
  <div class="home">
    <div class="center-title">
      <h3>Child Safe</h3>
      <h3>Migration Referral App</h3>
      <v-spacer></v-spacer>
    </div>
    <div class="center">
      <div v-if="authStatus === 'loading'">
        <Loading />
      </div>
      <div v-if="!isAuthenticated && authStatus !== 'loading'">
        <Login />
      </div>
      <div v-if="isAuthenticated && authStatus !== 'loading'">
        <p id='welcomeMessage'>Welcome {{ user.email }}</p>
        <p id="countMessage">You have created {{ count }} referrals</p>
        <v-btn text color="white" class="block" @click="navigate('/referralForm')">Create New Referral</v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters, mapActions } from 'vuex'
import Login from '@/components/Login.vue'

@Component({
  components: {
    Login
  },
  methods: {
    ...mapActions('Referrals', ['fetchCount'])
  },
  computed: {
    ...mapGetters('Auth', { user: 'getUser' }),
    ...mapGetters('Auth', ['isAuthenticated', 'authStatus']),
    ...mapGetters('Referrals', { count: 'getCount' })
  }
})
export default class Home extends Vue {
  isAuthenticated!: boolean // from the mapGetters above
  authStatus!: string
  fetchCount!: () => void

  created () {
    if (this.isAuthenticated) { this.fetchCount() }
  }

  navigate (path: string) {
    if (this.$route.path !== path) { this.$router.push(path) }
  }

  loading () {
    return this.authStatus === 'loading' && !this.isAuthenticated
  }
}
</script>
<style >
.center-title{
  text-align: center;
  margin-left: -120px;
  margin-top: 30px;
}
</style>
