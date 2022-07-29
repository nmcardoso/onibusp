import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import BusMarkers from './BusMarkers'
import BusRoutes from './BusRoutes'
import MapControllers from './MapControllers'

const center = [-23.5595306, -46.7299148]

export default function Map() {
  return (
    <>
      <MapContainer
        center={center}
        zoom={16}
        style={{ width: '100vw', height: '100vh' }}
        doubleClickZoom={false}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution=''
        />
        <BusMarkers />
        <BusRoutes />
        <MapControllers />
      </MapContainer>
    </>
  )
}
