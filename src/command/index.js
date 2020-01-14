import * as log from '../utils/log'
import create from './create'
import park from './park'
import leave from './leave'
import status from './status'

/**
 * @description Classify command base on input
 * @author TrungTT
 * @date 2020-01-14
 * @param {*} cmd
 */
function classify(cmd) {
  const executor = {
    create_parking_lot: create,
    park,
    leave,
    status,
    default: cmd => {
      log.error(`Do not support command: ${cmd}`)
    },
  }
  return executor[cmd[0]] ? executor[cmd[0]](cmd.slice(1)) : executor['default'](cmd[0])
}
/**
 * @description Classify and execute command
 * @author TrungTran
 * @date 2020-01-14
 * @param {*} cmd
 */
export default function execute(cmd) {
  const ingredient = cmd.split(' ')
  return classify(ingredient)
}
