<template>
  <div id="checkList" class="center">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <v-container v-if="showChecklist">
          <v-row>
              <p class="text-left">{{ $t('checkList.header') }}</p>
          </v-row>
          <v-row>
            <p class="text-left">{{ $t('checkList.question1') }}</p>
          </v-row>
          <v-row>
            <v-radio-group v-model="answers[0]" row @change="checkUnanswered()">
              <v-radio v-bind:label=" $t('checkList.yes') " value="yes" required></v-radio>
              <v-radio v-bind:label=" $t('checkList.no') " value="no" required></v-radio>
            </v-radio-group>
          </v-row>
          <v-row>
            <p class="text-left">{{ $t('checkList.question2') }}</p>
            <v-radio-group v-model="answers[1]" row @change="checkUnanswered()">
              <v-radio v-bind:label=" $t('checkList.yes') " value="yes" required></v-radio>
              <v-radio v-bind:label=" $t('checkList.no') " value="no" required></v-radio>
            </v-radio-group>
          </v-row>
           <v-row><p class="text-left">{{ $t('checkList.question3') }}</p><br></v-row>
          <v-row>
            <v-radio-group v-model="answers[2]" row @change="checkUnanswered()">
              <v-radio v-bind:label=" $t('checkList.yes') " value="yes" required></v-radio>
              <v-radio v-bind:label=" $t('checkList.no') " value="no" required></v-radio>
            </v-radio-group>
          </v-row>
          <v-row>
            <p class="text-left">{{ $t('checkList.question4') }}</p>
            <v-radio-group v-model="answers[3]" row @change="checkUnanswered()">
              <v-radio v-bind:label=" $t('checkList.yes') " value="yes" required></v-radio>
              <v-radio v-bind:label=" $t('checkList.no') " value="no" required></v-radio>
            </v-radio-group>
          </v-row>
          <v-row>
            <p class="text-left">{{ $t('checkList.question5') }}</p>
            <v-radio-group v-model="answers[4]" row @change="checkUnanswered()">
              <v-radio v-bind:label=" $t('checkList.yes') " value="yes" required></v-radio>
              <v-radio v-bind:label=" $t('checkList.no') " value="no" required></v-radio>
            </v-radio-group>
          </v-row>
          <v-row>
            <p class="text-left">{{ $t('checkList.question6') }}</p>
          </v-row>
          <v-row>
            <v-radio-group v-model="answers[5]" row @change="checkUnanswered()">
              <v-radio v-bind:label=" $t('checkList.yes') " required></v-radio>
              <v-radio v-bind:label=" $t('checkList.no') " value="no" required></v-radio>
            </v-radio-group>
          </v-row>
          <v-row>
            <p class="text-left">{{ $t('checkList.question7') }}</p>
            <v-radio-group v-model="answers[6]" row @change="checkUnanswered()">
              <v-radio v-bind:label=" $t('checkList.yes') " value="yes"  required></v-radio>
              <v-radio v-bind:label=" $t('checkList.no') " value="no" required></v-radio>
            </v-radio-group>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-card-text class="text--primary">
              <v-btn color="success" id='btnSubmitChecklist' :disabled="disableSubmitBtn" @click="submit()">
                {{ $t('checkList.next') }}
              </v-btn>
            </v-card-text>
          </v-card-actions>
        </v-container>
        <v-container v-if="showConsentForm">
            <v-row>
               <p class="text-left">{{ $t('unsafeMigration.text1') }}</p>
            </v-row>
             <v-row>
               <p class="text-left">{{ $t('unsafeMigration.text2') }}</p>
            </v-row>
             <v-row>
               <p class="text-left">{{ $t('unsafeMigration.text3') }}</p>
            </v-row>
            <v-row>
              <div id="button-wrapper">
                <v-btn color="success" id='btnNavigateToReferralForm' @click="navigate('/referralForm')">
                 {{ $t('unsafeMigration.yes') }}
                </v-btn>
                <v-btn color="success" id='btnNavigateToHomeScreen' @click="navigate('/')">
                  {{ $t('unsafeMigration.no') }}
                </v-btn>
              </div>
            </v-row>

        </v-container>
        <v-container v-if="showSafeMigrationForm">
             <v-row>
               <p class="text-left">{{ $t('safeMigration.text1') }}</p>
            </v-row>
            <v-row>
               <p class="text-left">{{ $t('safeMigration.text2') }}</p>
            </v-row>
          <v-btn color="success" id='btnNavigateToHomeScreen' @click="navigate('/')">
            {{ $t('safeMigration.next') }}
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
