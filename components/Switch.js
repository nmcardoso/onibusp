import styles from '../styles/Switch.module.scss'

export default function Switch({
  children,
  onClick = () => { }
}) {
  return (
    <label className={styles.switch}>
      <input type="checkbox" onClick={onClick} />
      <span className={`${styles.slider} ${styles.round}`}>{children}</span>
    </label>
  )
}