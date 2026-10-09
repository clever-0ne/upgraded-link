'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface GlobalSetting {
  key: string
  value: string
  updated_at: string
}

interface AdminLog {
  id: number
  action: string
  user: string
  created_at: string
}

export default function UniversalAdminDashboard() {
  const [adminKey, setAdminKey] = useState('')
  const [settings, setSettings] = useState<GlobalSetting[]>([])
  const [logs, setLogs] = useState<AdminLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newKey, setNewKey] = useState('')
  const [newKeyError, setNewKeyError] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('adminKey')
    if (saved) setAdminKey(saved)
  }, [])

  useEffect(() => {
    if (!adminKey) return
    fetchDashboard()
  }, [adminKey])

  const fetchDashboard = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/universal', {
        headers: { 'X-Admin-Key': adminKey },
      })
      if (!response.ok) throw new Error('Unauthorized')
      const data = await response.json()
      setSettings(data.settings || [])
      setLogs(data.logs || [])
      setError('')
    } catch (err) {
      setError('Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleChangeKey = async () => {
    if (newKey.length < 8) {
      setNewKeyError('Key must be at least 8 characters')
      return
    }
    try {
      const response = await fetch('/api/admin/change-key', {
        method: 'POST',
        headers: {
          'X-Admin-Key': adminKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newKey }),
      })
      if (!response.ok) throw new Error('Failed to change key')
      const newAdminKey = newKey
      setAdminKey(newAdminKey)
      localStorage.setItem('adminKey', newAdminKey)
      setNewKey('')
      setNewKeyError('')
      alert('Admin key changed successfully')
    } catch (err) {
      setNewKeyError('Failed to change key')
    }
  }

  if (!adminKey) {
    return (
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Admin Authentication</h1>
        <input
          type="password"
          placeholder="Enter Admin Key"
          value={adminKey}
          onChange={(e) => {
            setAdminKey(e.target.value)
            localStorage.setItem('adminKey', e.target.value)
          }}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button onClick={() => fetchDashboard()} style={{ padding: '0.5rem 1rem' }}>
          Authenticate
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/admin" style={{ marginRight: '1rem', color: '#0066cc' }}>
          ← Back to Admin Dashboard
        </Link>
      </div>

      <h1>Universal Admin Dashboard</h1>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Change Admin Key */}
          <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <h2>Change Admin Key</h2>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="password"
                placeholder="New Admin Key"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  marginBottom: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
              {newKeyError && <div style={{ color: 'red', fontSize: '0.875rem' }}>{newKeyError}</div>}
            </div>
            <button onClick={handleChangeKey} style={{ padding: '0.5rem 1rem' }}>
              Update Key
            </button>
          </div>

          {/* Global Settings */}
          <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <h2>Global Settings</h2>
            {settings.length === 0 ? (
              <p>No settings found</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #ddd' }}>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Key</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Value</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {settings.map((setting) => (
                    <tr key={setting.key} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.5rem' }}>{setting.key}</td>
                      <td style={{ padding: '0.5rem' }}>{setting.value}</td>
                      <td style={{ padding: '0.5rem' }}>{new Date(setting.updated_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Admin Logs */}
          <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <h2>Recent Admin Logs</h2>
            {logs.length === 0 ? (
              <p>No logs found</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #ddd' }}>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>ID</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Action</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>User</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.5rem' }}>{log.id}</td>
                      <td style={{ padding: '0.5rem' }}>{log.action}</td>
                      <td style={{ padding: '0.5rem' }}>{log.user}</td>
                      <td style={{ padding: '0.5rem' }}>{new Date(log.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  )
}
