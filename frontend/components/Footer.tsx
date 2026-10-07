import styles from '@/styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2026 PodStream Global. All rights reserved.</p>
      <p>Empowering podcast lovers worldwide.</p>
      <p style={{ marginTop: '10px', opacity: 0.9 }}>
        Part of the <span className={styles.brandWordmark}>PodStream Global</span> network
      </p>
    </footer>
  )
}
