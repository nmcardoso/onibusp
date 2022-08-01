import L, { marker } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { useContext } from 'react'
import { store } from '../utils/store'
import { BL_UNIQUE } from '../utils/constants'


const getIcon = (iconColor) => L.icon({
  iconUrl: `/assets/img/marker-${iconColor}.svg`,
  iconSize: [20, 35],
  iconAnchor: [10, 34],
  popupAnchor: [0, -32],
})

export default function BusMarker({ pos, lineCode }) {
  const appContext = useContext(store)
  const { appState, appDispatch } = appContext
  const lineInfo = BL_UNIQUE.find(({ lineId }) => lineId == lineCode)

  if (!lineInfo) return null

  return (
    <Marker
      icon={getIcon(lineInfo.iconColor)}
      position={pos}>
      <Popup>
        <div>
          {lineInfo.displayName}
        </div>
        <div className="has-text-centered">
          <button
            className="button is-ghost is-small"
            onClick={e => {
              e.stopPropagation()
              appDispatch({
                type: 'toggleLayer',
                payload: {
                  lineId: parseInt(lineId),
                  transform: ~appState.layers.busRoute.indexOf(lineId) ? 'remove' : 'add',
                  layer: 'busRoute'
                }
              })
            }}>
            {~appState.layers.busRoute.indexOf(lineCode) ? 'Ocultar Percurso' : 'Ver Percurso'}
          </button>
        </div>
      </Popup>
    </Marker>
  )
}