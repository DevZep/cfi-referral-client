const dev = [
  {
    display: 'Dev Email 1',
    email: 'dev-cfi-referral-app@devzep.com'
  },
  {
    display: 'Dev Email 2',
    email: 'dev-cfi-referral-app2@devzep.com'
  }
]

const staging = [
  {
    display: 'Staging Email 1',
    email: 'staging-cfi-referral-app@devzep.com'
  },
  {
    display: 'Staging Email 2',
    email: 'staging-cfi-referral-app2@devzep.com'
  }
]

// TODO: put prod emails in build env vars
const prod = [
  {
    display: 'Childrens Future',
    email: 'darren.jensen@gmail.com'
  }
]

// default config to dev settings
let orgeamils = dev

// unless set by the VUE_APP_STAGE env variable
if (process.env.VUE_APP_STAGE === 'prod') orgeamils = prod
if (process.env.VUE_APP_STAGE === 'staging') orgeamils = staging

export default orgeamils
