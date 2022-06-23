import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'
import { useQuery } from 'react-query'
import icon from 'leaflet/dist/images/marker-icon.png'

const Map = dynamic(
  import('../components/Map'),
  { ssr: false }
)


export default function Home() {
  return (
    <Map />
  )
}
