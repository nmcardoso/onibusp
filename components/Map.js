import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import { useQuery } from 'react-query'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { marker } from 'leaflet'

const center = [-23.5595306, -46.7299148]

const codes = {
  2023: '8012-10 (Metro Butanta)',  // 8012-10-1
  34791: '8012-10 (Terminal P3)',   // 8012-10-2
  2085: '8022-10 (Metro Butanta)',  // 8022-10-1
  34853: '8022-10 (Terminal P3)',   // 8022-10-2
  2545: '8032-10',                  // 8032-10-1
  35313: '8032-10'                  // 8032-10-2
}

const getIcon = (number) => L.icon({
  iconUrl: `/assets/img/marker-${number}.svg`,
  iconSize: [20, 35],
  iconAnchor: [10, 34],
  popupAnchor: [0, -32],
})

const getMarker = (pos, key, icon, cl) => (
  <Marker position={pos} key={key} icon={icon}>
    <Popup>
      {codes[cl]}
    </Popup>
  </Marker>
)


export default function Map() {
  const { status, data, error, isFetching } = useQuery('bus_tracker', async () => {
    const res = await axios.get('/api/position')
    return res.data
  }, {
    refetchInterval: 10000,
  })

  // console.log(data)

  let markers = []
  if (status == 'success' && Array.isArray(data)) {
    markers = data.map((d, i) => {
      if (!Array.isArray(d.vs)) return []
      return d.vs.map(({ py, px, p }) => getMarker([py, px], p, getIcon(i), d.cl))
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
