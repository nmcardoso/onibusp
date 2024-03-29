import { BiTargetLock } from 'react-icons/bi'
import MapControllerButton from './MapControllerButton'
import NonBubblingComponent from './NonBubblingComponent'
import { useState } from 'react'
import { Circle, useMapEvents } from 'react-leaflet'

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}

export default function LocationController() {
  const [position, setPosition] = useState({
    latlng: null,
    acc: null
  })
  const [isWatching, setWatching] = useState(false)
  const [shouldCenter, setShouldCenter] = useState(true)

  const map = useMapEvents({
    locationfound: e => {
      setPosition({ latlng: e.latlng, acc: e.accuracy })
      if (shouldCenter) {
        map.panTo(e.latlng)
        setShouldCenter(false)
      }
    },
    locationerror: e => {
      alert(JSON.stringify(e, getCircularReplacer()))
      setWatching(false)
      setShouldCenter(false)
    }
  })

  const toggleWatch = () => {
    const w = !isWatching
    if (w) {
      map.locate({
        watch: true,
        setView: false,
        timeout: 8000,
        maximumAge: 3000,
        enableHighAccuracy: true
      })
    } else {
      map.stopLocate()
      setShouldCenter(true)
    }
    setWatching(w)
  }

  return (
    <NonBubblingComponent>
      <MapControllerButton
        onClick={toggleWatch}
        style={{
          fontSize: '19px',
          color: isWatching ? 'blue' : 'black'
        }}>
        <BiTargetLock />
      </MapControllerButton>

      {isWatching && position.latlng && <>
        <Circle
          center={position.latlng}
          radius={4}
          fillOpacity={1} />
        <Circle
          center={position.latlng}
          radius={position.acc > 25 ? position.acc : 25}
          weight={2} />
      </>}
    </NonBubblingComponent>
  )
}