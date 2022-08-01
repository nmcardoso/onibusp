import { useContext } from 'react'
import BusRoute from './BusRoute'
import { store } from '../utils/store'


export default function BusRoutes() {
  const appContext = useContext(store)
  const { appState } = appContext

  const routes = appState.layers.busRoute.map(lineId => (
    <BusRoute key={lineId} lineCode={lineId} />
  ))

  return (
    <>
      {routes}
    </>
  )
} 