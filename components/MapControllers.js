import styles from '../styles/MapControllers.module.scss'
import BusLineController from './BusLineController'
import BusRouteController from './BusRouteController'
import ConfigController from './ConfigController'
import { store } from '../utils/store'
import { useContext } from 'react'

export default function MapControllers() {
  const appContext = useContext(store)
  const { appState } = appContext

  return (
    <div
      style={{ top: appState.config.showZoomController ? '84px' : '10px' }}
      className={`${styles.top} ${styles.left}`}>
      <div className={styles.container}>
        <ConfigController />
        {appState.config.showBusLineController ? <BusLineController /> : null}
        {appState.config.showBusRouteController ? <BusRouteController /> : null}
      </div>
    </div>
  )
}