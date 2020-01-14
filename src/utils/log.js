import chalk from 'chalk'
const log = console.log

const info = message => {
  return log(chalk.blueBright(message))
}
const warning = message => {
  return log(chalk.yellow(message))
}
const error = message => {
  return log(chalk.red(message))
}
const success = message => {
  return log(chalk.green(message))
}

export { info, success, warning, error }
