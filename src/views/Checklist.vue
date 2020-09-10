<template>
  <div id="checkList" class="center">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <v-container v-if="showChecklist">
          <v-row>
              <p class="text-left">Does the person you wish to refer have the following:</p>
          </v-row>
          <v-row>
            <p class="text-left">Travel Ticket(bus or plane ticket)</p>
          </v-row>
          <v-row>
            <v-radio-group v-model="answers[0]" row @change="checkUnanswered()">
              <v-radio label="Yes" value="yes" required></v-radio>
              <v-radio label="No" value="no" required></v-radio>
            </v-radio-group>
          </v-row>
          <v-row>
            <p class="text-left">Cambodia Overseas worker card (Card issued by the Cambodian government)</p>
            <v-radio-group v-model="answers[1]" row @change="checkUnanswered()">
              <v-radio label="Yes" value="yes" required></v-radio>
              <v-radio label="No" value="no" required></v-radio>
            </v-radio-group>
          </v-row>
          <v-row>
            <p class="text-left">Black Passport (document issued by the Cambodian government)</p>
            <v-radio-group v-model="answers[2]" row @change="checkUnanswered()">
              <v-radio label="Yes" value="yes" required></v-radio>
              <v-radio label="No" value="no" required></v-radio>
            </v-radio-group>
          </v-row>
          <v-row>
            <p class="text-left">Work Visa (document or Stamp in your Black passport or Work permit (issued by your country you are moving to)</p>
            <v-radio-group v-model="answers[3]" row @change="checkUnanswered()">
              <v-radio label="Yes" value="yes" required></v-radio>
              <v-radio label="No" value="no" required></v-radio>
            </v-radio-group>
          </v-row>
          <v-row>
            <p class="text-left">Employment Contract (issued by the person you plan to work for) or Service Contract / Guarantee Agreement (an agreement between you and a recruitment agency)</p>
            <v-radio-group v-model="answers[4]" row @change="checkUnanswered()">
              <v-radio label="Yes" value="yes" required></v-radio>
              <v-radio label="No" value="no" required></v-radio>
            </v-radio-group>
          </v-row>
          <v-row>
            <p class="text-left">Do you have these documents with you?</p>
          </v-row>
          <v-row>
            <v-radio-group v-model="answers[5]" row @change="checkUnanswered()">
              <v-radio label="Yes" value="yes" required></v-radio>
              <v-radio label="No" value="no" required></v-radio>
            </v-radio-group>
          </v-row>
          <v-row>
            <p class="text-left">Do you know where you can access support and help in your destination country?</p>
            <v-radio-group v-model="answers[6]" row @change="checkUnanswered()">
              <v-radio label="Yes" value="yes"  required></v-radio>
              <v-radio label="No" value="no" required></v-radio>
            </v-radio-group>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-card-text class="text--primary">
              <v-btn color="success" id='btnSubmitChecklist' :disabled="disableSubmitBtn" @click="submit()">
                Next
              </v-btn>
            </v-card-text>
          </v-card-actions>
        </v-container>
        <v-container v-if="showConsentForm">
            <v-row>
               <p class="text-left">The client who you are talking to appears to have unsafe migration plans.</p>
            </v-row>
             <v-row>
               <p class="text-left">Please ask for their consent to pass on their details to a safe agency that can help make sure they and their family are safe.</p>
            </v-row>
             <v-row>
               <p class="text-left">Do they give their consent?</p>
            </v-row>
            <v-row>
              <div id="button-wrapper">
                <v-btn color="success" id='btnNavigateToReferralForm' @click="navigate('/referralForm')">
                  Yes
                </v-btn>
                <v-btn color="success" id='btnNavigateToHomeScreen' @click="navigate('/')">
                  No
                </v-btn>
              </div>
            </v-row>

        </v-container>
        <v-container v-if="showSafeMigrationForm">
             <v-row>
               <p class="text-left">The client who you are talking to appears to have safe migration plans.</p>
            </v-row>
            <v-row>
               <p class="text-left">Press 'Next' to return to the Home page.</p>
            </v-row>
          <v-btn color="success" id='btnNavigateToHomeScreen' @click="navigate('/')">
            Next
          </v-btn>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import navigate from '../libs/navigate'

@Component({
  methods: {
    navigate
  }
})
export default class Checklist extends Vue {
  questionCount = 7 // be sure that this matches the number of questions in the form above
  answers = new Array<string|undefined>(this.questionCount);
  showChecklist = true
  showConsentForm = false
  showSafeMigrationForm = false
  disableSubmitBtn = true

  allQuestionsAnswered () {
    return !this.answers.includes(undefined)
  }

  answersContainNo () {
    return this.answers.includes('no')
  }

  checkUnanswered () {
    if (this.allQuestionsAnswered()) { this.disableSubmitBtn = false }
  }

  submit () {
    this.showChecklist = false
    if (this.answersContainNo()) {
      this.showConsentForm = true
    } else {
      this.showSafeMigrationForm = true
    }
  }
}
</script>
<style scoped>
#btnNavigateToHomeScreen{
  margin: 100px;

}
#button-wrapper{
  display: flex;
  align-items: center;
}

</style>
