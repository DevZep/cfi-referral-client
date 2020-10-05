# CFI Referral App

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Environments

Note that we have 3 environments: `dev`, `stage` and `prod`. To start up the application in any of these environments you will need to set the `VUE_APP_STAGE` environment variable at the terminal. The build is set to default to the `dev` environment.

The following command will build the a prod environment version of the application:

```
VUE_APP_STAGE=prod npm run build
```

If any of the AWS keys change in dev envirnoment you will need to update it in your `.env` file and also in [Netify environemnt variables](https://docs.netlify.com/configure-builds/environment-variables/) for all the environments where they changed.