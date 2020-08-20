<template>
  <div class="home">
    <div class="center">
      <span class="font-weight-light">CFI</span>
      <span>Referral</span>
      <v-spacer></v-spacer>
      <i>Volunteer Referral App</i>
    </div>
    <div class="center">
      <div v-if="authStatus === 'loading'">
        <Loading />
      </div>
      <div v-if="!isAuthenticated && authStatus !== 'loading'">
        <Login />
      </div>
      <div v-if="isAuthenticated && authStatus !== 'loading'">
        <p>Welcome {{ user.email }} </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import Login from './Login.vue'

@Component({
  components: {
    Login
  },
  computed: {
    ...mapGetters({ user: 'getUser' }),
    ...mapGetters(['isAuthenticated', 'authStatus'])
  }
})
export default class Home extends Vue {
  isAuthenticated!: boolean // from the mapGetters above
  authStatus!: string

  loading () {
    return this.authStatus === 'loading' && !this.isAuthenticated
  }
}
</script>
