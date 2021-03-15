import path from 'path'
import fs from 'fs-extra'
import log4js from 'log4js'

const LOG_DIR_NAME = '../../../logs'

fs.ensureDirSync(path.join(__dirname, LOG_DIR_NAME))
void ['request', 'response', 'error'].forEach(t => {
  fs.ensureDirSync(path.join(__dirname, LOG_DIR_NAME, t))
})

const resolvePath = (dir, filename) =>
  path.join(__dirname, LOG_DIR_NAME, dir, filename)

const commonCinfig = {
  type: 'dateFile',
  pattern: 'yyyy-MM-dd.log',
  alwaysIncludePattern: true
}

log4js.configure({
  appenders: {
    request: {
      ...commonCinfig,
      filename: resolvePath('request', 'request.log'),
      category: 'request'
    },
    response: {
      ...commonCinfig,
      filename: resolvePath('response', 'response.log'),
      category: 'response'
    },
    error: {
      ...commonCinfig,
      filename: resolvePath('error', 'error.log'),
      category: 'error'
    }
  },
  categories: {
    default: { appenders: ['request'], level: 'info' },
    response: { appenders: ['response'], level: 'info' },
    error: { appenders: ['error'], level: 'info' }
  }
} as any)

export const reqLogger = log4js.getLogger('request')
export const resLogger = log4js.getLogger('response')
export const errLogger = log4js.getLogger('error')
