import React, { useEffect, useState } from 'react'
import { db } from 'logic/fb'
import { doc, updateDoc } from 'firebase/firestore'
import useFixTeam from 'logic/useFixTeam'
import BetterManualMapPoints from 'components/BetterManualMapPoints'
import useMapPoints from 'logic/useMapPoints'
import HeaderMarker from 'components/headerMarker'
import useDronePath from 'logic/DronePath'
import generatePdf from 'logic/generateSuperPDF'
import DayOfOps from 'components/inspectionDay'
import saveTemplate from 'logic/saveTemplateInspection'
import useInspectionTemplate from 'logic/useInspectionTemplate'

function initialTime() {
  const minuteOffset = 32;
  const now = new Date(Date.now() - (minuteOffset + new Date().getTimezoneOffset()) * 60000).toISOString().slice(0, -5);
  return now;
}

export default function NukeControl() {
  const [pdfDb, setPdfDb] = useState('inspection-0-points')
  const [pilot, setPilot] = useState('Kokot Daria')
  const [datetime, setDatetime] = useState(initialTime)
  const [pilotPhone, setPilotPhone] = useState('')
  const [flightno, setFlightno] = useState(0)
  const [kpIndex, setKpIndex] = useState(0)
  const [batteryBefore, setBatteryBefore] = useState('')
  const [batteryAfter, setBatteryAfter] = useState('')
  const [flightDuration, setFlightDuration] = useState('')
  const [, dronePoints] = useDronePath()
  const points = useMapPoints(pdfDb)
  const [templateData] = useInspectionTemplate();

  useEffect(() => {
    setPdfDb(`inspection-${flightno}-points`);
  }, [flightno]);

  useEffect(() => {
    if (templateData.pilot) {
      setPilot(templateData.pilot)
    }
    if (templateData.datetime) {
      setDatetime(templateData.datetime)
    }
    if (templateData.pilotPhone) {
      setPilotPhone(templateData.pilotPhone)
    }
    if (templateData.kp) {
      setKpIndex(templateData.kp)
    }
    if (templateData.batt) {
      setBatteryBefore(templateData.batt)
    }
    if (templateData.battAfter) {
      setBatteryAfter(templateData.battAfter)
    }
    if (templateData.duration) {
      setFlightDuration(templateData.duration)
    }
    console.log(templateData)

  }, [templateData])

  return (

    <div className="nuke-control">
      <div>
        <h2>Raport PDF z misji (musi być wysłany ręcznie):</h2>
        <span className='cheat-info'>Mail: jury@droniada.eu</span> <br /><br />
        <DayOfOps daySetter={setFlightno} /><br /><br />


        <form>
          <label>
            Imię i nazwisko pilota:
            <input type="text" placeholder="Imię i nazwisko pilota" value={pilot} onChange={e => setPilot(e.target.value)} />
          </label><br /><br />
          <label>
            Telefon pilota:
            <input type="text" placeholder="123456789" value={pilotPhone} onChange={e => setPilotPhone(e.target.value)} />
          </label> <br /><br />
          <label>
            Data i godzina rozpoczęcia misji: <br />
            <input type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)} />
            <span className='cheat-info'>Jeśli nie wiesz, wpisz -32 min od teraz</span>
          </label><br /><br />
          <label>
            Indeks KP:
            <input type="number" value={kpIndex} className='short-input' style={{ backgroundColor: "white", color: 'black', marginLeft: '15px' }} onChange={e => setKpIndex(e.target.value)} />
            <span className='cheat-info'><a href="https://www.uavforecast.com/"> Indeks KP https://www.uavforecast.com/</a></span>
          </label><br /><br />
          <label>
            Informacje o baterii przed lotem:
            <input type="text" value={batteryBefore} placeholder='XX%  XX Volt' onChange={e => setBatteryBefore(e.target.value)} />
          </label><br /><br />
          <label>
            Informacje o baterii po locie:
            <input type="text" value={batteryAfter} placeholder='XX%  XX Volt' onChange={e => setBatteryAfter(e.target.value)} />
          </label><br /><br />
          <span className='cheat-info'>Stan baterii podaj: ilość procent [spacja] napięcie w woltach</span> <br /><br />
          <label>
            Czas trwania lotu:
            <input type="text" value={flightDuration} placeholder='MM:SS' onChange={e => setFlightDuration(e.target.value)} />
          </label>
        </form>

        <button
          className="super-raport-btn"
          onClick={() => generatePdf(points, { pilot, datetime, pilotPhone, kp: kpIndex, batt: batteryBefore, battAfter: batteryAfter, duration: flightDuration }, flightno)}
        >
          GENERUJ PDF
        </button>
        <button
          className="save-template-btn"
          onClick={() => saveTemplate({ pilot, datetime, pilotPhone, kp: kpIndex, batt: batteryBefore, battAfter: batteryAfter, duration: flightDuration }).then(console.log("Dodano"))}
        >
          Zapisz formularz jako AUTOMATYCZNIE UZUPEŁNIANIE
        </button>
        <span className='cheat-info'> -&gt; Automatycznie uzupełni u wszystkich edytujących</span>

        <br />
        <h2>Manualne dodawanie punktów</h2>
        <hr />
        <p>W tym miejscu możesz też dodać ręcznie punkty do bazy</p>
        <BetterManualMapPoints flightNo={flightno} />
      </div>
    </div>
  )
}
