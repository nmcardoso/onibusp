import axios from 'axios'
import { useQuery } from 'react-query'
import { useContext } from 'react'
import BusMarker from './BusMarker'
import { store } from '../utils/store'


export default function BusMarkers() {
  const appContext = useContext(store)
  const { appState } = appContext

  const { status, data, error } = useQuery('bus_tracker', async () => {
    const url = process.env.NODE_ENV === 'developments' ?
      '/api/dev_position' : '/api/position'
    const res = await axios.post(url, { q: appState.layers.busPosition })
    return res.data
  }, {
    refetchInterval: 5000,
  })

  let markers = []
  if (status == 'success' && Array.isArray(data)) {
    // filtra linhas que não foram selecionadas pelo usuário
    const filteredData = data.filter(v => (
      !!~appState.layers.busPosition.indexOf(parseInt(v.cl))
    ))

    // cria os elementos "Markers"
    markers = filteredData.map((d, i) => {
      if (!Array.isArray(d.vs)) return []
      return d.vs.map(({ py, px, p }) => (
        <BusMarker pos={[py, px]} key={p} lineCode={d.cl} />
      ))
    })

    markers = [].concat(...markers)
  }

  if (status == 'error') {
    // TODO: handle error
    console.error(error)
    return <></>
  }

  return (
    <>
      {markers}
    </>
  )
}