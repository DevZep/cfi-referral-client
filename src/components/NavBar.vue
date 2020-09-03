<template>
  <nav>
    <v-toolbar >
      <v-toolbar-title class="grey--text" @click="navigate('/')">
        <v-icon>mdi-home</v-icon>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="isAuthenticated" text color="grey" @click="submitSignOut()">
        <span>Sign Out</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
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

  navigate (path: string) {
    if (this.$route.path !== path) { this.$router.push(path) }
  }

  async submitSignOut () {
    await this.signOut()
    if (!this.isAuthenticated) { this.navigate('/') }
  }
}
</script>
