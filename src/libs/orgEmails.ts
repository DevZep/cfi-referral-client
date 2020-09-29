const dev = [
  {
    display: 'Dev Email 1',
    org: {
      email: 'dev-cfi-referral-app@devzep.com',
      oscarSubdomain: 'demo'
    }
  },
  {
    display: 'Dev Email 1',
    org: {
      email: 'dev-cfi-referral-app@devzep.com',
      oscarSubdomain: 'dc'
    }
  },
  {
    display: 'Darren Email',
    org: {
      email: 'darren@devzep.com',
      oscarSubdomain: 'darren'
    }
  },
  {
    display: 'Damon Email',
    org: {
      email: 'damon@devzep.com',
      oscarSubdomain: 'damon'
    }
  },
  {
    display: 'Makara Email',
    org: {
      email: 'makara@devzep.com',
      oscarSubdomain: 'makara'
    }
  },
  {
    display: 'Seyha Email',
    org: {
      email: 'seyha@devzep.com',
      oscarSubdomain: 'seyha'
    }
  }
]

const staging = [
  {
    display: 'Staging Email 1',
    org: {
      email: 'staging-cfi-referral-app@devzep.com',
      oscarSubdomain: 'demo'
    }
  },
  {
    display: 'Staging Email 2',
    org: {
      email: 'staging-cfi-referral-app2@devzep.com',
      oscarSubdomain: 'dc'
    }
  }
]

const prod = [
  {
    display: 'Dev Email 1',
    org: {
      email: 'dev-cfi-referral-app@devzep.com',
      oscarSubdomain: 'demo'
    }
  },
  {
    display: 'Dev Email 1',
    org: {
      email: 'dev-cfi-referral-app@devzep.com',
      oscarSubdomain: 'dc'
    }
  },
  {
    display: 'Darren Email',
    org: {
      email: 'darren@devzep.com',
      oscarSubdomain: 'darren'
    }
  },
  {
    display: 'Damon Email',
    org: {
      email: 'damon@devzep.com',
      oscarSubdomain: 'damon'
    }
  },
  {
    display: 'Makara Email',
    org: {
      email: 'makara@devzep.com',
      oscarSubdomain: 'makara'
    }
  },
  {
    display: 'Seyha Email',
    org: {
      email: 'seyha@devzep.com',
      oscarSubdomain: 'seyha'
    }
  }
]

// default config to dev settings
let orgemails = dev

// unless set by the VUE_APP_STAGE env variable
if (process.env.VUE_APP_STAGE === 'prod') orgemails = prod
if (process.env.VUE_APP_STAGE === 'staging') orgemails = staging

export default orgemails
