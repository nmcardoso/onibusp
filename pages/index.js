import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import LoadInitialState from '../components/LoadInitialState'
import { AppStateProvider } from '../utils/store'

const Map = dynamic(
  import('../components/Map'),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      <Head>
        <title>Ônibus USP</title>
      </Head>

      <AppStateProvider>
        <LoadInitialState />
        <Map />
      </AppStateProvider>
    </>
  )
}
