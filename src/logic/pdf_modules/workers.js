import { mapType } from 'logic/TypeLogic';

function fbTimeToTime(point) {
  if (!('timestamp' in point)) {
    return '[brak znacznika czasu]';
  }
  const time = point.timestamp.toDate();
  const options = { weekday: 'long', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', locale: 'pl-PL' };
  const timeString = time.toLocaleString('pl-PL', options);
  return '' + timeString;
}

export default function (points, addImage) {
  const dronePoints = points.filter(point => point.type === 'worker' || point.type === 'workerNoHS')
  let i = 0;
  return [
    {
      text: " ",
      style: "header3"
    },
    {
      text: "3. Lista pracowników",
      style: "header3"
    },
    {
      table: {
        headerRows: 1,
        widths: ['auto', 40, 80, 80, 80, 150, 'auto'],
        body: [
          [{ text: '#', style: "header1b" }, { text: 'Pracownik jest/nie', style: 'header1b' }, { text: 'BHP', style: 'header1b' }, { text: 'Lokalizacja', style: "header1b" }, { text: 'Czy nastąpiła zmiana pozycji', style: "header1b" }, { text: 'Zdjęcie', style: "header1b" }, { text: ' ', style: "header1b" }],
          ...dronePoints.map((item) => ([
            `${++i}`, item.present ? "Tak" : "Nie", item.type === 'worker' ? "Tak" : "Nie", item.present ? `Lat: ${item.location.latitude.toFixed(7)},\n Lon: ${item.location.longitude.toFixed(7)}` : '[pracownik nieobecny]', item.changedLoc ? "Tak" : "Nie", { image: addImage(item), height: 100, width: 150 }, `+/-`]))
        ]
      }
    },
    {
      text: `Pracownicy przestrzegający BHP podczas tego nalotu: ${dronePoints.filter(point => point.type === 'worker').filter(point => point.present).length} `,
      style: "header3b"
    },
    {
      text: `Pracownicy nie przestrzegający BHP podczas tego nalotu: ${dronePoints.filter(point => point.type === 'workerNoHS').filter(point => point.present).length}`,
      style: "header3b"
    }
  ]
}