import styles from '@/styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>&copy; 2026 PodStream Global. All rights reserved.</p>
      <p className={styles.footerText}>Empowering podcast lovers worldwide.</p>
      <p className={styles.footerText} style={{ marginTop: '10px', opacity: 0.9 }}>
        Part of the <span className={styles.brandWordmark}>PodStream Global</span> network
      </p>
    </footer>
  )
}
