import rc from 'request-context'

export const contextMiddleware = rc.middleware('request')
