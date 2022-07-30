import styles from '../styles/MapControllers.module.scss'
import BusLineController from './BusLineController'
import BusRouteController from './BusRouteController'
import ConfigController from './ConfigController'

export default function MapControllers() {
  return (
    <div className={`${styles.top} ${styles.left}`}>
      <div className={styles.container}>
        {/* <ConfigController /> */}
        <BusLineController />
        <BusRouteController />
      </div>
    </div>
  )
}