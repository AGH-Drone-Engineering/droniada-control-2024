import useDronePath from 'logic/DronePath'
import { animatedDroneIcon } from 'logic/TypeLogic'
import React, { useState, useEffect } from 'react'
import { Marker, Polyline, Tooltip } from 'react-leaflet'

export default function DroneFlightPath() {
  const [path, data] = useDronePath()
  const [location, setDroneLocation] = useState([0, 0])
  const [droneStatus, setDroneStatus] = useState('lecę do kolejnego celu')

  useEffect(() => {
    if (data.length > 0) {
      let lastData = data[data.length - 1].location
      const status = data[data.length - 1].status
      lastData = [lastData._lat, lastData._long]
      setDroneLocation(lastData)
      setDroneStatus(status)
    }
  }, [data])

  return (
    <>
      <Polyline weight={2} positions={path} color='blue' interactive={false} />
      <Marker position={location} icon={animatedDroneIcon} interactive={false}>
        <Tooltip position={location} content={droneStatus} direction='auto' offset={[30, 0]} opacity={0.8} permanent />
      </Marker>

    </>
  )
}
