import { Polyline, Popup } from 'react-leaflet'
import axios from 'axios'
import { BUS_LINES } from '../utils/constants'
import { useEffect, useState } from 'react'

export default function BusRoute({ lineCode }) {
  const [positions, setPositions] = useState(null)

  useEffect(() => {
    const handle = async () => {
      try {
        const res = await axios.get(`/data/routes/${String(lineCode)}.json`)
        setPositions(res.data)
      } catch (e) {
        console.log('error')
      }
    }
    handle()
  }, [lineCode])

  if (Array.isArray(positions)) {
    return (
      <Polyline positions={positions} pathOptions={{ color: BUS_LINES[lineCode].pathColor }}>
        <Popup>
          Ocultar Rota
        </Popup>
      </Polyline>
    )
  } else {
    return <></>
  }
}