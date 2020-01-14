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
 * @description Create Parking Slot
 * @author TrungTran
 * @date 2020-01-14
 * @param {*} capacity
 * @returns {boolean}
 */
function create([capacity]) {
  // Check if Parking Slot have created already
  if (checkAlreadyCreated()) {
    return false
  }
  // Insert DB
  db.set('parking_slot', +capacity).write()
  db.set('parking_car', 0).write()
  db.set('slot', []).write()
  db.set('status', []).write()

  // Create status
  const status = `Created parking lot with ${
    capacity > 1 ? capacity + ' slots' : capacity + ' slot'
  }`
  // Log status
  logStatus(status)
  return true
}

export default create
