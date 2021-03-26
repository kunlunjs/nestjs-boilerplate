import path from 'path'
import fs from 'fs-extra'
import log4js from 'log4js'

const LOG_DIR_NAME = 'logs'

fs.ensureDirSync(path.join(process.cwd(), LOG_DIR_NAME))

void ['request', 'response', 'error'].forEach(t => {
  fs.ensureDirSync(path.join(process.cwd(), LOG_DIR_NAME, t))
})

const resolvePath = (dir: string, filename = `${dir}.log`) =>
  path.join(process.cwd(), LOG_DIR_NAME, dir, filename)

const commonCinfig = {
  type: 'dateFile',
  pattern: 'yyyy-MM-dd.log',
  alwaysIncludePattern: true
}

log4js.configure({
  appenders: {
    request: {
      ...commonCinfig,
      filename: resolvePath('request'),
      category: 'request'
    },
    response: {
      ...commonCinfig,
      filename: resolvePath('response'),
      category: 'response'
    },
    error: {
      ...commonCinfig,
      filename: resolvePath('error'),
      category: 'error'
    }
  },
  categories: {
    default: { appenders: ['request'], level: 'info' },
    response: { appenders: ['response'], level: 'info' },
    error: { appenders: ['error'], level: 'info' }
  }
} as any)

export const requestLogger = log4js.getLogger('request')
export const responseLogger = log4js.getLogger('response')
export const errorLogger = log4js.getLogger('error')
