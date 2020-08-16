<template>
  <nav>
    <v-toolbar>
      <v-toolbar-title class="grey--text">
        <span class="font-weight-light">CFI</span>
        <span>Referral</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="grey">
        <span>Sign Out</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class NavBar extends Vue {}
</script>
