import React from 'react';
import {
  LayoutDashboard,
  Trophy,
  Activity,
  KeyRound,
  FileText,
  CreditCard,
  Settings,
  CheckCircle2,
} from 'lucide-react';

const GithubIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export default function Sidebar({ activeTab, setActiveTab, counts, onGoToLanding }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'leaderboard', label: 'Top Committers', icon: Trophy, badge: counts?.devs || '6' },
    { id: 'live-pushes', label: 'Live Stream', icon: Activity, badge: 'Live', isLive: true },
    { id: 'access-control', label: 'Access Control', icon: KeyRound, badge: counts?.repos || '4' },
    { id: 'audit-logs', label: 'Audit Logs', icon: FileText },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'GitHub Setup', icon: Settings },
  ];

  return (
    <aside
      className="app-sidebar"
      style={{
        width: '240px',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 12px',
        gap: '16px',
        flexShrink: 0,
        boxSizing: 'border-box',
      }}
    >
      {/* Return to Public Portal (Desktop View) */}
      <div className="desktop-nav" style={{ padding: '0 2px' }}>
        <button
          onClick={onGoToLanding}
          className="btn-secondary"
          style={{
            width: '100%',
            justifyContent: 'center',
            fontSize: '0.78rem',
            padding: '7px 10px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(139, 92, 246, 0.08))',
            borderColor: 'rgba(99, 102, 241, 0.3)',
            color: '#c7d2fe',
          }}
        >
          ← Public Landing Portal
        </button>
      </div>

      {/* Navigation Links */}
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          width: '100%',
        }}
      >
        <div
          className="desktop-nav"
          style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-muted)',
            padding: '0 10px 6px',
          }}
        >
          Intelligence & Control
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              data-active={isActive ? 'true' : 'false'}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.15))'
                  : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                textAlign: 'left',
                borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                gap: '8px',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon size={16} color={isActive ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  style={{
                    fontSize: '0.68rem',
                    padding: '2px 6px',
                    borderRadius: '9999px',
                    background: item.isLive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                    color: item.isLive ? '#34d399' : 'var(--text-secondary)',
                    fontWeight: 600,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* GitHub Org Status Card (Desktop only) */}
      <div
        className="sidebar-status-card"
        style={{
          marginTop: 'auto',
          padding: '12px',
          background: 'rgba(22, 28, 48, 0.6)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <GithubIcon size={15} color="var(--accent-primary)" />
          <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>GitHub Connected</span>
        </div>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
          Auto-syncing pushed commits & access rules with GitHub App.
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '8px',
            fontSize: '0.7rem',
            color: '#34d399',
          }}
        >
          <CheckCircle2 size={12} />
          <span>Sync Status: Real-time</span>
        </div>
      </div>
    </aside>
  );
}
