<template>
  <div id="referralForm" class="center">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <v-form>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="clientname"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="clientphone"
                  label="Phone"
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-select
                  v-model="clientgender"
                  :items="genders"
                  label="Gender"
                ></v-select>

              </v-col>

              <v-col cols="12" lg="6">
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
                      label="Birth Date"
                      hint="MM/DD/YYYY format"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="clientbirth" no-title @input="dobmenu = false"></v-date-picker>
                </v-menu>

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

  genders = [
    'Male',
    'Female',
    'Other',
    'Unknown',
    'Prefer not to answer'
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

  validateForm () {
    return this.clientname !== '' && this.clientphone !== ''
  }

  handleFileChange (e: any) {
    this.$emit('input', e.target.files[0])
    this.clientphoto = e.target.files[0]
  }

  async submit () {
    if (this.validateForm()) {
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
}

.file-select > input[type="file"] {
  display: none;
}

select:required:invalid {
  color: gray;
}

.title{
  background:green;
  color: white;
  margin: 10px;
  text-align: center;
  padding: 10px;
}

/* .select-button{
  margin-right: 130px;
}
.block1{
  float: right;
  margin-right: 100px;
  margin-top: -47px;
  background: green;
  width: 50px;
  height: 70px;
  margin-top: 20px;
}
.title{
  background:green;
  color: white;
  margin: 0px;
  text-align: center;
  padding-top: 15px;

}
.form-group{
  margin-left: 40px;
}
.form{
  border-style:groove;
  padding-top: -90px;
  padding-bottom: 60px;

} */

</style>
