import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import { useQuery } from 'react-query'
import { MapContainer, TileLayer } from 'react-leaflet'
import BusMarker from './BusMarker'
import BusRoute from './BusRoute'
import MapControllers from './MapControllers'
import Modal from './Modal'

const center = [-23.5595306, -46.7299148]


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
      return d.vs.map(({ py, px, p }) => <BusMarker pos={[py, px]} key={p} lineCode={d.cl} />)
    })

    markers = [].concat(...markers)
  }

  if (status == 'error') return <h1>Error!<br />{error.message}</h1>

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
        {markers}
        <BusRoute lineCode={2023} />
        <MapControllers />
      </MapContainer>
    </>
  )
}
