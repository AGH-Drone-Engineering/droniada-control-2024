import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import Shapes from 'components/Shapes';
import Points from 'components/Points';
import useInitalLocation from 'logic/useInitalLocation';
import { icons, mapType, inspectionable } from 'logic/TypeLogic';
import { addPointToMap } from 'logic/FbPointLogic';
import MapCenter from 'components/MapCenter';
import { storage } from 'logic/fb';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import EXIF from 'exif-js';

function toIsoString(date) {
  const pad = function (num) {
    return (num < 10 ? '0' : '') + num;
  };

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds())
  );
}

export default function ManualMapPoints(props) {
  let flightNo = props.flightNo;
  const [screenDatabase, setScreenDatabase] = useState(`inspection-${flightNo}-points`);
  const [position] = useInitalLocation(screenDatabase);
  const [clickedPos, setClickedPos] = useState({ lat: 0, lng: 0 });
  const [pointType, setPointType] = useState('generic');
  const [pointName, setPointName] = useState('');
  const [pointTimeStamp, setPointTimeStamp] = useState(toIsoString(new Date()));
  const [timeUpdate, setTimeUpdate] = useState(false);
  const [dialogReason, setDialogReason] = useState('');
  const [img, setImg] = useState('');
  const [dialogLoading, setDialogLoading] = useState(false);
  const [pointContent, setPointContent] = useState('');
  const [changedLoc, setChangedLoc] = useState(false);
  const [changedContent, setChangedContent] = useState(false);

  useEffect(() => {
    setScreenDatabase(`inspection-${flightNo}-points`);
  }, [flightNo]);

  useEffect(() => {
    setTimeout(() => {
      setDialogReason('');
    }, 1500);
  }, [dialogReason]);

  function MapEvents() {
    useMapEvents({
      click(e) {
        setClickedPos({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
  }

  const onChangeLatLng = (type, e) => {
    if (isNaN(e.target.value)) {
      return;
    }
    const x = { ...clickedPos };
    x[type] = e.target.value;
    setClickedPos(x);
  };

  const onChangeDateTime = (e) => {
    const date = new Date(e.target.value);
    setPointTimeStamp(toIsoString(date));
  };

  const onCheckedAutoTime = () => {
    setTimeUpdate(!timeUpdate);
  };

  const handleFile = (file) => {

    //Parse exif for file
    EXIF.getData(file, function () {
      const lat = EXIF.getTag(this, 'GPSLatitude');
      const lon = EXIF.getTag(this, 'GPSLongitude');
      if (lat && lon) {
        const latRef = EXIF.getTag(this, 'GPSLatitudeRef') || 'N';
        const lonRef = EXIF.getTag(this, 'GPSLongitudeRef') || 'W';
        const latDec = lat[0] + lat[1] / 60 + lat[2] / 3600;
        const lonDec = lon[0] + lon[1] / 60 + lon[2] / 3600;
        const latFinal = latRef === 'N' ? latDec : -latDec;
        const lonFinal = lonRef === 'W' ? lonDec : -lonDec;
        setClickedPos({ lat: latFinal, lng: -lonFinal });
      }
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setImg(base64String);
      if (base64String.length > (1024 * 1024)) {
        alert("Plik jest za duży żeby przeszedł jako base64 na firebase database, maksymalny rozmiar to 1MB, \n(//TODO upload na Firebase storage)");

      }

    };
    reader.readAsDataURL(file);


  };

  const onSubmit = () => {
    setDialogLoading(true);
    const time = timeUpdate ? toIsoString(new Date()) : pointTimeStamp;

    addPointToMap(
      screenDatabase,
      {
        img: img,
        name: pointName,
        type: pointType,
        shooted: false,
        content: pointContent,
        changedLoc,
        changedContent,
      },
      clickedPos,
      time
    );

    setDialogReason('Punkt dodany pomyślnie');
    setDialogLoading(false);
  };

  return (
    <>
      {dialogReason && (
        <div className='modal-dialog'>
          {dialogReason}
          <button onClick={() => setDialogReason('')}>Zamknij</button>
        </div>
      )}
      <div className='mannual-wrapper'>
        <div className='mannual-mapper'>
          <MapContainer center={position} zoom={19} style={{ height: '100%' }}>
            <TileLayer
              url='https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg?access_token=pk.eyJ1IjoiYWdoLWRlIiwiYSI6ImNsZWxvajl3dDBtd3Qzd29kcnY4YjFxbmMifQ.xUC7tSyVs0LcHrdAf3XNgA'
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              maxZoom={23}
            />
            <Points db={screenDatabase} key={flightNo + '_points'}></Points>
            <Shapes dbName={screenDatabase} key={flightNo + '_shapes'}></Shapes>
            <Marker position={clickedPos}></Marker>
            <MapCenter position={position} alwaysUpdate={true} />
            <MapEvents />
          </MapContainer>
        </div>
        <div className='mannual-controls'>
          <h2>Dodawanie ręczne punktu</h2>
          <h3>Inspekcja dzień {flightNo}</h3>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='latInput'>Szerokość geograficzna:</label>
              <input
                id='latInput'
                type='text'
                value={clickedPos.lat}
                onChange={(e) => onChangeLatLng('lat', e)}
              ></input>
            </div>
            <div className='form-group'>
              <label htmlFor='lngInput'>Długość geograficzna:</label>
              <input
                id='lngInput'
                type='text'
                value={clickedPos.lng}
                onChange={(e) => onChangeLatLng('lng', e)}
              ></input>
            </div>
          </div>
          <span className='cheat-info'>
            Lat i long zostanie automatycznie pobrany po uploadzie zdjęcia, alternatywnie można
            kliknąć w mapę i wybrać punkt
          </span>
          <label htmlFor='pointNameInput'>Nazwa punktu:</label>
          <input
            id='pointNameInput'
            type='text'
            value={pointName}
            onChange={(e) => setPointName(e.target.value)}
            required
          ></input>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='pointTypeSelect'>Typ punktu:</label>
              <select id='pointIconSelect' onChange={(e) => setPointType(e.target.value)}>
                {Object.keys(icons)
                  .filter((a) => inspectionable.includes(a))
                  .sort((a, b) => mapType(a).localeCompare(mapType(b)))
                  .map((a) => (
                    <option value={a} key={a}>
                      {mapType(a)}
                    </option>
                  ))}
              </select>
            </div>
            {/* For arucos */}

            {pointType === 'aruco' && (
              <div className='form-group'>
                <label htmlFor='arucoInput'>Kod Aruco:</label>
                <input
                  id='arucoInput'
                  type='number'
                  value={pointContent}
                  onChange={(e) => setPointContent(e.target.value)}
                  required
                ></input>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='changedLoc'
                    value={changedLoc}
                    onChange={(e) => setChangedLoc(e.target.value)}
                  />
                  <label className='form-check-label' htmlFor='changedLoc'>
                    Zmiana lokalizacji
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='changedContent'
                    value={changedContent}
                    onChange={(e) => setChangedContent(e.target.value)}
                  />
                  <label className='form-check-label' htmlFor='changedContent'>
                    Zmiana zawartości
                  </label>
                </div>
              </div>
            )}

            <div className='form-group'>
              <label htmlFor='pointTimestampInput'>Data i czas:</label>
              <input
                id='pointTimestampInput'
                type='datetime-local'
                value={pointTimeStamp}
                onChange={onChangeDateTime}
                disabled={timeUpdate}
              ></input>
            </div>
          </div>
          <label className='checkbox-label'>
            <input type='checkbox' onChange={onCheckedAutoTime} />
            Automatyczne ustawienie czasu
          </label>

          <div className='form-group'>
            <label htmlFor='imgTextarea'>Obraz (upload):</label>
            <input type='file' onChange={(e) => handleFile(e.target.files[0])}></input>
          </div>

          {!dialogLoading && <button onClick={onSubmit}>Dodaj punkt</button>}
          {dialogLoading && <button disabled>Dodawanie...</button>}
        </div>
      </div>
    </>
  );
}
