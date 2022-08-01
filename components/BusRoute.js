import { Polyline, Popup } from 'react-leaflet'
import axios from 'axios'
import { BL_UNIQUE } from '../utils/constants'
import { store } from '../utils/store'
import { useEffect, useState, useContext } from 'react'

export default function BusRoute({ lineCode }) {
  const [positions, setPositions] = useState(null)
  const appContext = useContext(store)
  const { appState, appDispatch } = appContext

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
        positions={positions}
        pathOptions={{
          color: BL_UNIQUE.find(({ lineId }) => lineId == lineCode).pathColor
        }}>
        <Popup>
          <button
            className="button is-ghost is-small"
            onClick={e => {
              e.stopPropagation()
              appDispatch({
                type: 'toggleLayer',
                payload: {
                  lineId: parseInt(lineCode),
                  transform: ~appState.layers.busRoute.indexOf(lineCode) ? 'remove' : 'add',
                  layer: 'busRoute'
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