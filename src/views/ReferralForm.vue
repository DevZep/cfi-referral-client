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
              <v-label for="name">{{ $t('referralForm.name') }}</v-label>
                <v-text-field
                  v-model="clientname"
                  :hint="$t('referralForm.clientName')"
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
                  <template v-slot:activator="{ on }">
                    <v-label for="name">{{ $t('referralForm.date-of-birth') }}</v-label>
                    <v-text-field
                      v-model="clientbirth"
                      :hint="$t('referralForm.dbClient')"
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
                  :label="$t('referralForm.gender')"
                  :items="genders"
                   dense
                ></v-select>

              </v-col>
            </v-row>

            <v-row>
               <v-col
                cols="12"
              >
              <v-label for="gender">{{ $t('referralForm.phone') }}</v-label>
                <v-text-field
                  v-model="clientphone"
                  :rules="phoneRules"
                  required
                  :hint="$t('referralForm.phoneMessage')"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="12"
              >
              <v-icon>mdi-camera</v-icon>
              <v-label for="photo">{{$t('referralForm.selectPhoto')}}</v-label>
                <image-uploader
                  :debug="1"
                  :maxWidth="1024"
                  :quality="0.8"
                  :autoRotate=false
                  outputFormat="verbose"
                  :capture="false"
                  accept="image/*"
                  doNotResize="['gif', 'svg']"
                  @input="setImage"
                >
                </image-uploader>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="12"
              >
                <v-select
                  v-model="clientlocation"
                  :items="locations"
                  :label="$t('referralForm.locationClassification')"
                ></v-select>

              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="clientnote"
                  :label="$t('referralForm.note')"
                  value=""
                  :hint="$t('referralForm.noteMessage')"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="12"
              >
                <v-select
                  v-model="org"
                  :items="orgemails"
                  :rules="orgemailRules"
                  :label="$t('referralForm.sendReferral')"
                  item-text="display"
                  item-value="org"
                ></v-select>

              </v-col>
            </v-row>

            <v-btn @click="submit()" :loading='loading'>{{ $t('referralForm.submit') }}</v-btn>
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
import i18n from './../i18n'
import Vuetify from 'vuetify/lib'

// register the beforeRouteLeave hook
Component.registerHooks(['beforeRouteLeave'])

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
    org = null

    dobmenu = false
    valid= false
    loading= false
    saved = false

    nameRules = [
      (v: string) => !!v || i18n.t('referralForm.nameRule')
    ]

    phoneRules = [
      (v: string) => !!v || i18n.t('referralForm.phoneRule')
    ]

    orgemailRules = [
      (v: string) => !!v || i18n.t('referralForm.orgemailRule')
    ]

    // the whitelisted set of orgemails
    // loaded from @/libs/orgEmails
    orgemails = orgemails

    genders = [
      this.$t('referralForm.male'),
      this.$t('referralForm.female'),
      this.$t('referralForm.other'),
      this.$t('referralForm.unknown'),
      this.$t('referralForm.prefer_not_to_say')
    ]

    locations = [
      this.$t('referralForm.home'),
      this.$t('referralForm.school'),
      this.$t('referralForm.work'),
      this.$t('referralForm.family_member'),
      this.$t('referralForm.friend'),
      this.$t('referralForm.commune_village')
    ]

     items = ['Foo', 'Bar', 'Fizz', 'Buzz']
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

     beforeRouteLeave (to: any, from: any, next: any) {
       if (!this.saved) {
         this.showDialog()
           .then(next)
           .catch(() => next(false))
       } else {
         next()
       }
     }

     showDialog () {
       return (this as any).$dialog.confirm(this.$t('referralForm.confirmLeavePage'))
     }

     setImage (file: any) {
       this.clientphoto = file
     }

     async submit () {
       if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
         this.loading = true
         const { clientname, clientphone, clientphoto, clientnote, clientbirth, clientgender, clientlocation, clientlat, clientlon, org } = this
         this.saved = true
         await this.submitReferral({ clientname, clientphone, clientphoto, clientnote, clientbirth, clientgender, clientlocation, clientlat, clientlon, org })
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
