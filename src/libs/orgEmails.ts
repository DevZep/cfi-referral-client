const dev = [
  {
    display: 'Dev Email 1',
    org: {
      email: 'dev-cfi-referral-app@devzep.com',
      oscarSubdomain: 'demo'
    }
  },
  {
    display: 'Dev Email 2',
    org: {
      email: 'dev-cfi-referral-app2@devzep.com',
      oscarSubdomain: 'dc'
    }
  },
  {
    display: 'Darren Email',
    org: {
      email: 'darren@devzep.com',
      oscarSubdomain: ''
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
    display: 'Darren (Test)',
    org: {
      email: 'darren@devzep.com',
      oscarSubdomain: 'demo'
    }
  },
  {
    display: 'Darren (Test 2 - no oscar)',
    org: {
      email: 'darren@devzep.com',
      oscarSubdomain: ''
    }
  },
  {
    display: 'Mith Samlanh',
    org: {
      email: 'pov@mithsamlanh.org',
      oscarSubdomain: 'msl'
    }
  },
  {
    display: 'Peuan Peuan',
    org: {
      email: 'heng@friends-international.org',
      oscarSubdomain: ''
    }
  },
  {
    display: 'CFI',
    org: {
      email: 'migration@childrensfuture.org',
      oscarSubdomain: 'cfi'
    }
  },
  {
    display: 'Komar Rikreay',
    org: {
      email: 'kmrcambodia@yahoo.com',
      oscarSubdomain: 'kmr'
    }
  },
  {
    display: 'Kailyan Mith Poipet',
    org: {
      email: 'heng@friends-international.org',
      oscarSubdomain: 'fsi'
    }
  },
  {
    display: 'Kailyan Mith Siem Reap',
    org: {
      email: 'socheata@friends-international.org',
      oscarSubdomain: 'fsi'
    }
  },
  {
    display: 'Damnonk Toek',
    org: {
      email: 'migration@damnoktoek.org',
      oscarSubdomain: ''
    }
  },
  {
    display: 'Krousar Thmey',
    org: {
      email: 'bunhentrenpoipet@gmail.com',
      oscarSubdomain: ''
    }
  }
]

// default config to dev settings
let orgemails = dev

// unless set by the VUE_APP_STAGE env variable
if (process.env.VUE_APP_STAGE === 'prod') orgemails = prod
if (process.env.VUE_APP_STAGE === 'staging') orgemails = staging

export default orgemails
