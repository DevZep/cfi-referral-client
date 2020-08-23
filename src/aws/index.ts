import Amplify, { Auth } from 'aws-amplify'
import '@aws-amplify/ui-vue'
import config from './config'

console.log('IN INDEX', config)
console.log('CONFIG: process.env.VUE_APP_STAGE', process.env.VUE_APP_STAGE)

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: 'referrals',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: 'count',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    ]
  }
})
