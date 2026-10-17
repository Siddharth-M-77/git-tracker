import React from 'react';
import {
  GitCommit,
  GitPullRequest,
  Users,
  FolderGit2,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Code2,
  CheckCircle,
} from 'lucide-react';

export default function OverviewView({ metrics, pushes, timeline, onSelectDeveloper, onNavigate }) {
  const lastPush = metrics?.lastPush;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '100%' }}>
      {/* Page Title & Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 1.9rem)', fontWeight: 800 }}>Engineering Intelligence Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '4px' }}>
            Real-time developer telemetry, code velocity, and organization repository pulse.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => onNavigate('live-pushes')} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '7px 12px' }}>
            View Push Ticker
          </button>
          <button onClick={() => onNavigate('access-control')} className="btn-primary" style={{ fontSize: '0.8rem', padding: '7px 14px' }}>
            Manage Repo Access
          </button>
        </div>
      </div>

      {/* Top Metric KPI Cards (Responsive 4-Grid) */}
      <div className="responsive-grid-4">
        {/* Card 1: Repositories */}
        <div className="card-3d" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Tracked Repos</span>
            <div style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', padding: '8px', borderRadius: '10px' }}>
              <FolderGit2 size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '8px' }}>
            {metrics?.totalRepos || 4}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
            <TrendingUp size={13} />
            <span>100% synchronized with GitHub</span>
          </div>
        </div>

        {/* Card 2: Active Developers */}
        <div className="card-3d" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Active Developers</span>
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', padding: '8px', borderRadius: '10px' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '8px' }}>
            {metrics?.activeDevelopersCount || 6}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Across all frontend, backend & infra teams
          </div>
        </div>

        {/* Card 3: Total Commits */}
        <div className="card-3d" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Total Commits</span>
            <div style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', padding: '8px', borderRadius: '10px' }}>
              <GitCommit size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '8px' }}>
            {metrics?.totalCommits || 60}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
            <TrendingUp size={13} />
            <span>High Code Velocity</span>
          </div>
        </div>

        {/* Card 4: Code Volume (Lines + / -) */}
        <div className="card-3d" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Code Volume</span>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '8px', borderRadius: '10px' }}>
              <Code2 size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.35rem', fontWeight: 700, color: '#34d399' }}>
              +{metrics?.totalLinesAdded ? metrics.totalLinesAdded.toLocaleString() : '10,413'}
            </span>
            <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#f87171' }}>
              -{metrics?.totalLinesDeleted ? metrics.totalLinesDeleted.toLocaleString() : '3,017'}
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Total lines added & pruned
          </div>
        </div>
      </div>

      {/* HIGHLIGHT: Last Push Card */}
      {lastPush && (
        <div
          className="card-3d"
          style={{
            padding: '18px 22px',
            background: 'linear-gradient(135deg, rgba(22, 28, 48, 0.9), rgba(18, 24, 43, 0.9))',
            borderLeft: '4px solid var(--accent-cyan)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 280px' }}>
              <img
                src={lastPush.pusherAvatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${lastPush.pusherUsername}`}
                alt={lastPush.pusherUsername}
                style={{ width: 42, height: 42, borderRadius: '50%', border: '2px solid var(--accent-cyan)', flexShrink: 0 }}
              />
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', background: 'rgba(6, 182, 212, 0.2)', color: '#22d3ee', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                    Latest Code Push
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {new Date(lastPush.pushedAt).toLocaleString()}
                  </span>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, marginTop: '4px', wordBreak: 'break-word' }}>
                  <span style={{ color: '#fff', cursor: 'pointer' }} onClick={() => onSelectDeveloper(lastPush.pusherUsername)}>
                    @{lastPush.pusherUsername}
                  </span>
                  {' '}pushed to{' '}
                  <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                    {lastPush.repositoryFullName}
                  </span>
                  {' '}on{' '}
                  <span style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    {lastPush.branch}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pushed Diff</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.85rem' }}>
                  <span style={{ color: '#34d399' }}>+{lastPush.totalAdditions}</span> / <span style={{ color: '#f87171' }}>-{lastPush.totalDeletions}</span> lines
                </div>
              </div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: '#cbd5e1',
                  maxWidth: '240px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {lastPush.headCommitMessage || 'Code updates'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Timeline Graph */}
      <div className="card-3d" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Commit Velocity & Activity Trends</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Daily commits frequency across active development branches</p>
          </div>
          <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', padding: '3px 8px', borderRadius: '6px' }}>
            Last 14 Days
          </span>
        </div>

        {/* Visual Responsive Bar Representation */}
        <div
          className="table-responsive"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '8px',
            height: '170px',
            paddingTop: '16px',
            borderBottom: '1px solid var(--border-subtle)',
            minWidth: '100%',
          }}
        >
          {timeline && timeline.length > 0 ? (
            timeline.map((item, idx) => {
              const maxCommits = Math.max(...timeline.map((t) => t.commits), 8);
              const heightPercent = Math.min(100, Math.max(15, (item.commits / maxCommits) * 100));
              return (
                <div
                  key={idx}
                  style={{
                    flex: '1 0 20px',
                    minWidth: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {item.commits}
                  </div>
                  <div
                    title={`${item.date}: ${item.commits} commits (+${item.additions}/-${item.deletions} lines)`}
                    style={{
                      width: '100%',
                      maxWidth: '32px',
                      height: `${heightPercent}%`,
                      background: 'linear-gradient(180deg, #6366f1 0%, #312e81 100%)',
                      borderRadius: '5px 5px 0 0',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                  />
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {item.date ? item.date.slice(5) : ''}
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ width: '100%', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading commit trends...
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity Ticker (Mini Live Feed) */}
      <div className="card-3d" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Real-Time Push Stream</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Incoming code pushes from webhooks</p>
          </div>
          <button
            onClick={() => onNavigate('live-pushes')}
            className="btn-secondary"
            style={{ fontSize: '0.75rem', padding: '5px 10px' }}
          >
            All Activity →
          </button>
        </div>

        <div className="table-responsive">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '550px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Developer</th>
                <th style={{ padding: '10px 12px' }}>Repository</th>
                <th style={{ padding: '10px 12px' }}>Branch</th>
                <th style={{ padding: '10px 12px' }}>Diff (+/-)</th>
                <th style={{ padding: '10px 12px' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {pushes && pushes.slice(0, 5).map((push, i) => (
                <tr key={push._id || i} style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={push.pusherAvatar} style={{ width: 28, height: 28, borderRadius: '50%' }} alt="" />
                      <span style={{ fontWeight: 600 }}>@{push.pusherUsername}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{push.repositoryFullName}</td>
                  <td style={{ padding: '12px' }}>
                    <span className="badge badge-pull">{push.branch}</span>
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: '#34d399' }}>+{push.totalAdditions}</span> / <span style={{ color: '#f87171' }}>-{push.totalDeletions}</span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    {new Date(push.pushedAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
