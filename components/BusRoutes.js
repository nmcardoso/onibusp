import { useContext } from 'react'
import BusRoute from './BusRoute'
import { store } from '../utils/store'


export default function BusRoutes() {
  const appContext = useContext(store)
  const { appState } = appContext

  let routes = []
  for (let lineId in appState.control) {
    if (appState.control[lineId].route) {
      routes.push(<BusRoute lineCode={lineId} />)
    }
  }

  return (
    <>
      {routes}
    </>
  )
} 