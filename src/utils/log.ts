import chalk from 'chalk'

export function log(...str: any[]) {
  console.log(chalk.green(...str))
}
