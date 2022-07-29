import L, { marker } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { BUS_LINES } from '../utils/constants'


const getIcon = (iconColor) => L.icon({
  iconUrl: `/assets/img/marker-${iconColor}.svg`,
  iconSize: [20, 35],
  iconAnchor: [10, 34],
  popupAnchor: [0, -32],
})

export default function BusMarker({ pos, key, lineCode }) {
  return (
    <Marker position={pos} key={key} icon={getIcon(BUS_LINES[lineCode].iconColor)}>
      <Popup>
        {BUS_LINES[lineCode].displayName}<br />
        <a href="?ver">Ver Percurso</a>
      </Popup>
    </Marker>
  )
}