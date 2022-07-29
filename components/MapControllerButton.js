import styles from '../styles/MapControllerButton.module.scss'

export default function MapControllerButton({ children, style, onClick }) {
  return (
    <button className={styles.btn} style={style} onClick={onClick}>
      {children}
    </button>
  )
}