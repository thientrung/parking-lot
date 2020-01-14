import { db, logStatus } from '../db'
import * as log from '../utils/log'

/**
 * @description Check if Parking Slot have created already
 * @author TrungTran
 * @date 2020-01-14
 * @returns {boolean}
 */
function checkAlreadyCreated() {
  try {
    parkingSlot = db.get('parking_slot').value()
    return !parkingSlot
  } catch (error) {
    return false
  }
}

/**
 * @description Show status
 * @author TrungTran
 * @date 2020-01-14
 * @returns {boolean}
 */
function status() {
  // Log status
  const slots = db.get('slot').value()
  log.info('Slot No.    Registration No.')
  slots.forEach(({ slot_number, car_number }) => {
    if (car_number !== 'free') {
      log.info(`${slot_number}    ${car_number}`)
    }
  })
}

export default status
