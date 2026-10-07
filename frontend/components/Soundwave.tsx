import styles from '@/styles/Soundwave.module.css'

export default function Soundwave() {
  return (
    <div className={styles.soundwave} aria-hidden="true">
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
    </div>
  )
}
