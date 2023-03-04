import Header from 'components/Header';
import UnorderedPoints from 'components/UnorderedPoints';
import MapRenderer from 'components/Map';
import useInitalLocation from 'logic/useInitalLocation';
import React, { useState } from 'react';
import { FilterContext } from 'components/FilterContext';

export default function IntruderScreen() {
  const [position] = useInitalLocation();
  const [filter, setFilter] = useState({});

  return (
    <div className='App'>
      <Header appName='Intruz' />
      <hr></hr>

      <FilterContext.Provider value={{ filter, setFilter }}>
        <main>
          <div className='map-wrapper'>
            <MapRenderer position={position} db={'map-points'} />
          </div>
          <div className='right-list'>
            <UnorderedPoints db={'map-points'} />
          </div>
        </main>
      </FilterContext.Provider>
    </div>
  );
}
