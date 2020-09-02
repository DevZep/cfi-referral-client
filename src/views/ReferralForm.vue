<template>
  <div id="referralForm" class="center">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form class="form" >
          <div class="title">
              <h4>Refer Client, Referral Form</h4><br>
          </div><br>
            <div class="form-group">
              <label>Name</label><br>
              <input type="text" name="clientname" v-model="clientname" placeholder="Name" />
            </div>
            <div class="form-group">
              <label for="">Date of Birth</label><br>
              <input type="date" name="clientbirth" v-model="clientbirth" />
            </div>
            <div class="form-group">
              <form action="">
                <label>Gender</label><br>
                <select v-model="clientgender" required>
                  <option value="" selected disabled >Choose your gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Unknown</option>
                  <option>Prefer not to answer</option>
                </select>
              </form>
            </div><br>
             <div class="form-group">
              <label>Phone</label><br>
              <input type="tel" name="clientphone" v-model="clientphone" placeholder="Phone Number" />
            </div>
            <div class="form-group">
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
            </div><br>
            <div class="form-group">
              <label>Location</label><br>
                <select v-model="clientlocation" required>
                    <option value="" selected disabled >Choose your locatoin</option>
                    <option>home</option>
                    <option>School</option>
                    <option>work</option>
                    <option>family member</option>
                    <option>friend</option>
                    <option>commune/village</option>
                </select>
            </div><br>
            <div class="form-group">
              <label>Note</label><br>
              <textarea disabled-text rows="4" cols="22" name="clientnote" v-model="clientnote" placeholder="Type here..."></textarea><br>
            </div>
            <br>
            <v-btn text color="white" class="block1" @click="submit()">Submit</v-btn>
        </form>
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
  clientlat = 0
  clientlon = 0

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
    return this.clientname !== '' && this.clientphone !== '' && this.clientbirth !== '' && this.clientgender !== '' && this.clientlocation !== ''
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
.select-button{
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

}

</style>
