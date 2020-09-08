<template>
  <nav>
    <v-toolbar >
      <v-toolbar-title class="grey--text" @click="navigate('/')">
        <v-icon>mdi-home</v-icon>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <div>
        <p text color="grey">{{ $t('app.current-language') }}</p>
      </div>
      <select v-model="$i18n.locale" @change="updateRoute()">
        <option v-for="(lang, i) in $i18n.availableLocales" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
      </select>
      <v-btn v-if="isAuthenticated" text color="grey" @click="submitSignOut()">
        <span>Sign Out</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script lang="ts">
import { nav } from 'aws-amplify'
import { Vue, Component } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'
import navigate from '../libs/navigate'

@Component({
  computed: {
    ...mapGetters('Auth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('Auth', ['signOut']),
    navigate: navigate
  }
})
export default class NavBar extends Vue {
  isAuthenticated!: boolean
  signOut!: () => void; // method from mapActions

  updateRoute () {
    this.$router.push({
      params: { lang: this.$i18n.locale }
    })
  }

  async submitSignOut () {
    await this.signOut()
  }
}
</script>
