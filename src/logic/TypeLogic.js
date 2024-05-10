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

const pipelinefixedIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/fixed-pipe.png',
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

//Inspecition
const aurocoIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/arucos.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0],
  inspection: true
});

const workerIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/worker.png',
  iconSize: [30, 20],
  iconAnchor: [15, 10],
  popupAnchor: [0, 0],
  inspection: true
});

const workerNoHSIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/no-helmet.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0],
  inspection: true
});

const fenceIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/fence.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0],
  inspection: true
});

const brokenFence = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/broken-fence.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0],
  inspection: true
});


const fire = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/fire.gif',
  iconSize: [40, 60],
  iconAnchor: [20, 60],
  popupAnchor: [0, 0],
  inspection: true
});

const fixedWireIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/wire-ok.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0],
  inspection: true
});

const towerIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/tower.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0],
  inspection: true
});

const brokenTowerIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/broken-tower.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0],
  inspection: true
});


const carIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/car.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0],
  inspection: true
});

const removedCarIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/removed-car.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0],
  inspection: true
});

const europaletIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/europallet.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0],
  inspection: true
});

const rustyPipeIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/rusty-pipe.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0],
  inspection: true
});

const removedEuropaletIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/removed-europallet.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0],
  inspection: true
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
  helmetOff: 'Zdjęty kask',
  barrel: 'Beczka',
  violet: 'Fioletowe',
  blue: 'Niebieskie',
  beige: 'Ceglane',
  green: 'Zielone',
  rover: 'Lądownik',

  aruco: 'ArUco kod',
  worker: 'Pracownik OK',
  workerNoHS: 'Pracownik ŁAMIE BHP',
  intruder: 'Intruz',
  cuttedWire: 'Kabel PRZECIĘTY',
  pipelineLeak: 'Rurociąg AWARIA',
  fire: 'Pożar',
  fixedWire: 'Kabel OK',
  fence: 'Płot OK',
  brokenFence: 'Płot USZKODZONY',
  tower: 'Linia energetyczna OK',
  brokenTower: 'Linia energetyczna USZKODZONA',
  car: 'Samochód POZOSTAWIONY',
  removedCar: 'Samochód USUNIĘTY',
  europalet: 'Europaleta POZOSTAWIONA',
  removedEuropalet: 'Europaleta USUNIĘTA',
  pipelineFixed: 'Rurociąg NAPRAWIONY',
  rustyPipe: 'Rurociąg ZARDZEWIAŁY'
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
  green: greenIcon,
  aruco: aurocoIcon,
  worker: workerIcon,
  workerNoHS: workerNoHSIcon,
  fire: fire,
  fixedWire: fixedWireIcon,
  fence: fenceIcon,
  brokenFence: brokenFence,
  tower: towerIcon,
  brokenTower: brokenTowerIcon,
  car: carIcon,
  removedCar: removedCarIcon,
  europalet: europaletIcon,
  removedEuropalet: removedEuropaletIcon,
  pipelineFixed: pipelinefixedIcon,
  rustyPipe: rustyPipeIcon
};

const inspectionable = ['aruco', 'generic', 'tower', 'car', 'removedCar', 'rustyPipe', 'pipelineFixed', 'europalet', 'removedEuropalet', 'brokenTower', 'fence', 'brokenFence', 'fixedWire', 'worker', 'workerNoHS', 'fire', 'cuttedWire', 'pipelineLeak', 'intruder'];

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

export { getType, getIcon, mapType, nameMap, icons, animatedDroneIcon, inspectionable };

// For debugging in Chrome dev tools:
window.getType = getType;
window.getIcon = getIcon;
