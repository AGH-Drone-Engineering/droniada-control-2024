import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import useMapPoints from 'logic/useMapPoints';
import { useContext } from 'react';
import { FilterContext } from './FilterContext';

// Define custom marker icon
const crosshairIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/crosshair.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

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

const icons = { generic: crosshairIcon, fail: faultIcon, qr: qrCodeIcon, hat: hatIcon };

function getType(point) {
  return ('type' in point && point.type in icons) ? point.type : 'generic';
}

function getIcon(point) {
  return icons[getType(point)];
}

export default function Points({ db }) {
  const points = useMapPoints(db);
  const { filter } = useContext(FilterContext);
  return (
    <>
         {points.map((point) => {
           if (!filter[getType(point)]) { return (<></>); }
           return (
        <Marker
          key={point.id}
          position={[point.location.latitude, point.location.longitude]}
          icon={getIcon(point)}
        >
          <Popup>
            <div className='marker-popup'>
              <img src={'data:image/jpeg;base64,/9j/' + point.img} className="icon-img" alt='Capture from drone'></img>
              <p>{point.name}</p>
            </div>
          </Popup>
        </Marker>);
         })}
    </>
  );
}
