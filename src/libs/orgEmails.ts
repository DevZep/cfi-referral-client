const dev = [
  {
    display: 'Dev Email 1',
    org: {
      email: 'dev-cfi-referral-app@devzep.com',
      oscarSubdomian: 'demo'
    }
  },
  {
    display: 'Dev Email 1',
    org: {
      email: 'dev-cfi-referral-app@devzep.com',
      oscarSubdomian: 'dc'
    }
  },
  {
    display: 'Darren Email',
    org: {
      email: 'darren@devzep.com',
      oscarSubdomian: 'darren'
    }
  },
  {
    display: 'Damon Email',
    org: {
      email: 'damon@devzep.com',
      oscarSubdomian: 'darren'
    }
  },
  {
    display: 'Makara Email',
    org: {
      email: 'makara@devzep.com',
      oscarSubdomian: 'makara'
    }
  },
  {
    display: 'Seyha Email',
    org: {
      email: 'seyha@devzep.com',
      oscarSubdomian: 'makara'
    }
  }
]

const staging = [
  {
    display: 'Staging Email 1',
    org: {
      email: 'staging-cfi-referral-app@devzep.com',
      oscarSubdomian: 'demo'
    }
  },
  {
    display: 'Staging Email 2',
    org: {
      email: 'staging-cfi-referral-app2@devzep.com',
      oscarSubdomian: 'dc'
    }
  }
]

const prod = [
  {
    display: 'Dev Email 1',
    org: {
      email: 'dev-cfi-referral-app@devzep.com',
      oscarSubdomian: 'demo'
    }
  },
  {
    display: 'Dev Email 1',
    org: {
      email: 'dev-cfi-referral-app@devzep.com',
      oscarSubdomian: 'dc'
    }
  },
  {
    display: 'Darren Email',
    org: {
      email: 'darren@devzep.com',
      oscarSubdomian: 'darren'
    }
  },
  {
    display: 'Damon Email',
    org: {
      email: 'damon@devzep.com',
      oscarSubdomian: 'darren'
    }
  },
  {
    display: 'Makara Email',
    org: {
      email: 'makara@devzep.com',
      oscarSubdomian: 'makara'
    }
  },
  {
    display: 'Seyha Email',
    org: {
      email: 'seyha@devzep.com',
      oscarSubdomian: 'makara'
    }
  }
]

// default config to dev settings
let orgemails = dev

// unless set by the VUE_APP_STAGE env variable
if (process.env.VUE_APP_STAGE === 'prod') orgemails = prod
if (process.env.VUE_APP_STAGE === 'staging') orgemails = staging

export default orgemails
