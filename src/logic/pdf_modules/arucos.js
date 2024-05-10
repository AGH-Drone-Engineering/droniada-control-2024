
// Call the function with the ID of the marker

export default function (points, addImage) {
  const dronePoints = points.filter(point => point.type === 'aruco')
  let i = 0;
  return [
    {
      text: " ",
      style: "header3"
    },
    {
      text: "6. Znalezione kody ArUco",
      style: "header3"
    },
    {
      table: {
        headerRows: 1,
        widths: ['auto', 80, 100, 50, 50, 150, 'auto'],
        body: [
          [{ text: '#', style: "header1b" }, { text: 'Zawartość', style: 'header1b' }, { text: 'Lokalizacja', style: "header1b" }, { text: 'Zmiana położenia?', style: "header1b" }, { text: 'Zmiana lokalizacji?', style: "header1b" }, { text: 'Zdjęcie', style: "header1b" }, { text: ' ', style: "header1b" }],
          ...dronePoints.map((item) => ([
            `${++i}`, (item.name ? (item.name + '\n') : '') + 'ID: ' + item.content, `Lat: ${item.location.latitude.toFixed(7)},\n Lon: ${item.location.longitude.toFixed(7)}`, item.changedLoc ? 'Tak' : 'Nie', item.changedContent ? 'Tak' : 'Nie', { image: addImage(item), height: 100, width: 150 }, `+/-`]))
        ]
      }
    }
  ]
}