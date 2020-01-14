import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import * as log from '../utils/log'

const adapter = new FileSync('./database/data.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({
  parking_slot: 0,
  parking_car: 0,
  slot: [],
  status: [],
}).write()

function logStatus(status) {
  db.get('status')
    .push({ status })
    .write()
}
export { db, logStatus }
