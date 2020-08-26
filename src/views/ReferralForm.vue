<template>
  <div id="referralForm" class="center">
    <h3>Referral Form</h3>
    <input type="text" name="clientname" v-model="clientname" placeholder="Client Name" />
    <input type="text" name="clientphone" v-model="clientphone" placeholder="Client Phone" />
    <input type="text" name="clientnote" v-model="clientnote" placeholder="Client Note" />
    <label class="file-select">
      <!-- We can't use a normal button element here, as it would become the target of the label. -->
      <div class="select-button">
        <!-- Display the filename if a file has been selected. -->
        <span v-if="clientphoto">Selected Photo: {{clientphoto.name}}</span>
        <span v-else>Select Photo</span>
      </div>
      <!-- Now, the file input that we hide. -->
      <input type="file" @change="handleFileChange"/>
    </label>
    <v-btn text color="grey" @click="submit()">Submit Referral</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapActions } from 'vuex'

@Component({
  methods: {
    ...mapActions('Referrals', ['submitReferral'])
  }
})
export default class ReferralForm extends Vue {
  submitReferral!: (referral: {}) => void // from the mapActions above
  clientname = ''
  clientphone = ''
  clientnote = ''
  clientphoto = null

  validateForm () {
    return this.clientname !== '' && this.clientphone !== ''
  }

  handleFileChange (e: any) {
    this.$emit('input', e.target.files[0])
    this.clientphoto = e.target.files[0]
  }

  async submit () {
    if (this.validateForm()) {
      const { clientname, clientphone, clientphoto, clientnote } = this
      await this.submitReferral({ clientname, clientphone, clientphoto, clientnote })
    }
  }
}
</script>

<style scoped>
.file-select > .select-button {
  padding: 1rem;

  color: white;
  background-color: #173a3a;

  border-radius: .3rem;

  text-align: center;
  font-weight: bold;
}

.file-select > input[type="file"] {
  display: none;
}
</style>
