import * as path from 'path'
export const environment = process.env.NODE_ENV
export const isDevelopment = Object.is(environment, 'development')
export const isProduction = Object.is(environment, 'production')
export const isStaging = Object.is(environment, 'staging')
export const STATIC_PATH = path.join(process.cwd(), 'static')
export const UPLOAD_DEST = path.resolve(process.cwd(), 'static')

export default {
  isDevelopment,
  isProduction,
  isStaging,
  environment
}
