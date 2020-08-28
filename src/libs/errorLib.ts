import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'
import { Integrations } from '@sentry/tracing'

const isLocal = process.env.NODE_ENV === 'development'

export function initSentry () {
  if (isLocal) {
    return
  }

  console.log('IN INIT SENTRY')

  Sentry.init({
    dsn: 'https://43539ad690ef4c99a30b24b99c555a0a@o440420.ingest.sentry.io/5409343',
    integrations: [
      new VueIntegration({
        Vue,
        tracing: true
      }),
      new Integrations.BrowserTracing()
    ],
    tracesSampleRate: 1
  })
}

export function logError (error: any, errorInfo: Record<string, any>) {
  if (isLocal) {
    return
  }

  Sentry.withScope((scope) => {
    errorInfo && scope.setExtras(errorInfo)
    Sentry.captureException(error)
  })
}

export function onError (error: any) {
  let errorInfo: any = {}
  let message = error.toString()

  // Auth errors
  if (!(error instanceof Error) && error.message) {
    errorInfo = error
    message = error.message
    error = new Error(message)
  // API errors
  } else if (error.config && error.config.url) {
    errorInfo.url = error.config.url
  }

  logError(error, errorInfo)

  console.error(message)
}
