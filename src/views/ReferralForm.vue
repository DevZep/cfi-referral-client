<template>
  <div id="referralForm" class="center">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <v-form v-model="valid" ref="form">
          <h1>{{ $t('referralForm.title') }}</h1>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="clientname"
                  v-bind:label="$t('referralForm.name')"
                  hint="Enter the clients name"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-menu
                  v-model="dobmenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="clientbirth"
                      v-bind:label="$t('referralForm.date-of-birth')"
                      hint="YYYY/MM/DD format"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="clientbirth" no-title @input="dobmenu = false"></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="12"
              >
                <v-select
                  v-model="clientgender"
                  :items="genders"
                  label="Gender"
                ></v-select>

              </v-col>
            </v-row>

            <v-row>
               <v-col
                cols="12"
              >
                <v-text-field
                  v-model="clientphone"
                  label="Phone"
                  :rules="phoneRules"
                  required
                  hint="Enter the clients phone in local format, example: 012999888"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="12"
              >
              <v-file-input
                label="Photo"
                filled
                accept="image/*"
                prepend-icon="mdi-camera"
                @change="handleFileChange"
              ></v-file-input>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="12"
              >
                <v-select
                  v-model="clientlocation"
                  :items="locations"
                  label="Location Classification"
                ></v-select>

              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="clientnote"
                  label="Note"
                  value=""
                  hint="Include any additional information here"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="12"
              >
                <v-select
                  v-model="orgemail"
                  :items="orgemails"
                  :rules="orgemailRules"
                  label="Send referral to?"
                  item-text="display"
                  item-value="email"
                ></v-select>

              </v-col>
            </v-row>

            <v-btn @click="submit()" :loading='loading'>Submit</v-btn>
          </v-container>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import { onError } from '@/libs/errorLib'
import orgemails from '@/libs/orgEmails'

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
  clientbirth = ''
  clientgender = ''
  clientlocation = ''
  clientphoto = null
  clientlat: number | null = null
  clientlon: number | null = null
  orgemail = null

  dobmenu = false
  valid= false
  loading= false

  nameRules = [
    (v: string) => !!v || 'Name is required'
  ]

  phoneRules = [
    (v: string) => !!v || 'Phone is required'
  ]

  orgemailRules = [
    (v: string) => !!v || 'Org email is required'
  ]

  // the whitelisted set of orgemails
  // loaded from @/libs/orgEmails
  orgemails = orgemails

  genders = [
    'Male',
    'Female',
    'Other',
    'Unknown',
    'Prefer not to answer'
  ]

  locations = [
    'Home',
    'School',
    'Work',
    'Family Member',
    'Friend',
    'Commune/Village'
  ]

  created () {
    this.getCurrentPosition()
  }

  async getCurrentPosition () {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        this.clientlat = latitude
        this.clientlon = longitude
      }, err => {
        onError(err)
      }, options)
    }
  }

  handleFileChange (file: any) {
    this.clientphoto = file
  }

  async submit () {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.loading = true
      const { clientname, clientphone, clientphoto, clientnote, clientbirth, clientgender, clientlocation, clientlat, clientlon, orgemail } = this
      await this.submitReferral({ clientname, clientphone, clientphoto, clientnote, clientbirth, clientgender, clientlocation, clientlat, clientlon, orgemail })
      this.loading = false
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
  margin-top: 1rem;
}

.file-select > input[type="file"] {
  display: none;
}

select:required:invalid {
  color: gray;
}
</style>
