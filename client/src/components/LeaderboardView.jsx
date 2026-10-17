import React, { useState } from 'react';
import { Trophy, Award, Flame, GitCommit, GitPullRequest, Folder, ArrowUpRight } from 'lucide-react';

export default function LeaderboardView({ leaderboard, onSelectDeveloper, onTimeRangeChange, timeRange }) {
  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(202, 138, 4, 0.3))',
          color: '#fbbf24',
          border: '1px solid rgba(234, 179, 8, 0.5)',
          padding: '4px 10px',
          borderRadius: '9999px',
          fontWeight: 700,
          fontSize: '0.8rem',
        }}>
          <Trophy size={14} /> #1 Gold
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(148, 163, 184, 0.15)',
          color: '#e2e8f0',
          border: '1px solid rgba(148, 163, 184, 0.4)',
          padding: '4px 10px',
          borderRadius: '9999px',
          fontWeight: 700,
          fontSize: '0.8rem',
        }}>
          <Award size={14} /> #2 Silver
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(180, 83, 9, 0.15)',
          color: '#f97316',
          border: '1px solid rgba(180, 83, 9, 0.4)',
          padding: '4px 10px',
          borderRadius: '9999px',
          fontWeight: 700,
          fontSize: '0.8rem',
        }}>
          <Flame size={14} /> #3 Bronze
        </div>
      );
    }
    return (
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: 'var(--text-muted)',
        paddingLeft: '10px',
      }}>
        #{rank}
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trophy size={24} color="#fbbf24" />
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Top Committers Leaderboard</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Recognizing engineers driving maximum code velocity, additions, and repository contributions.
          </p>
        </div>

        {/* Time Filter Pills */}
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}>
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range)}
              style={{
                background: timeRange === range ? 'var(--accent-primary)' : 'transparent',
                color: timeRange === range ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table Card */}
      <div className="card-3d table-responsive">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
          <thead>
            <tr style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderBottom: '1px solid var(--border-subtle)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-muted)',
            }}>
              <th style={{ padding: '16px 20px' }}>Rank</th>
              <th style={{ padding: '16px 20px' }}>Engineer</th>
              <th style={{ padding: '16px 20px' }}>Commits</th>
              <th style={{ padding: '16px 20px' }}>Lines Added (+)</th>
              <th style={{ padding: '16px 20px' }}>Lines Removed (-)</th>
              <th style={{ padding: '16px 20px' }}>Active Repos</th>
              <th style={{ padding: '16px 20px' }}>Last Push</th>
              <th style={{ padding: '16px 20px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard && leaderboard.length > 0 ? (
              leaderboard.map((dev) => (
                <tr
                  key={dev.username}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {/* Rank */}
                  <td style={{ padding: '16px 20px' }}>
                    {getRankBadge(dev.rank)}
                  </td>

                  {/* Engineer */}
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={dev.avatar}
                        alt={dev.name}
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: '50%',
                          border: dev.rank === 1 ? '2px solid #fbbf24' : '2px solid rgba(255, 255, 255, 0.1)',
                          objectFit: 'cover',
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{dev.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          @{dev.username}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Commits */}
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <GitCommit size={15} color="var(--accent-primary)" />
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{dev.commits}</span>
                    </div>
                  </td>

                  {/* Lines Added */}
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      color: '#34d399',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      background: 'rgba(16, 185, 129, 0.1)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}>
                      +{dev.linesAdded.toLocaleString()}
                    </span>
                  </td>

                  {/* Lines Deleted */}
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      color: '#f87171',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      background: 'rgba(239, 68, 68, 0.1)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}>
                      -{dev.linesDeleted.toLocaleString()}
                    </span>
                  </td>

                  {/* Repos Count */}
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Folder size={14} color="var(--text-muted)" />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {dev.reposCount} repo(s)
                      </span>
                    </div>
                  </td>

                  {/* Last Push */}
                  <td style={{ padding: '16px 20px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {dev.lastCommitAt ? new Date(dev.lastCommitAt).toLocaleDateString() : 'Active recently'}
                  </td>

                  {/* Deep-Dive Action */}
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <button
                      onClick={() => onSelectDeveloper(dev.username)}
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.775rem' }}
                    >
                      Inspect Profile <ArrowUpRight size={13} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No commit activities recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
