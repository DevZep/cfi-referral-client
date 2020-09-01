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
        <router-link to='referralForm'>Create New Referral</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import Login from '@/components/Login.vue'
@Component({
  components: {
    Login
  },
  computed: {
    ...mapGetters('Auth', { user: 'getUser' }),
    ...mapGetters('Auth', ['isAuthenticated', 'authStatus'])
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
<style >
.center-title{
  text-align: center;
  margin-left: -120px;
  margin-top: 30px;
}
</style>
