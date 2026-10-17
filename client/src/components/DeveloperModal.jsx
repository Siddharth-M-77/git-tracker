import React, { useEffect, useState } from 'react';
import { User, GitCommit, GitBranch, Folder, Code2, ArrowUpRight, Clock, X } from 'lucide-react';
import { api } from '../services/api';

export default function DeveloperModal({ username, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    api.getDeveloperProfile(username)
      .then((res) => {
        if (res.success) setData(res);
      })
      .finally(() => setLoading(false));
  }, [username]);

  if (!username) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '28px',
          background: '#0d1220',
          border: '1px solid var(--border-hover)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${username}`}
              alt={username}
              style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid var(--accent-primary)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>@{username}</h2>
                <span className="badge badge-push" style={{ fontSize: '0.7rem' }}>Active Engineer</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Engineering Contributor Profile & Code Impact Analysis
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: 'none',
              color: 'var(--text-muted)',
              padding: '6px',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading developer telemetry...
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Commits</span>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '4px' }}>
                  {data?.stats?.totalCommits || 0}
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lines Added</span>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '4px', color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                  +{data?.stats?.totalAdditions ? data.stats.totalAdditions.toLocaleString() : 0}
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lines Removed</span>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '4px', color: '#f87171', fontFamily: 'var(--font-mono)' }}>
                  -{data?.stats?.totalDeletions ? data.stats.totalDeletions.toLocaleString() : 0}
                </div>
              </div>
            </div>

            {/* Repositories Contributed */}
            <div>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Active Repositories ({data?.stats?.repositories?.length || 0})
              </h3>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {data?.stats?.repositories?.map((r, i) => (
                  <span
                    key={i}
                    style={{
                      background: 'rgba(99, 102, 241, 0.1)',
                      color: '#a5b4fc',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.775rem',
                    }}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Commits List */}
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>
                Recent Pushed Commits
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data?.recentCommits?.slice(0, 8).map((c, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '10px 14px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{c.message}</div>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>{c.repositoryFullName}</span>
                        <span>•</span>
                        <span>{new Date(c.committedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textAlign: 'right' }}>
                      <span style={{ color: '#34d399' }}>+{c.stats?.additions}</span> / <span style={{ color: '#f87171' }}>-{c.stats?.deletions}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
