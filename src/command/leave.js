import { db, logStatus } from '../db'
import * as log from '../utils/log'

/**
 * @description Check if Parking Slot have created already
 * @author TrungTran
 * @date 2020-01-14
 * @returns {boolean}
 */
function findCar(car_number) {
  try {
    const leaveCar = db
      .get('slot')
      .find({ car_number })
      .value()
    return leaveCar
  } catch (error) {
    return false
  }
}

/**
 * @description Calculate parking charge
 * @author TrungTT
 * @date 2020-01-14
 * @param {*} hours
 * @returns {number} Charge
 */
function calculateParkingCharge(hours) {
  const overHour = hours - 2
  if (overHour) {
    return 10 + overHour * 10
  } else {
    return 10
  }
}

/**
 * @description Create Parking Slot
 * @author TrungTran
 * @date 2020-01-14
 * @param {*} capacity
 * @returns {boolean}
 */
function leave([car_number, hours]) {
  // Find Car by car number
  const leaveCar = findCar(car_number)
  if (leaveCar) {
    const { car_number, slot_number } = leaveCar
    // Decrease number of parking cars in parking lot
    db.update('parking_car', n => n - 1).write()
    // Set free slot
    db.get('slot')
      .find({ car_number })
      .assign({ car_number: 'free' })
      .write()

    // Create status
    const fee = calculateParkingCharge(hours)
    const status = `Registration number: ${car_number} with Slot Number ${slot_number} is free with Charge ${fee}`
    // Log status
    log.warning(status)
    logStatus(status)
  } else {
    const status = `Registration number ${car_number} not found`
    log.error(status)
    logStatus(status)
  }
  return true
}

export default leave
