import React, { useState } from 'react';
import { Activity, GitBranch, GitCommit, Search, Filter, Clock, ExternalLink } from 'lucide-react';

export default function LivePushesView({ pushes, onSelectDeveloper }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRepo, setSelectedRepo] = useState('all');

  const filteredPushes = pushes.filter((p) => {
    const matchesSearch =
      p.pusherUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.repositoryFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.headCommitMessage && p.headCommitMessage.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRepo = selectedRepo === 'all' || p.repositoryFullName === selectedRepo;
    return matchesSearch && matchesRepo;
  });

  const uniqueRepos = Array.from(new Set(pushes.map((p) => p.repositoryFullName)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="pulse-dot" />
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Live Push Stream & Telemetry</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Auditing who is pushing code, exact timestamp, branch targets, and lines modified in real-time.
          </p>
        </div>

        {/* Search & Repo Filter */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Filter developer or commit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '0.85rem',
                outline: 'none',
                width: '180px',
              }}
            />
          </div>

          <select
            value={selectedRepo}
            onChange={(e) => setSelectedRepo(e.target.value)}
            style={{
              background: 'var(--bg-tertiary)',
              color: '#fff',
              border: '1px solid var(--border-subtle)',
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Repositories ({uniqueRepos.length})</option>
            {uniqueRepos.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stream List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredPushes && filteredPushes.length > 0 ? (
          filteredPushes.map((push, index) => (
            <div
              key={push._id || index}
              className="glass-panel"
              style={{
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              {/* Left: User & Repo Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img
                  src={push.pusherAvatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${push.pusherUsername}`}
                  alt={push.pusherUsername}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    border: '2px solid rgba(99, 102, 241, 0.4)',
                    objectFit: 'cover',
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span
                      onClick={() => onSelectDeveloper(push.pusherUsername)}
                      style={{
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: '#ffffff',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      @{push.pusherUsername}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>pushed to</span>
                    <span style={{
                      fontWeight: 600,
                      color: 'var(--accent-primary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem',
                    }}>
                      {push.repositoryFullName}
                    </span>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.775rem',
                      color: '#cbd5e1',
                    }}>
                      <GitBranch size={12} color="var(--accent-cyan)" />
                      {push.branch}
                    </div>
                  </div>

                  {/* Commit message & SHA */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '6px',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(99, 102, 241, 0.15)',
                      color: '#a5b4fc',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}>
                      {push.headCommitSha || 'commit'}
                    </span>
                    <span style={{ fontStyle: 'italic', color: '#e2e8f0' }}>
                      "{push.headCommitMessage || 'Code commit'}"
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      • {push.commitCount} commit(s)
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Lines Changed & Timestamp */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    justifyContent: 'flex-end',
                  }}>
                    <span style={{ color: '#34d399' }}>+{push.totalAdditions}</span>
                    <span style={{ color: 'var(--text-muted)' }}>/</span>
                    <span style={{ color: '#f87171' }}>-{push.totalDeletions}</span>
                  </div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    lines modified
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                }}>
                  <Clock size={13} />
                  <span>{new Date(push.pushedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No push events found matching current filter.
          </div>
        )}
      </div>
    </div>
  );
}
