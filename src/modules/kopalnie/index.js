import Header from 'components/Header';
import UnorderedPoints from 'components/UnorderedPoints';
import MapRenderer from 'components/Map';
import useInitalLocation from 'logic/useInitalLocation';
import React, { useState } from 'react';
import { FilterContext } from 'logic/FilterContext';
import Stats from 'components/Stats';
import MissionTimePopup from 'components/MissionTimePopup';

const screenDatabase = 'mines-points';

export default function MinesScreen() {
  const [position] = useInitalLocation(screenDatabase);
  const [filter, setFilter] = useState({});

  return (
    <div className='App'>
      <div id='header'>
        <Header appName='Kopalnie marsjańskie' />
        <Stats db={screenDatabase} />
      </div>
      <MissionTimePopup/>
      <FilterContext.Provider value={{ filter, setFilter }}>
        <main>
          <div className='map-wrapper'>
            <MapRenderer position={position} db={screenDatabase} zoom={20} >
            </MapRenderer>
          </div>
          <div className='right-list'>
            <UnorderedPoints db={screenDatabase} />
          </div>
        </main>
      </FilterContext.Provider>
    </div>
  );
}
