import L from 'leaflet';

// Generic:
const crosshairIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/crosshair.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

// Pipeline:
const qrCodeIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/qrcode.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

const faultIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/siren.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

const hatIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/hat.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

const barrelIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/barrel.png',
  iconSize: [26, 26],
  iconAnchor: [13, 13],
  popupAnchor: [0, 0]
});

const pipelineLeakIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/broken-pipe.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0]
});

const cuttedWireIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/wire.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0]
});

const helmetOffIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/no-helmet.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0]
});

// Intruder:
const bagIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/bag.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, 0]
});

const intruderIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/intruder.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, 0]
});

// Mines
const blueIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/blue.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

const beigeIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/beige.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

const violetIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/violet.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

const greenIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/green.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

const roverIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/rover.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0]
});

// Other icons
const animatedDroneIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/drone.gif',
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  popupAnchor: [0, 0]
});

const nameMap = {
  white: 'zdrowe',
  brown: 'podatne',
  gold: 'parch',
  bag: 'torba',
  qr: 'QR',
  generic: 'Inne',
  cuttedWire: 'Przecięty kabel',
  pipelineLeak: 'Awaria rury',
  helmetOff: 'Zdjęty kask',
  barrel: 'Beczka',
  violet: 'Fioletowe',
  blue: 'Niebieskie',
  beige: 'Ceglane',
  green: 'Zielone',
  rover: 'Lądownik'
};
const icons = {
  generic: crosshairIcon,
  fail: faultIcon,
  qr: qrCodeIcon,
  hat: hatIcon,
  barrel: barrelIcon,
  helmetOff: helmetOffIcon,
  cuttedWire: cuttedWireIcon,
  pipelineLeak: pipelineLeakIcon,
  bag: bagIcon,
  bomb: bagIcon,
  intruder: intruderIcon,
  beige: beigeIcon,
  white: beigeIcon,
  blue: blueIcon,
  violet: violetIcon,
  rover: roverIcon,
  green: greenIcon
};

function getType(point) {
  return ('type' in point && point.type in icons) ? point.type : 'generic';
}

function getIcon(point) {
  return icons[getType(point)];
}

function mapType(type) {
  const out = type in nameMap ? nameMap[type] : type;
  return out.charAt(0).toUpperCase() + out.slice(1);
}

export { getType, getIcon, mapType, nameMap, icons, animatedDroneIcon };

// For debugging in Chrome dev tools:
window.getType = getType;
window.getIcon = getIcon;
