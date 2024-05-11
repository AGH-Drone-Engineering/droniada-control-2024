import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import Points from 'components/Points';
import Shapes from 'components/Shapes';
import DroneFlightPath from 'components/DroneFlight';
import MapCenter from 'components/MapCenter';
import useMapPoints from 'logic/useMapPoints';
import useInitalLocation from 'logic/useInitalLocation';
import { FilterContext } from 'logic/FilterContext';
import { storage } from 'logic/fb';
import { uploadBytes, ref } from 'firebase/storage';

export default function BigMap() {
  const [zoom, setZoom] = useState(12);
  const [db, setDb] = useState('inspection-0-points');
  const [center] = useInitalLocation(db);
  const divRef = useRef(null);
  const [file, setFile] = useState();
  const [url, setUrl] = useState('https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg?access_token=pk.eyJ1IjoiYWdoLWRlIiwiYSI6ImNsZWxvajl3dDBtd3Qzd29kcnY4YjFxbmMifQ.xUC7tSyVs0LcHrdAf3XNgA')
  const [fileExtension, setFileExtension] = useState('png');

  const goFullScreen = () => {
    if (divRef.current && divRef.current.requestFullscreen) {
      divRef.current.requestFullscreen();
    } else if (divRef.current && divRef.current.mozRequestFullScreen) {
      divRef.current.mozRequestFullScreen();
    } else if (divRef.current && divRef.current.webkitRequestFullscreen) {
      divRef.current.webkitRequestFullscreen();
    } else if (divRef.current && divRef.current.msRequestFullscreen) {
      divRef.current.msRequestFullscreen();
    }
  };

  const MapZoom = () => {
    const map = useMap();
    useEffect(() => {
      map.setZoom(zoom);
    }, [zoom]);
    return null;
  };

  const saveScreen = () => {
    if (!file) {
      alert('Nie wybrano pliku');
      return;
    }
    uploadBytes(ref(storage, 'screenshots/' + db + "." + fileExtension), file).then((snapshot) => {
      alert("Zapisano skrina!")
    });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileExtension(e.target.value.split('.').pop())
    setFile(file);
  };

  return (
    <div className="fullscreen-mapper" >
      <div ref={divRef} className="map">
        <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url={url}
            attribution='Map data &copy; <a href="https://https://www.mapbox.com/">Mapbox</a> contributors'
            maxZoom={23}
          />
          <Points db={db}></Points>
          <Shapes dbName={db}></Shapes>
          <MapCenter position={center} />
          <MapZoom />
        </MapContainer>
      </div>
      <div className="mapper-info">
        <button onClick={goFullScreen}>Tryb zdjęciowy (Fullscreen) </button>
        <div>
          <select value={db} onChange={(e) => setDb(e.target.value)}>
            <option value="inspection-0-points">Inspekcja dzień zerowy</option>
            <option value="inspection-1-points">Inspekcja (1) dzień </option>
            <option value="inspection-2-points">Inspekcja (2) dzień </option>
            <option value="inspection-3-points">Inspekcja (3) dzień </option>
          </select>
        </div>
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="url">Url:</label>
          <input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="zoom">Zoom: </label>
          <input type="number" id="zoom" value={zoom} onChange={(e) => setZoom(e.target.value)} />
          <span className="cheat-info">Zakres: 1-23, jest to wartość "z" którą będzie requestował serwer</span>
        </div>
        <div style={{ marginTop: '20px' }}>
          {/* Label for file upload of screenshot */}
          <p className="cheat-info">Po dostosowaniu parametrów, należy przejść na fullscreen i zrobić "skrina". Następnie należy go tu zuploadować. </p> <br />
          <label htmlFor="file">Zrzut ekranu: </label> <br />
          <input type="file" id="file" onChange={handleFileChange} />
          <button onClick={saveScreen}>Zapisz skrina</button>
        </div>
      </div>
    </div >
  );
}
