<template>
  <v-app class="grey lighten-4">
    <NavBar />
    <br/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters, mapActions } from 'vuex'
import NavBar from '@/components/NavBar.vue'

@Component({
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    ...mapActions(['currentSession'])
  }
})
export default class App extends Vue {
  isAuthenticated!: boolean // from the mapGetters above
  currentSession!: () => void // from the mapActions above

  created () {
    if (this.isAuthenticated) {
      this.currentSession()
    }
  }
}
</script>
