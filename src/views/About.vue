<template>
  <div class="about">
    <h1>This is an about page. Nothing much to see here yet!</h1>
    <p v-if="isAuthenticated">Welcome {{ user.email }} </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'

@Component({
  computed: {
    ...mapState(['user', 'isAuthenticated'])
  }
})
export default class About extends Vue {}
</script>
