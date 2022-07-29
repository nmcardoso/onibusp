import styles from '../styles/MapControllers.module.scss'
import BusLineController from './BusLineController'
import ConfigController from './ConfigController'

export default function MapControllers() {
  return (
    <div>
      <div className={`${styles.top} ${styles.left}`}>
        <div className={styles.container}>
          {/* <ConfigController /> */}
          <BusLineController />
        </div>
      </div>
    </div>
  )
}