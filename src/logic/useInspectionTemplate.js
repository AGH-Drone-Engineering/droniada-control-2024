import { useEffect, useState } from 'react'
import { onSnapshot, collection, doc } from 'firebase/firestore'
import { db } from 'logic/fb'

export default function () {
  const [data, setData] = useState({})

  useEffect(() => {
    return onSnapshot(doc(db, 'inspection-template', 'data'), (querySnapshot) => {
      setData(querySnapshot.data())
    })
  }, [])
  return [data]
}

