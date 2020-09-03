<template>
  <div class='home center'>
    <div v-if="authStatus === 'loading'">
      <Loading />
    </div>
    <div v-if="!isAuthenticated && authStatus !== 'loading'">
      <Login />
    </div>
    <v-card
      id='homeCard'
      class="mx-auto"
      max-width="400"
      v-if="isAuthenticated && authStatus !== 'loading'"
    >
    <v-card-title>Child Safe</v-card-title>

      <v-card-subtitle><b>Migration Referral App</b></v-card-subtitle>

      <v-card-subtitle id="name" class="pb-0">Logged in as: {{ user.email }}</v-card-subtitle>

      <v-card-subtitle id="cid" class="pb-0">
        <p id="countMessage">You have created {{ count }} referrals</p>
      </v-card-subtitle>

      <v-card-text class="text--primary">
          <v-btn id='btnNavigateReferralForm' @click="navigate('/referralForm')">
            Create New Referral
          </v-btn>
      </v-card-text>
    </v-card>
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
