<template>
  <div class='home center'>
    <div v-if="!isAuthenticated && authStatus !== 'loading'">
      <Login />
    </div>

    <v-card
      id='homeCard'
      class="mx-auto"
      max-width="400"
      v-if="isAuthenticated && authStatus !== 'loading'"
    >
    <v-img class="center image-logo" src="img/CSM_LogoSquare_NoTag_1.png"></v-img>

    <v-card-title>{{ $t('app.title') }}</v-card-title>

      <v-card-subtitle id="name" class="pb-0">{{ $t('home.logged-in-as') }}: {{ user.email }}</v-card-subtitle>

      <v-card-subtitle id="cid" class="pb-0">
        <p id="countMessage">{{ $t('home.you-have-created') }} {{ count }} {{ $t('home.text') }} </p>
      </v-card-subtitle>
      <v-card-text class="text--primary">
          <v-btn id='btnNavigateReferralForm' @click="navigate('/checklist')">
            {{ $t('home.create-new-referral') }}
          </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters, mapActions } from 'vuex'
import Login from '@/components/Login.vue'
import navigate from '../libs/navigate'

@Component({
  components: {
    Login
  },
  methods: {
    ...mapActions('Referrals', ['fetchCount']),
    navigate
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

  loading () {
    return this.authStatus === 'loading' && !this.isAuthenticated
  }
}
</script>
<style scoped>
.image-logo {
  border: none !important;
}
</style>
