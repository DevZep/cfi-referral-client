const dev = {
  s3: {
    REGION: 'ap-southeast-1',
    BUCKET: 'cfi-referral-api-dev-attachments-1cohl5t7ziug3'
  },
  apiGateway: {
    REGION: 'ap-southeast-1',
    URL: 'https://vsa6vo52r7.execute-api.ap-southeast-1.amazonaws.com/dev'
  },
  cognito: {
    REGION: 'ap-southeast-1',
    USER_POOL_ID: 'ap-southeast-1_7eptmjT3b',
    APP_CLIENT_ID: '3oapcb264srebt78f7u4qs7r59',
    IDENTITY_POOL_ID: 'ap-southeast-1:0bc99b02-422d-464e-8a32-5d3843f5b210'
  }
}

const staging = {
  s3: {
    REGION: 'ap-southeast-1',
    BUCKET: 'cfi-referral-api-staging-attachments-1cohl5t7ziug3'
  },
  apiGateway: {
    REGION: 'ap-southeast-1',
    URL: 'https://t39rl5hs62.execute-api.ap-southeast-1.amazonaws.com/staging'
  },
  cognito: {
    REGION: 'ap-southeast-1',
    USER_POOL_ID: 'ap-southeast-1_aqZmqBFm5',
    APP_CLIENT_ID: '6sq09m16d2liq90rpii8gv2j8',
    IDENTITY_POOL_ID: 'ap-southeast-1:8c6726f0-4027-4870-9196-3d07e042cb81'
  }
}

const prod = {
  s3: {
    REGION: 'ap-southeast-1',
    BUCKET: 'cfi-referral-api-prod-attachments-1cohl5t7ziug3'
  },
  apiGateway: {
    REGION: 'ap-southeast-1',
    URL: 'https://xdw7sad3pc.execute-api.ap-southeast-1.amazonaws.com/prod'
  },
  cognito: {
    REGION: 'ap-southeast-1',
    USER_POOL_ID: 'ap-southeast-1_ZySOpqZ9y',
    APP_CLIENT_ID: '7nspnq03l2ki1l02jtak0817kd',
    IDENTITY_POOL_ID: 'ap-southeast-1:1afbfb62-7e51-46de-960c-27927149b563'
  }
}

// default config to dev settings
let config = dev

// unless set by the VUE_APP_STAGE env variable
if (process.env.VUE_APP_STAGE === 'prod') config = prod
if (process.env.VUE_APP_STAGE === 'staging') config = staging

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
}
