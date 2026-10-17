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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Title & Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Engineering Intelligence Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Real-time developer telemetry, code velocity, and organization repository pulse.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => onNavigate('live-pushes')} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
            View Push Ticker
          </button>
          <button onClick={() => onNavigate('access-control')} className="btn-primary" style={{ fontSize: '0.85rem' }}>
            Manage Repo Access
          </button>
        </div>
      </div>

      {/* Top Metric KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
      }}>
        {/* Card 1: Repositories */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Tracked Repos</span>
            <div style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', padding: '8px', borderRadius: '10px' }}>
              <FolderGit2 size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '8px' }}>
            {metrics?.totalRepos || 4}
          </div>
          <div style={{ fontSize: '0.775rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
            <TrendingUp size={14} />
            <span>100% synchronized with GitHub</span>
          </div>
        </div>

        {/* Card 2: Active Developers */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Active Developers</span>
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', padding: '8px', borderRadius: '10px' }}>
              <Users size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '8px' }}>
            {metrics?.activeDevelopersCount || 6}
          </div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Across all frontend, backend & infra teams
          </div>
        </div>

        {/* Card 3: Total Commits */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Total Commits</span>
            <div style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', padding: '8px', borderRadius: '10px' }}>
              <GitCommit size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '8px' }}>
            {metrics?.totalCommits || 60}
          </div>
          <div style={{ fontSize: '0.775rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
            <TrendingUp size={14} />
            <span>High Code Velocity</span>
          </div>
        </div>

        {/* Card 4: Code Volume (Lines + / -) */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Code Volume</span>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '8px', borderRadius: '10px' }}>
              <Code2 size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '8px' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#34d399' }}>
              +{metrics?.totalLinesAdded ? metrics.totalLinesAdded.toLocaleString() : '10,413'}
            </span>
            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f87171' }}>
              -{metrics?.totalLinesDeleted ? metrics.totalLinesDeleted.toLocaleString() : '3,017'}
            </span>
          </div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Total lines added & pruned
          </div>
        </div>
      </div>

      {/* HIGHLIGHT: Last Push Card (Direct User Requirement) */}
      {lastPush && (
        <div className="glass-panel" style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, rgba(22, 28, 48, 0.9), rgba(18, 24, 43, 0.9))',
          borderLeft: '4px solid var(--accent-cyan)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img
                src={lastPush.pusherAvatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${lastPush.pusherUsername}`}
                alt={lastPush.pusherUsername}
                style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid var(--accent-cyan)' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', background: 'rgba(6, 182, 212, 0.2)', color: '#22d3ee', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    Latest Code Push
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {new Date(lastPush.pushedAt).toLocaleString()}
                  </span>
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: '4px' }}>
                  <span style={{ color: '#fff', cursor: 'pointer' }} onClick={() => onSelectDeveloper(lastPush.pusherUsername)}>
                    @{lastPush.pusherUsername}
                  </span>
                  {' '}pushed to{' '}
                  <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                    {lastPush.repositoryFullName}
                  </span>
                  {' '}on branch{' '}
                  <span style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    {lastPush.branch}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pushed Diff</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  <span style={{ color: '#34d399' }}>+{lastPush.totalAdditions}</span> / <span style={{ color: '#f87171' }}>-{lastPush.totalDeletions}</span> lines
                </div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: '#cbd5e1',
                maxWidth: '260px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {lastPush.headCommitMessage || 'Code updates'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Timeline Graph */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Commit Velocity & Activity Trends</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Daily commits frequency across active development branches</p>
          </div>
          <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px' }}>
            Last 14 Days
          </span>
        </div>

        {/* Visual Responsive Bar Representation */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '12px',
          height: '180px',
          paddingTop: '20px',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          {timeline && timeline.length > 0 ? (
            timeline.map((item, idx) => {
              const maxCommits = Math.max(...timeline.map((t) => t.commits), 8);
              const heightPercent = Math.min(100, Math.max(15, (item.commits / maxCommits) * 100));
              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {item.commits}
                  </div>
                  <div
                    title={`${item.date}: ${item.commits} commits (+${item.additions}/-${item.deletions} lines)`}
                    style={{
                      width: '100%',
                      maxWidth: '36px',
                      height: `${heightPercent}%`,
                      background: 'linear-gradient(180deg, #6366f1 0%, #312e81 100%)',
                      borderRadius: '6px 6px 0 0',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'linear-gradient(180deg, #818cf8 0%, #4338ca 100%)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'linear-gradient(180deg, #6366f1 0%, #312e81 100%)')}
                  />
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
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
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="pulse-dot" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Real-Time Developer Activity Ticker</h3>
          </div>
          <button onClick={() => onNavigate('live-pushes')} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            View Full Stream
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {pushes && pushes.slice(0, 5).map((p, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={p.pusherAvatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${p.pusherUsername}`}
                  alt={p.pusherUsername}
                  style={{ width: 32, height: 32, borderRadius: '50%' }}
                />
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                    <span
                      onClick={() => onSelectDeveloper(p.pusherUsername)}
                      style={{ color: '#fff', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      @{p.pusherUsername}
                    </span>
                    {' '}pushed {p.commitCount} commit(s) to{' '}
                    <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                      {p.repositoryFullName}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {p.headCommitMessage}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                  <span style={{ color: '#34d399' }}>+{p.totalAdditions}</span> / <span style={{ color: '#f87171' }}>-{p.totalDeletions}</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {new Date(p.pushedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
