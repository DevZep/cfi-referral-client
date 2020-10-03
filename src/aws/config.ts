let envKey = 'DEV'

// unless set by the VUE_APP_STAGE env variable
if (process.env.VUE_APP_STAGE === 'prod') envKey = 'PROD'
if (process.env.VUE_APP_STAGE === 'staging') envKey = 'STAGING'

const apiGatewayKey = `VUE_APP_AWS_API_GATEWAY_ID_${envKey}`
const s3BucketKey = `VUE_APP_AWS_S3_BUCKET_ID_${envKey}`
const userPoolKey = `VUE_APP_AWS_USER_POOL_ID_${envKey}`
const appClientKey = `VUE_APP_AWS_APP_CLIENT_ID_${envKey}`
const identityPoolKey = `VUE_APP_AWS_IDENTITY_POOL_ID_${envKey}`

const apiGatewayId = process.env[apiGatewayKey]
const s3BucketId = process.env[s3BucketKey]
const userPoolId = process.env[userPoolKey]
const appClientId = process.env[appClientKey]
const identityPoolId = process.env[identityPoolKey]

const config = {
  s3: {
    REGION: 'ap-southeast-1',
    BUCKET: `cfi-referral-api-${envKey.toLowerCase()}-attachments-${s3BucketId}`
  },
  apiGateway: {
    REGION: 'ap-southeast-1',
    URL: `https://${apiGatewayId}.execute-api.ap-southeast-1.amazonaws.com/${envKey.toLowerCase()}`
  },
  cognito: {
    REGION: 'ap-southeast-1',
    USER_POOL_ID: userPoolId,
    APP_CLIENT_ID: appClientId,
    IDENTITY_POOL_ID: identityPoolId
  }
}

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
}
