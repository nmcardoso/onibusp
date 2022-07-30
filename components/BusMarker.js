import L, { marker } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { useContext } from 'react'
import { store } from '../utils/store'
import { BUS_LINES } from '../utils/constants'


const getIcon = (iconColor) => L.icon({
  iconUrl: `/assets/img/marker-${iconColor}.svg`,
  iconSize: [20, 35],
  iconAnchor: [10, 34],
  popupAnchor: [0, -32],
})

export default function BusMarker({ pos, lineCode }) {
  const appContext = useContext(store)
  const { appState, appDispatch } = appContext

  return (
    <Marker position={pos} icon={getIcon(BUS_LINES[lineCode].iconColor)}>
      <Popup>
        <div>
          {BUS_LINES[lineCode].displayName}
        </div>
        <div className="has-text-centered">
          <button
            className="button is-ghost is-small"
            onClick={e => {
              e.stopPropagation()
              appDispatch({
                type: 'toggleBusRoute',
                payload: {
                  id: lineCode,
                  show: !appState.control[parseInt(lineCode)].route
                }
              })
            }}>
            {appState.control[lineCode].route ? 'Ocultar Percurso' : 'Ver Percurso'}
          </button>
        </div>
      </Popup>
    </Marker>
  )
}