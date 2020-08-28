<template>
  <v-app class="grey lighten-4">
    <b v-if="env !== 'PROD'" class='warning'>WARNING: THE APP IS RUNNING IN {{env}} MODE. DO NOT USE REAL CLIENT REFERRAL DATA!</b>
    <NavBar />
    <div class="main-container">
      <v-content>
        <router-view></router-view>
      </v-content>
    </div>
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
    ...mapGetters('Auth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('Auth', ['currentSession'])
  }
})
export default class App extends Vue {
  isAuthenticated!: boolean // from the mapGetters above
  currentSession!: () => void // from the mapActions above
  env = process.env.VUE_APP_STAGE ? process.env.VUE_APP_STAGE.toUpperCase() : 'DEV'

  created () {
    if (this.isAuthenticated) {
      this.currentSession()
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: "Roboto", sans-serif;
  color: #2e426b;
}
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.center {
  margin: auto;
  width: 50%;
  border: 3px solid rgba(248, 251, 250, 0.561);
  padding: 10px;
}
input {
  border: 3px solid rgba(248, 251, 250, 0.561);
  padding: 10px;
}
.warning {
  color: rgba(248, 251, 250, 0.561)
}
</style>

<style scoped>
.main-container {
  min-height: calc(100vh - 70px);
}
</style>
