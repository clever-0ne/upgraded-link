'use client'

import styles from '@/styles/SuccessOverlay.module.css'

interface SuccessOverlayProps {
  show: boolean
}

export default function SuccessOverlay({ show }: SuccessOverlayProps) {
  return (
    <div className={`${styles.successOverlay} ${show ? styles.show : ''}`} aria-hidden={!show}>
      <div className={styles.successBox}>
        <div className={styles.checkmark}>
          <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
            <polyline points="15,27 24,36 39,17"></polyline>
          </svg>
        </div>
        <h2>Your vote has been received</h2>
        <p>We will get back to you when your vote is counted.</p>
      </div>
    </div>
  )
}
