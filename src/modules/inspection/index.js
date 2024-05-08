
import Header from 'components/Header';
import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import UnorderedPoints from 'components/UnorderedPoints';
import MapRenderer from 'components/Map';
import useInitalLocation from 'logic/useInitalLocation';
import { FilterContext } from 'logic/FilterContext';
import Stats from 'components/Stats';
import setupCSS from 'components/css-with-js';

export default function PipelineScreen() {
  const [tabIndex, setTabIndex] = useState(0);
  const [screenDatabase, setScreenDatabase] = useState('inspection-0-points');

  const handleTabChange = (index) => {
    setTabIndex(index);
    setScreenDatabase(`inspection-${index}-points`);
  };

  useEffect(() => {
    setupCSS();
  }, [tabIndex]);

  const [position] = useInitalLocation(screenDatabase);
  const [filter, setFilter] = useState({});


  return (
    <div className='App'>
      <div id='header'>
        <Header appName='Inspekcja' />
        <Stats db={screenDatabase} />
      </div>
      <div>
        <Tabs selectedIndex={tabIndex} onSelect={handleTabChange}>
          <div className='tab-packer'>
            <div className='tabs-container'>
              <TabList>
                <Tab><p>Lot zerowy</p></Tab>
                <Tab><p>Lot pierwszy - zmiany</p></Tab>
                <Tab><p>Lot drugi - zmiany</p></Tab>
                <Tab><p>Lot trzeci - zmiany</p></Tab>
              </TabList>
            </div>

          </div>
          <TabPanel>
            <FilterContext.Provider value={{ filter, setFilter }}>
              <main>
                <div className='map-wrapper'>
                  <MapRenderer position={position} db={screenDatabase} />
                </div>
                <div className='right-list'>
                  <UnorderedPoints db={screenDatabase} />
                </div>
              </main>
            </FilterContext.Provider>
          </TabPanel>
          <TabPanel>
            <FilterContext.Provider value={{ filter, setFilter }}>
              <main>
                <div className='map-wrapper'>
                  <MapRenderer position={position} db={screenDatabase} />
                </div>
                <div className='right-list'>
                  <UnorderedPoints db={screenDatabase} />
                </div>
              </main>
            </FilterContext.Provider>
          </TabPanel>
          <TabPanel>
            <FilterContext.Provider value={{ filter, setFilter }}>
              <main>
                <div className='map-wrapper'>
                  <MapRenderer position={position} db={screenDatabase} />
                </div>
                <div className='right-list'>
                  <UnorderedPoints db={screenDatabase} />
                </div>
              </main>
            </FilterContext.Provider>
          </TabPanel>
          <TabPanel>
            <FilterContext.Provider value={{ filter, setFilter }}>
              <main>
                <div className='map-wrapper'>
                  <MapRenderer position={position} db={screenDatabase} />
                </div>
                <div className='right-list'>
                  <UnorderedPoints db={screenDatabase} />
                </div>
              </main>
            </FilterContext.Provider>
          </TabPanel>

        </Tabs>

      </div>

    </div>
  );
}
