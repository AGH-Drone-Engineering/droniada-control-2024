import { doc, setDoc } from 'firebase/firestore'
import { db } from 'logic/fb'
export default function (data) {
  if (data.pilot == "") {
    delete data.pilot
  }
  if (data.datetime == "") {
    delete data.datetime
  }
  if (data.pilotPhone == "") {
    delete data.pilotPhone
  }
  if (data.kp == 0) {
    delete data.kp
  }
  if (data.batt == "") {
    delete data.batt
  }
  if (data.battAfter == "") {
    delete data.battAfter
  }
  if (data.duration == "") {
    delete data.duration
  }

  return setDoc(doc(db, 'inspection-template', 'data'), data)
}