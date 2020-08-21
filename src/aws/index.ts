import Amplify, { Auth } from 'aws-amplify'
import '@aws-amplify/ui-vue'

const config = {
  s3: {
    REGION: 'ap-southeast-1',
    BUCKET: 'cfi-referrals-uploads'
  },
  apiGateway: {
    REGION: 'ap-southeast-1',
    URL: 'https://r2ezcyy4oj.execute-api.ap-southeast-1.amazonaws.com/prod'
  },
  cognito: {
    REGION: 'ap-southeast-1',
    USER_POOL_ID: 'ap-southeast-1_k8wtO4A4h',
    APP_CLIENT_ID: '7o5ejd170d1idos7ittap044lq',
    IDENTITY_POOL_ID: 'ap-southeast-1:18bf9795-6fbc-4345-aef5-7db31dd08e67'
  }
}

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
