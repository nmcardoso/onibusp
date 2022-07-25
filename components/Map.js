import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import { useQuery } from 'react-query'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { marker } from 'leaflet'
import { BUS_LINES } from '../utils/constants'

const center = [-23.5595306, -46.7299148]

const getIcon = (iconColor) => L.icon({
  iconUrl: `/assets/img/marker-${iconColor}.svg`,
  iconSize: [20, 35],
  iconAnchor: [10, 34],
  popupAnchor: [0, -32],
})

const getMarker = (pos, key, lineCode) => (
  <Marker position={pos} key={key} icon={getIcon(BUS_LINES[lineCode].iconColor)}>
    <Popup>
      {BUS_LINES[lineCode].displayName}
    </Popup>
  </Marker>
)


export default function Map() {
  const { status, data, error, isFetching } = useQuery('bus_tracker', async () => {
    const res = await axios.get('/api/position')
    return res.data
  }, {
    refetchInterval: 4000,
  })

  let markers = []
  if (status == 'success' && Array.isArray(data)) {
    markers = data.map((d, i) => {
      if (!Array.isArray(d.vs)) return []
      return d.vs.map(({ py, px, p }) => getMarker([py, px], p, d.cl))
    })

    markers = [].concat(...markers)
  }

  if (status == 'error') return <h1>Error!<br />{error.message}</h1>

  return (
    <MapContainer
      center={center}
      zoom={16}
      style={{ width: '100vw', height: '100vh' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution=''
      />
      {markers}
    </MapContainer>
  )
}
