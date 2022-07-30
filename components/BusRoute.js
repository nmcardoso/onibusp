import { Polyline, Popup } from 'react-leaflet'
import axios from 'axios'
import { BUS_LINES } from '../utils/constants'
import { store } from '../utils/store'
import { useEffect, useState, useContext } from 'react'

export default function BusRoute({ lineCode }) {
  const [positions, setPositions] = useState(null)
  const appContext = useContext(store)
  const { appDispatch } = appContext

  useEffect(() => {
    const handle = async () => {
      try {
        const res = await axios.get(`/data/routes/${String(lineCode)}.json?v=1`)
        setPositions(res.data)
      } catch (e) {
        console.log('não foi possível carregar a rota')
      }
    }
    handle()
  }, [lineCode])

  if (Array.isArray(positions)) {
    return (
      <Polyline
        key={lineCode}
        positions={positions}
        pathOptions={{ color: BUS_LINES[lineCode].pathColor }}>
        <Popup>
          <button
            className="button is-ghost is-small"
            onClick={e => {
              e.stopPropagation()
              appDispatch({
                type: 'toggleBusRoute',
                payload: {
                  id: lineCode,
                  show: false
                }
              })
            }}>
            Ocultar percurso
          </button>
        </Popup>
      </Polyline>
    )
  } else {
    return <></>
  }
}