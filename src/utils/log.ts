import chalk from 'chalk'

const msReg = /\+\d+ms/

// const keys = {}

export function log(...str: any[]) {
  // let ms = 0
  // if (str.length === 1 && typeof str[0] === 'string') {
  //   if (!keys[str[0]]) {
  //     keys[str[0]] = Date.now()
  //   } else {
  //     ms = Date.now() - keys[str[0]]
  //     delete keys[str[0]]
  //   }
  // }
  console.log(
    chalk.green(
      `[${new Date().toISOString()}] `,
      ...str.map(i => {
        // 将毫秒数以 #FFA500 显示显示
        if (typeof i === 'string' && msReg.test(i)) {
          return i.replace(
            msReg,
            chalk.hex('#FFA500')((i.match(msReg) as Array<string>)[0])
          )
        }
        return i
      }) /*.concat(
          ms ? chalk.hex('#FFA500')(`+${ms}ms`) : ''
        )*/
    )
  )
}
