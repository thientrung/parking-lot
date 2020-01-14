import { db, logStatus } from '../db'
import * as log from '../utils/log'

/**
 * @description Get free slot in Parking lot
 * @author TrungTT
 * @date 2020-01-14
 * @returns {Number} Slot No
 */
function getFreeSlot() {
  const freeSlot = db
    .get('slot')
    .find({ car_number: 'free' })
    .value()

  if (freeSlot) {
    return freeSlot
  } else {
    const parking_car = db.get('parking_car').value()
    const parking_slot = db.get('parking_slot').value()
    return parking_car < parking_slot
      ? { slot_number: parking_car + 1, car_number: null }
      : null
  }
}

/**
 * @description Register Slot with car number
 * @author TrungTT
 * @date 2020-01-14
 * @param {*} carNumber
 */
function regiserCar(carNumber, freeSlot) {
  if (freeSlot.car_number === 'free') {
    // Update
    db.get('slot')
      .find({ slot_number: freeSlot.slot_number })
      .assign({ car_number: carNumber })
      .write()
  } else {
    // Insert
    db.get('slot')
      .push({ car_number: carNumber, slot_number: freeSlot.slot_number })
      .write()
  }
}

/**
 * @description Create Parking Slot
 * @author TrungTran
 * @date 2020-01-14
 * @param {*} capacity
 * @returns {boolean}
 */
function park([car_number]) {
  const freeSlot = getFreeSlot()
  // Check available
  if (freeSlot != null) {
    // Register Slot with car number
    regiserCar(car_number, freeSlot)
    // Increment number of parking car in Parking lot
    db.update('parking_car', n => n + 1).write()
    // Create status
    const status = `Allocated slot number: ${freeSlot.slot_number}`
    log.success(status)
    // Log status
    logStatus(status)
  } else {
    const status = 'Sorry, parking lot is full'
    logStatus(status)
  }
  return true
}

export default park
