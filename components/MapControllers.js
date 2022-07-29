import styles from '../styles/MapControllers.module.scss'
import AddLineController from './AddLineController'
import BusRouteController from './BusRouteController'
import ConfigController from './ConfigController'

export default function MapControllers() {
  return (
    <div>
      <div className={`${styles.top} ${styles.left}`}>
        <div className={styles.container}>
          <ConfigController />
          <AddLineController />
          <BusRouteController />
        </div>
      </div>
    </div>
  )
}