<template>
  <nav>
    <v-toolbar >
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer">
      </v-app-bar-nav-icon>
      <v-toolbar-title class="grey--text" @click="navigate('/')">
        <span class="font-weight-light">CFI</span>
        <span>Referral</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="isAuthenticated" text color="grey" @click="submitSignOut()">
        <span>Sign Out</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <span class="font-weight-light">CFI</span>
            <span>Referral</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            Volunteer Referral App
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          router :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

@Component({
  computed: {
    ...mapGetters('Auth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('Auth', ['signOut'])
  }
})
export default class NavBar extends Vue {
  isAuthenticated!: boolean
  signOut!: () => void; // method from mapActions
  drawer = false
  items= [
    { title: 'Home', icon: 'mdi-home', route: '/' },
    { title: 'Referral', icon: 'mdi-help-box', route: '/referralForm' }
  ]

  navigate (path: string) {
    if (this.$route.path !== path) { this.$router.push(path) }
  }

  async submitSignOut () {
    await this.signOut()
    if (!this.isAuthenticated) { this.navigate('/') }
  }
}
</script>
