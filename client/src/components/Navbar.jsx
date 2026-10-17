import React from 'react';
import { GitBranch, Sparkles, LogOut, ShieldCheck, RefreshCw, Zap, Home } from 'lucide-react';

export default function Navbar({ user, onLogout, onOpenBilling, onSeedDemo, loadingSeed, onGoToLanding }) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        background: 'rgba(15, 20, 34, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        gap: '10px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Brand & Workspace */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
        <div
          onClick={onGoToLanding}
          title="Click to view Landing Page"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 10px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              padding: '6px',
              borderRadius: '7px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <GitBranch size={16} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '-0.02em' }}>GitPulse</span>
            <span
              style={{
                fontSize: '0.6rem',
                textTransform: 'uppercase',
                background: 'rgba(99, 102, 241, 0.25)',
                color: '#a5b4fc',
                padding: '1px 5px',
                borderRadius: '4px',
                fontWeight: 700,
              }}
            >
              SaaS
            </span>
          </div>
        </div>

        {/* Back to Landing Page link */}
        <button
          onClick={onGoToLanding}
          className="btn-secondary"
          style={{
            fontSize: '0.75rem',
            padding: '5px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flexShrink: 0,
          }}
        >
          <Home size={12} /> <span className="desktop-nav">Landing Page</span>
        </button>

        {/* Live System Indicator (Hidden on extra small screens) */}
        <div
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            padding: '3px 8px',
            borderRadius: '9999px',
            fontSize: '0.725rem',
            color: '#34d399',
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          <div className="pulse-dot" />
          <span>Active</span>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {/* Seed Demo Data Button */}
        <button
          onClick={onSeedDemo}
          disabled={loadingSeed}
          title="Reset and seed realistic multi-developer commits and repositories"
          className="btn-secondary"
          style={{ fontSize: '0.75rem', padding: '5px 10px', whiteSpace: 'nowrap' }}
        >
          <RefreshCw size={13} className={loadingSeed ? 'animate-spin' : ''} />
          <span className="desktop-nav">{loadingSeed ? 'Seeding...' : 'Seed Data'}</span>
        </button>

        {/* Subscription Plan Badge */}
        <button
          onClick={onOpenBilling}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background:
              user?.currentPlan === 'pro'
                ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(234, 88, 12, 0.15))'
                : 'rgba(99, 102, 241, 0.12)',
            border: `1px solid ${
              user?.currentPlan === 'pro' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(99, 102, 241, 0.3)'
            }`,
            padding: '5px 10px',
            borderRadius: '9999px',
            color: user?.currentPlan === 'pro' ? '#fbbf24' : '#a5b4fc',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          <Zap size={13} />
          <span style={{ textTransform: 'uppercase' }}>{user?.currentPlan || 'Starter'}</span>
        </button>

        {/* User Profile Pill */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(user.name)}`}
              alt={user.name}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                border: '2px solid var(--accent-primary)',
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
            <button
              onClick={onLogout}
              className="btn-secondary"
              style={{ padding: '5px 7px', fontSize: '0.75rem', color: 'var(--text-muted)' }}
              title="Logout"
            >
              <LogOut size={12} />
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
