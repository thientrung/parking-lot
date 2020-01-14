import fs from 'fs'
import path from 'path'
import * as log from './utils/log'
import execute from './command'

/**
 * @description Check if Parameter is invalid.
 * @author TrungTran
 * @date 2020-01-14
 * @param {*} args
 * @returns {boolean}
 */
function isValidArgument(args) {
  return args.length > 0
}

/**
 * @description Read file input
 * @author TrungTran
 * @date 2020-01-14
 * @param {string} filename
 * @returns {string} input
 */
function readInputFile(filename) {
  try {
    const input = fs.readFileSync(path.resolve(__dirname, '../', args[0])).toString('utf8')
    const arrayInput = input.split('\n')
    return arrayInput
  } catch (error) {
    log.error(error)
    return false
  }
}

/**
 * @description Entry point of program. Read input file and call handler.
 * @author TrungTran
 * @date 2020-01-14
 * @returns {boolean}
 */
function main(args) {
  if (isValidArgument(args)) {
    const arrayInput = readInputFile(args[0])
    arrayInput.forEach(cmd => {
      execute(cmd)
    })
    return true
  } else {
    log.warning('Please provide file inputs!')
    return false
  }
}

const args = process.argv.slice(2)
main(args)
