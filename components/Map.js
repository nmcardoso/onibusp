import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import BusMarkers from './BusMarkers'
import BusRoutes from './BusRoutes'
import MapControllers from './MapControllers'
import { store } from '../utils/store'
import { useContext } from 'react'

const center = [-23.5595306, -46.7299148]

export default function Map() {
  const appContext = useContext(store)
  const { appState } = appContext

  return (
    <>
      <MapContainer
        center={center}
        zoom={16}
        style={{ width: '100vw', height: '100vh' }}
        dragging={true}
        doubleClickZoom={false}
        scrollWheelZoom={true}
        zoomControl={false}
        zoomSnap={0.25}
        zoomDelta={0.25}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution=''
        />
        {appState.config.showZoomController ? <ZoomControl position="topleft" /> : null}
        <BusMarkers />
        <BusRoutes />
        <MapControllers />
      </MapContainer>
    </>
  )
}
