<template>
  <div id="referralForm" class="center">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <v-form v-model="valid" ref="form">
          <h1>Referral Form</h1>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="clientname"
                  label="Name"
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
                      label="Date of Birth"
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
                <label for="">Photo</label>
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
              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="12"
              >
                <v-select
                  v-model="clientlocation"
                  :items="locations"
                  label="Location"
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
            <v-btn @click="submit()">Submit</v-btn>
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

  dobmenu = false

  valid= false

  nameRules = [
    (v: string) => !!v || 'Name is required'
  ]

  phoneRules = [
    (v: string) => !!v || 'Phone is required'
  ]

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

  handleFileChange (e: any) {
    this.$emit('input', e.target.files[0])
    this.clientphoto = e.target.files[0]
  }

  async submit () {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      const { clientname, clientphone, clientphoto, clientnote, clientbirth, clientgender, clientlocation, clientlat, clientlon } = this
      await this.submitReferral({ clientname, clientphone, clientphoto, clientnote, clientbirth, clientgender, clientlocation, clientlat, clientlon })
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
