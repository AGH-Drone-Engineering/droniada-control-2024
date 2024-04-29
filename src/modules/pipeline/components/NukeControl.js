import React, { useEffect, useState } from 'react'
import { db } from 'logic/fb'
import { doc, updateDoc } from 'firebase/firestore'
import useFixTeam from 'logic/useFixTeam'
import ManualMapPoints from 'components/ManualMapPoints'
import useMapPoints from 'logic/useMapPoints'
import generatePdf from 'logic/generatePdf'
import HeaderMarker from 'components/headerMarker'
import useDronePath from 'logic/DronePath'

export default function NukeControl() {
  const [_, collectionId, time] = useFixTeam()
  const [pdfDb, setPdfDb] = useState('intruder-points')
  const [taskTime, setTaskTime] = useState(0)
  const [, dronePoints] = useDronePath()
  const points = useMapPoints(pdfDb)

  async function setupTaskTime(x) {
    await updateDoc(doc(db, 'repair-team', collectionId), {
      time: taskTime
    })
  }

  useEffect(() => {
    setTaskTime(time)
  }, [time])

  return (
    <div className="nuke-control">
      <div>
        <h2>Raport PDF z misji:</h2>
        <hr />
        <label htmlFor="databaseToPdfSelect">
          Wybierz bazę danych z której generowany będzie raport PDF: <br />
        </label>
        <select
          id="databaseToPdfSelect"
          onChange={(e) => setPdfDb(e.target.value)}
          style={{ width: '300px' }}
        >
          <option value={'intruder-points'}>Intruz</option>
          <option value={'pipeline-points'}>Rurociąg</option>
          <option value={'mines-points'}>Kopalnie marsjańskie</option>
        </select>{' '}
        <br />
        <br />
        <button
          className="raport-btn"
          onClick={() => generatePdf(pdfDb, points, dronePoints)}
        >
          Pobierz raport w formacie PDF
        </button>
        <h2>
          <HeaderMarker condition={time > 0} /> Czas wykonania misji:
        </h2>
        <hr />
        <label htmlFor="taskTime">
          Wprowadź czas wykonania misji w minutach:{' '}
        </label>
        <input
          type="number"
          id="taskTime"
          style={{ width: 50, textAlign: 'right' }}
          value={taskTime}
          onChange={(e) => setTaskTime(e.currentTarget.value)}
        ></input>
        m<br />
        <button className="raport-btn" onClick={setupTaskTime}>
          Ustaw czas misji
        </button>
        <br />
        <br />
        <br />
        <h2>Manualne dodawanie punktów</h2>
        <hr />
        <p>W tym miejscu możesz też dodać ręcznie punkty do bazy</p>
        <ManualMapPoints />
      </div>
    </div>
  )
}
