import React from 'react';
import { GitBranch, Sparkles, LogOut, ShieldCheck, RefreshCw, Zap, Home } from 'lucide-react';

export default function Navbar({ user, onLogout, onOpenBilling, onSeedDemo, loadingSeed, onGoToLanding }) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 20px',
      background: 'rgba(15, 20, 34, 0.9)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      flexWrap: 'wrap',
      gap: '12px',
    }}>
      {/* Brand & Workspace */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          onClick={onGoToLanding}
          title="Click to view Landing Page"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 12px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            cursor: 'pointer',
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            padding: '6px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}>
            <GitBranch size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.02em' }}>GitPulse</span>
              <span style={{
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                background: 'rgba(99, 102, 241, 0.25)',
                color: '#a5b4fc',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 700,
              }}>SaaS</span>
            </div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
              {user?.companyName || 'Acme Technologies Pvt Ltd'}
            </div>
          </div>
        </div>

        {/* Back to Landing Page link */}
        <button
          onClick={onGoToLanding}
          className="btn-secondary"
          style={{ fontSize: '0.775rem', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <Home size={13} /> Landing Page
        </button>

        {/* Live System Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          padding: '4px 10px',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          color: '#34d399',
          fontWeight: 500,
        }}>
          <div className="pulse-dot" />
          <span>Webhooks Active</span>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {/* Seed Demo Data Button */}
        <button
          onClick={onSeedDemo}
          disabled={loadingSeed}
          title="Reset and seed realistic multi-developer commits and repositories"
          className="btn-secondary"
          style={{ fontSize: '0.8rem', padding: '7px 12px' }}
        >
          <RefreshCw size={14} className={loadingSeed ? 'animate-spin' : ''} />
          {loadingSeed ? 'Seeding...' : 'Seed Data'}
        </button>

        {/* Subscription Plan Badge */}
        <button
          onClick={onOpenBilling}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: user?.currentPlan === 'pro' 
              ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(234, 88, 12, 0.15))' 
              : 'rgba(99, 102, 241, 0.12)',
            border: `1px solid ${user?.currentPlan === 'pro' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(99, 102, 241, 0.3)'}`,
            padding: '6px 12px',
            borderRadius: '9999px',
            color: user?.currentPlan === 'pro' ? '#fbbf24' : '#a5b4fc',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Zap size={14} />
          <span style={{ textTransform: 'uppercase' }}>{user?.currentPlan || 'Starter'}</span>
          <span style={{ opacity: 0.6, fontSize: '0.7rem' }}>Upgrade</span>
        </button>

        {/* User Profile Pill */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(user.name)}`}
              alt={user.name}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '2px solid var(--accent-primary)',
                objectFit: 'cover',
              }}
            />
            <button
              onClick={onLogout}
              className="btn-secondary"
              style={{ padding: '6px 8px', fontSize: '0.775rem', color: 'var(--text-muted)' }}
              title="Logout"
            >
              <LogOut size={13} />
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
