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
  const dronePoints = points.filter(point => point.type === 'intruder' || point.type === 'fire')
  let i = 0;
  return [
    {
      text: " ",
      style: "header3"
    },
    {
      text: "5. Sytuajce nadzwyczajne",
      style: "header3"
    },
    {
      table: {
        headerRows: 1,
        widths: ['auto', 60, 80, 80, 150, 40, 'auto'],
        body: [
          [{ text: '#', style: "header1b" }, { text: 'Zdarzenie', style: 'header1b' }, { text: 'Czas', style: "header1b" }, { text: 'Lokalizacja', style: "header1b" }, { text: 'Zdjęcie', style: "header1b" }, { text: 'Powiadomienie', style: "header1b" }, { text: ' ', style: "header1b" }],
          ...dronePoints.map((item) => ([
            `${++i}`, item.name, fbTimeToTime(item), `Lat: ${item.location.latitude.toFixed(7)},\n Lon: ${item.location.longitude.toFixed(7)}`, { image: addImage(item), width: 150, height: 100 }, item.notified ? 'Tak' : 'Nie', `+/-`]))
        ]
      }
    }
  ]
}