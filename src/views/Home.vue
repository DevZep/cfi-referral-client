<template>
  <div class="home">
    <div class="center">
      <span class="font-weight-light">CFI</span>
      <span>Referral</span>
      <v-spacer></v-spacer>
      <i>Volunteer Referral App</i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>

<style scoped>
.center {
  margin: auto;
  width: 50%;
  border: 3px solid rgba(248, 251, 250, 0.561);
  padding: 10px;
}
</style>
