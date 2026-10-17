import React, { useState } from 'react';
import {
  GitBranch,
  Shield,
  Zap,
  Activity,
  Trophy,
  KeyRound,
  FileText,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Code2,
  Users,
  Lock,
  Sparkles,
  Menu,
  X,
  Play,
  RotateCcw,
  Check,
  TrendingUp,
  Clock,
  Layers,
  Server,
  Terminal,
} from 'lucide-react';
import ThreeCanvasBackground from './ThreeCanvasBackground';

export default function LandingPage({
  user,
  onOpenAuth,
  onLaunchDemo,
  onOpenDashboard,
  plans,
  metrics,
  pushes,
  leaderboard,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);
  const [activeHeroTab, setActiveHeroTab] = useState('nexus'); // 'nexus' | 'stream' | 'leaderboard' | 'rbac'

  // Interactive Live Push Simulator State
  const [simulatedPushes, setSimulatedPushes] = useState([
    {
      id: 1,
      author: 'rahul-sharma',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      branch: 'main',
      message: 'feat(auth): integrated Google OAuth 2.0 and JWT session validation',
      added: 342,
      deleted: 18,
      time: 'Just now',
      repo: 'acme-corp/payment-gateway-service',
    },
    {
      id: 2,
      author: 'priya-patel',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      branch: 'feature/razorpay-v2',
      message: 'fix(billing): automated Razorpay webhook signature verification',
      added: 128,
      deleted: 42,
      time: '2 mins ago',
      repo: 'acme-corp/client-dashboard-frontend',
    },
  ]);

  const [isSimulating, setIsSimulating] = useState(false);

  // Interactive ROI Calculator State
  const [teamSize, setTeamSize] = useState(25);
  const [commitsPerWeek, setCommitsPerWeek] = useState(120);

  // Interactive Access Control Simulator State
  const [simulatedRoles, setSimulatedRoles] = useState({
    'rahul-sharma': 'admin',
    'priya-patel': 'push',
    'arjun-verma': 'maintain',
    'sneha-reddy': 'pull',
  });

  const handleSimulatePush = () => {
    setIsSimulating(true);
    const mockAuthors = [
      { name: 'vikram-lead', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      { name: 'ananya-dev', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
      { name: 'rohit-intern', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    ];
    const mockMessages = [
      'perf(db): optimized MongoDB aggregation pipeline for commit heatmaps',
      'sec(rbac): enforced automated audit logging on collaborator revocation',
      'refactor(client): migrated state machine to reactive 3D telemetry events',
      'feat(webhooks): 99.9% uptime delivery guarantee with exponential backoff',
    ];
    const branches = ['main', 'staging', 'feature/telemetry-3d', 'release/v2.4'];

    const chosenAuthor = mockAuthors[Math.floor(Math.random() * mockAuthors.length)];
    const chosenMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
    const chosenBranch = branches[Math.floor(Math.random() * branches.length)];
    const added = Math.floor(Math.random() * 450) + 20;
    const deleted = Math.floor(Math.random() * 120) + 5;

    const newPush = {
      id: Date.now(),
      author: chosenAuthor.name,
      avatar: chosenAuthor.avatar,
      branch: chosenBranch,
      message: chosenMessage,
      added,
      deleted,
      time: 'Just now',
      repo: 'acme-corp/payment-gateway-service',
    };

    setTimeout(() => {
      setSimulatedPushes((prev) => [newPush, ...prev.slice(0, 3)]);
      setIsSimulating(false);
    }, 600);
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  // ROI Calculations
  const hoursSavedPerMonth = Math.round(teamSize * 1.8 + commitsPerWeek * 0.15);
  const costSavingsPerMonth = Math.round(hoursSavedPerMonth * 45); // Assuming $45/hr avg cost

  const faqs = [
    {
      q: 'Does GitPulse store our proprietary source code on its servers?',
      a: 'Never. GitPulse only captures lightweight Git commit metadata (commit SHAs, author identity, timestamp, branch targets, and numerical lines added/deleted diff stats) and repository collaborator roles. Your raw code never leaves GitHub.',
    },
    {
      q: 'How does 1-click access control work from the dashboard?',
      a: 'GitPulse connects to your GitHub Organization using fine-grained GitHub App permissions or an authenticated Admin Token. When you grant or revoke access from the dashboard, GitPulse invokes the GitHub REST Collaborator API in real time and simultaneously creates an immutable security audit log.',
    },
    {
      q: 'What real-time events does the push tracker capture?',
      a: 'Whenever any developer pushes code to any branch, GitHub dispatches an instant webhook to GitPulse. GitPulse parses the commits, updates the live push ticker, recalculates team velocity, and updates the Top Committers leaderboard in under 200ms.',
    },
    {
      q: 'Can multiple companies or teams use GitPulse?',
      a: 'Yes! GitPulse is built from the ground up as a multi-tenant B2B SaaS platform. Each organization has its own isolated repository workspace, role-based team members, audit logs, and subscription billing.',
    },
    {
      q: 'Which payment methods are supported for subscriptions?',
      a: 'We integrate with Razorpay, supporting Indian & International Credit/Debit cards, Net Banking, UPI (Google Pay, PhonePe, Paytm), and Corporate Cards with automatic GST invoice receipts.',
    },
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', overflowX: 'hidden' }}>
      {/* 1. Interactive 3D Canvas Background */}
      <ThreeCanvasBackground />

      {/* 2. Global Navigation Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(10, 13, 20, 0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '14px 28px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Logo */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                padding: '9px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
              }}
            >
              <GitBranch size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 800, fontSize: '1.35rem', letterSpacing: '-0.03em' }}>GitPulse</span>
                <span
                  style={{
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    background: 'rgba(99, 102, 241, 0.25)',
                    color: '#c7d2fe',
                    padding: '2px 7px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                  }}
                >
                  SaaS 3D
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Enterprise Engineering Intelligence</div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '26px' }}>
            <a href="#hero-preview" className="nav-link">3D Nexus</a>
            <a href="#simulator" className="nav-link">Live Push Simulator</a>
            <a href="#features" className="nav-link">Capabilities</a>
            <a href="#roi-calculator" className="nav-link">ROI Calculator</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {user ? (
              <button
                onClick={onOpenDashboard}
                className="btn-primary"
                style={{
                  fontSize: '0.875rem',
                  padding: '9px 18px',
                  boxShadow: '0 0 25px rgba(99, 102, 241, 0.5)',
                }}
              >
                <Zap size={16} /> Enter Dashboard (@{user.username || user.name})
              </button>
            ) : (
              <>
                <button
                  onClick={onOpenAuth}
                  className="btn-secondary"
                  style={{ fontSize: '0.875rem', padding: '8px 16px' }}
                >
                  Sign In
                </button>
                <button
                  onClick={onLaunchDemo}
                  className="btn-primary"
                  style={{
                    fontSize: '0.875rem',
                    padding: '9px 20px',
                    boxShadow: '0 0 25px rgba(99, 102, 241, 0.45)',
                  }}
                >
                  <Zap size={15} /> Launch Live Demo
                </button>
              </>
            )}

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '18px 20px',
              borderTop: '1px solid var(--border-subtle)',
              background: 'var(--bg-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              marginTop: '12px',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <a href="#hero-preview" onClick={() => setMobileMenuOpen(false)} className="nav-link">3D Nexus</a>
            <a href="#simulator" onClick={() => setMobileMenuOpen(false)} className="nav-link">Live Push Simulator</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="nav-link">Capabilities</a>
            <a href="#roi-calculator" onClick={() => setMobileMenuOpen(false)} className="nav-link">ROI Calculator</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="nav-link">Pricing</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="nav-link">FAQ</a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLaunchDemo();
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Launch Live Demo Dashboard
            </button>
          </div>
        )}
      </header>

      {/* 3. Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '80px 24px 50px',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: '1020px', margin: '0 auto' }}>
          {/* Eyebrow Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(99, 102, 241, 0.12)',
              border: '1px solid rgba(99, 102, 241, 0.35)',
              padding: '7px 20px',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              color: '#c7d2fe',
              fontWeight: 600,
              marginBottom: '26px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.2)',
            }}
          >
            <div className="pulse-dot" />
            <span className="shimmer-text" style={{ fontWeight: 700 }}>
              Next-Gen 3D Engineering Intelligence & Real-Time GitOps RBAC
            </span>
          </div>

          {/* Massive Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5.8vw, 4.3rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.035em',
              marginBottom: '24px',
            }}
          >
            Track Every Line Pushed.{' '}
            <span className="gradient-text">Control Every Repo Access.</span>{' '}
            In Real-Time.
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              maxWidth: '820px',
              margin: '0 auto 38px',
            }}
          >
            The enterprise developer telemetry platform. Monitor commits, branch diffs (+/- lines),
            and team velocity in real time, while granting and revoking repository permissions with
            1-click and automated SOC-2 compliance audit trails.
          </p>

          {/* Dual CTAs & Instant Dashboard Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '40px',
            }}
          >
            <button
              onClick={user ? onOpenDashboard : onLaunchDemo}
              className="btn-primary"
              style={{
                fontSize: '1.05rem',
                padding: '14px 32px',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4), 0 0 40px rgba(139, 92, 246, 0.25)',
              }}
            >
              <Zap size={20} /> {user ? 'Open Live Dashboard →' : 'Launch Live Demo Dashboard'}
            </button>
            <button
              onClick={onOpenAuth}
              className="btn-secondary"
              style={{ fontSize: '1.05rem', padding: '13px 26px', borderRadius: '12px' }}
            >
              Sign In with Google / Email <ArrowRight size={18} />
            </button>
          </div>

          {/* Live System Stats Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              padding: '8px 20px',
              background: 'rgba(15, 20, 34, 0.7)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              flexWrap: 'wrap',
              justifyContent: 'center',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399' }}>
              <div className="pulse-dot" />
              <span style={{ fontWeight: 600 }}>Webhooks: 100% Operational</span>
            </div>
            <span>•</span>
            <div>{metrics?.totalRepos || 4} Repositories Synchronized</div>
            <span>•</span>
            <div>{metrics?.totalCommits || 60} Processed Commits</div>
            <span>•</span>
            <div>&lt; 180ms Ingestion Latency</div>
          </div>
        </div>

        {/* 4. Interactive 3D Hero Showcase & Perspective View */}
        <div id="hero-preview" style={{ maxWidth: '1160px', margin: '50px auto 0', position: 'relative' }}>
          {/* Interactive Mode Tabs */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px',
              background: 'rgba(15, 20, 34, 0.85)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              marginBottom: '20px',
              backdropFilter: 'blur(16px)',
            }}
          >
            <button
              onClick={() => setActiveHeroTab('nexus')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                border: 'none',
                background: activeHeroTab === 'nexus' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                color: activeHeroTab === 'nexus' ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <Sparkles size={16} /> 3D GitOps Nexus
            </button>
            <button
              onClick={() => setActiveHeroTab('stream')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                border: 'none',
                background: activeHeroTab === 'stream' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                color: activeHeroTab === 'stream' ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <Activity size={16} /> Live Push Stream
            </button>
            <button
              onClick={() => setActiveHeroTab('leaderboard')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                border: 'none',
                background: activeHeroTab === 'leaderboard' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                color: activeHeroTab === 'leaderboard' ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <Trophy size={16} /> Leaderboard Podium
            </button>
            <button
              onClick={() => setActiveHeroTab('rbac')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                border: 'none',
                background: activeHeroTab === 'rbac' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                color: activeHeroTab === 'rbac' ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <KeyRound size={16} /> 1-Click Access Hub
            </button>
          </div>

          {/* Main 3D Card Showcase */}
          <div className="card-3d" style={{ padding: '24px', textAlign: 'left', minHeight: '440px' }}>
            {/* Top Browser Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
                <span
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    marginLeft: '12px',
                  }}
                >
                  gitpulse-saas-nexus • https://gitpulse.dev/acme-corp/telemetry
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={onLaunchDemo}
                  className="btn-primary"
                  style={{ fontSize: '0.75rem', padding: '5px 12px' }}
                >
                  Launch Fullscreen ↗
                </button>
              </div>
            </div>

            {/* Content View 1: 3D Nexus Isometric Showcase */}
            {activeHeroTab === 'nexus' && (
              <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden' }}>
                <img
                  src="/assets/hero_3d_nexus.jpg"
                  alt="3D GitOps Nexus Platform"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '520px',
                    objectFit: 'cover',
                    borderRadius: '14px',
                    display: 'block',
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6)',
                  }}
                />

                {/* Floating 3D Holographic Badges */}
                <div
                  className="float-3d"
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'rgba(10, 14, 26, 0.85)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(99, 102, 241, 0.4)',
                    borderRadius: '12px',
                    padding: '12px 18px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: 700 }}>
                    Real-Time DORA Metrics
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399', marginTop: '2px' }}>
                    98.2% Build Success
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lead Time: &lt; 4h to Prod</div>
                </div>

                <div
                  className="float-3d-reverse"
                  style={{
                    position: 'absolute',
                    bottom: '24px',
                    right: '24px',
                    background: 'rgba(10, 14, 26, 0.85)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    borderRadius: '12px',
                    padding: '12px 18px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="pulse-dot" />
                    <span style={{ fontSize: '0.75rem', color: '#22d3ee', fontWeight: 700 }}>
                      Live GitHub Webhook Stream
                    </span>
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '4px' }}>
                    60 Commits Synchronized
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#34d399' }}>+8,506 / -3,159 Lines Diffed</div>
                </div>
              </div>
            )}

            {/* Content View 2: Real-Time Push Stream Preview */}
            {activeHeroTab === 'stream' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '10px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#a5b4fc' }}>
                    Incoming GitHub Push Events (Sub-second Ingestion)
                  </div>
                  <span className="badge badge-push">Auto-refresh 15s</span>
                </div>
                {simulatedPushes.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '14px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={p.avatar}
                        alt={p.author}
                        style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid var(--accent-primary)' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>@{p.author}</span>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.72rem',
                              background: 'rgba(99, 102, 241, 0.2)',
                              color: '#c7d2fe',
                              padding: '2px 8px',
                              borderRadius: '4px',
                            }}
                          >
                            {p.branch}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {p.message}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                      <div>
                        <span style={{ color: '#34d399', fontWeight: 700 }}>+{p.added}</span> /{' '}
                        <span style={{ color: '#f87171', fontWeight: 700 }}>-{p.deleted}</span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Content View 3: Leaderboard Podium Preview */}
            {activeHeroTab === 'leaderboard' && (
              <div style={{ padding: '10px 0' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fbbf24', marginBottom: '16px' }}>
                  Engineering Velocity Podium (Top Committers)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(15, 20, 34, 0.8))',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: '12px',
                      padding: '18px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="badge badge-maintain">Rank #1 Gold</span>
                      <Trophy size={20} color="#fbbf24" />
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '12px' }}>Rahul Sharma</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Staff Backend Engineer</div>
                    <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                      <span className="badge badge-push">+10,413 Lines</span>
                      <span className="badge badge-admin">60 Commits</span>
                    </div>
                  </div>

                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '18px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="badge badge-pull">Rank #2 Silver</span>
                      <Trophy size={18} color="#94a3b8" />
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '12px' }}>Priya Patel</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lead Frontend Architect</div>
                    <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                      <span className="badge badge-push">+6,840 Lines</span>
                      <span className="badge badge-pull">42 Commits</span>
                    </div>
                  </div>

                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '18px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="badge" style={{ background: 'rgba(180, 83, 9, 0.15)', color: '#fdba74' }}>
                        Rank #3 Bronze
                      </span>
                      <Trophy size={18} color="#cd7f32" />
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '12px' }}>Arjun Verma</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>DevOps & Security</div>
                    <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                      <span className="badge badge-push">+4,210 Lines</span>
                      <span className="badge badge-maintain">35 Commits</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Content View 4: 1-Click Access Control Hub Preview */}
            {activeHeroTab === 'rbac' && (
              <div style={{ padding: '10px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                    GitHub Organization Collaborators & 1-Click RBAC
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Direct GitHub API Integration</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {Object.entries(simulatedRoles).map(([username, role]) => (
                    <div
                      key={username}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '10px',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>@{username}</span>
                        <span
                          className={`badge ${
                            role === 'admin'
                              ? 'badge-admin'
                              : role === 'push'
                              ? 'badge-push'
                              : role === 'maintain'
                              ? 'badge-maintain'
                              : 'badge-pull'
                          }`}
                        >
                          {role.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <select
                          value={role}
                          onChange={(e) =>
                            setSimulatedRoles({ ...simulatedRoles, [username]: e.target.value })
                          }
                          style={{
                            background: 'var(--bg-tertiary)',
                            color: '#fff',
                            border: '1px solid var(--border-subtle)',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                          }}
                        >
                          <option value="admin">Admin</option>
                          <option value="push">Push (Write)</option>
                          <option value="maintain">Maintain</option>
                          <option value="pull">Pull (Read)</option>
                        </select>
                        <button
                          onClick={() => {
                            const newRoles = { ...simulatedRoles };
                            delete newRoles[username];
                            setSimulatedRoles(newRoles);
                          }}
                          className="btn-danger"
                          style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                        >
                          Revoke
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Interactive Live Push Simulator ("Test Drive in 1-Click") */}
      <section
        id="simulator"
        style={{
          padding: '70px 24px',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="card-3d" style={{ padding: '36px', background: 'linear-gradient(135deg, rgba(15, 20, 36, 0.9), rgba(10, 13, 24, 0.95))' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
              marginBottom: '28px',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#34d399',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '6px',
                }}
              >
                <Terminal size={14} /> Interactive Sandbox
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Simulate a Live Git Push Right Now</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                Test our real-time webhook ingestion pipeline. Click below to fire a simulated commit and watch it process!
              </p>
            </div>
            <button
              onClick={handleSimulatePush}
              disabled={isSimulating}
              className="btn-primary"
              style={{
                fontSize: '0.95rem',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)',
              }}
            >
              <Zap size={18} className={isSimulating ? 'animate-spin' : ''} />
              {isSimulating ? 'Processing Webhook...' : '⚡ Push Simulated Commit to main'}
            </button>
          </div>

          {/* Push Ticker Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {simulatedPushes.map((push) => (
              <div
                key={push.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={push.avatar}
                    alt={push.author}
                    style={{ width: 36, height: 36, borderRadius: '50%' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>@{push.author}</span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)',
                          background: 'rgba(6, 182, 212, 0.15)',
                          color: '#22d3ee',
                          padding: '2px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        {push.branch}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '2px' }}>
                      "{push.message}"
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                  <span style={{ color: '#34d399', fontWeight: 700 }}>+{push.added}</span> /{' '}
                  <span style={{ color: '#f87171', fontWeight: 700 }}>-{push.deleted}</span>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{push.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Feature Matrix with Real 3D Rendered Icons */}
      <section
        id="features"
        style={{
          padding: '80px 24px',
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '55px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--accent-primary)',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px',
            }}
          >
            <Sparkles size={16} /> 3D Architecture & Core Pillars
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Engineered for Enterprise Visibility & Control</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '680px', margin: '8px auto 0' }}>
            Built specifically for Engineering Directors, Tech Leads, and Security Officers who need complete GitOps transparency.
          </p>
        </div>

        {/* 3D Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
          {/* Card 1: 3D Lightning Telemetry */}
          <div className="card-3d" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div className="pedestal-3d">
                <img
                  src="/assets/icon_3d_lightning.jpg"
                  alt="3D Telemetry Icon"
                  style={{ width: 68, height: 68, objectFit: 'cover' }}
                />
              </div>
              <div>
                <span className="badge badge-push">Sub-Second Webhooks</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '4px' }}>Real-Time Push Telemetry</h3>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
              Instant visibility into who pushed code, branch targets, commit messages, and numerical line additions/deletions diff stats. Zero polling required; updates dispatch in under 200ms.
            </p>
            <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-push">+ Additions</span>
              <span className="badge badge-admin">- Deletions</span>
              <span className="badge badge-pull">Branch Tracking</span>
            </div>
          </div>

          {/* Card 2: 3D Shield RBAC Access Hub */}
          <div className="card-3d" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div className="pedestal-3d">
                <img
                  src="/assets/icon_3d_shield.jpg"
                  alt="3D Security Shield Icon"
                  style={{ width: 68, height: 68, objectFit: 'cover' }}
                />
              </div>
              <div>
                <span className="badge badge-admin">SOC-2 Audited</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '4px' }}>1-Click Access Control</h3>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
              Centrally view and modify repository collaborator permissions across your entire organization. Grant Admin, Push, Maintain, or Pull access in 1 click with automated compliance audit records.
            </p>
            <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-admin">Instant Revoke</span>
              <span className="badge badge-maintain">Role Escalation</span>
              <span className="badge badge-pull">Security Logs</span>
            </div>
          </div>

          {/* Card 3: 3D Git Cube Developer Intelligence */}
          <div className="card-3d" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div className="pedestal-3d">
                <img
                  src="/assets/icon_3d_gitcube.jpg"
                  alt="3D Git Cube Icon"
                  style={{ width: 68, height: 68, objectFit: 'cover' }}
                />
              </div>
              <div>
                <span className="badge badge-maintain">Leaderboard & DORA</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '4px' }}>Engineering Velocity</h3>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
              Recognize top committers, identify code bottlenecks, and analyze engineering throughput with commit heatmaps and developer velocity profiles across 7, 30, and 90-day intervals.
            </p>
            <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-maintain">Gold / Silver / Bronze</span>
              <span className="badge badge-push">Lines Heatmap</span>
              <span className="badge badge-pull">Dev Profiles</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive ROI & Engineering Hours Calculator */}
      <section
        id="roi-calculator"
        style={{
          padding: '70px 24px',
          maxWidth: '1160px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="card-3d" style={{ padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="badge badge-maintain">Business Impact Calculator</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '10px' }}>
              Calculate Your Team's Productivity & Compliance ROI
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Adjust the sliders below to see how much time and money GitPulse saves your engineering team.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '36px', alignItems: 'center' }}>
            {/* Sliders Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Team Size (Developers)</label>
                  <span style={{ fontWeight: 700, color: 'var(--accent-primary)', fontSize: '1.1rem' }}>
                    {teamSize} devs
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Commits Pushed per Week</label>
                  <span style={{ fontWeight: 700, color: '#06b6d4', fontSize: '1.1rem' }}>
                    {commitsPerWeek} commits
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="600"
                  step="10"
                  value={commitsPerWeek}
                  onChange={(e) => setCommitsPerWeek(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#06b6d4' }}
                />
              </div>
            </div>

            {/* Calculations Result Output */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(6, 182, 212, 0.1))',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '16px',
                padding: '28px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.85rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: 700 }}>
                Estimated Monthly Savings
              </div>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#ffffff', margin: '8px 0' }}>
                ~${costSavingsPerMonth.toLocaleString()}
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}> / month</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '16px' }}>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399' }}>{hoursSavedPerMonth} hrs</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Admin Work Saved</div>
                </div>
                <div style={{ width: 1, background: 'var(--border-subtle)' }} />
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fbbf24' }}>85%</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Audit Time Slashed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Pricing Plans Section */}
      <section
        id="pricing"
        style={{
          padding: '80px 24px',
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--accent-primary)',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px',
            }}
          >
            <CreditCard size={16} /> Transparent Pricing
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Predictable Plans for Engineering Teams</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '8px auto 24px', maxWidth: '600px' }}>
            Get started for free in our sandbox or upgrade for unlimited repositories and automated RBAC.
          </p>

          {/* Monthly / Annual Toggle */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '4px',
              borderRadius: '9999px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '6px 16px',
                borderRadius: '9999px',
                border: 'none',
                background: billingCycle === 'monthly' ? 'var(--accent-primary)' : 'transparent',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              style={{
                padding: '6px 16px',
                borderRadius: '9999px',
                border: 'none',
                background: billingCycle === 'annual' ? 'var(--accent-primary)' : 'transparent',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              Annual Billing
              <span
                style={{
                  background: '#10b981',
                  color: '#fff',
                  fontSize: '0.65rem',
                  padding: '2px 6px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                }}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {/* Plan 1: Starter */}
          <div className="card-3d" style={{ padding: '36px', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Starter Sandbox
            </span>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, margin: '14px 0 8px' }}>
              ₹0 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ month</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '24px' }}>
              Ideal for small teams wanting real-time push tracking and basic committer visibility.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Check size={16} color="#34d399" /> Up to 3 GitHub Repositories
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Check size={16} color="#34d399" /> Up to 5 Developers Tracked
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Check size={16} color="#34d399" /> Real-time Push Telemetry Stream
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Check size={16} color="#34d399" /> 7-Day Commit History
              </div>
            </div>
            <button
              onClick={onLaunchDemo}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              Start Free in Sandbox
            </button>
          </div>

          {/* Plan 2: Pro (Popular) */}
          <div
            className="card-3d glow-accent"
            style={{
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              borderColor: 'rgba(99, 102, 241, 0.5)',
              background: 'linear-gradient(135deg, rgba(22, 28, 52, 0.85) 0%, rgba(15, 20, 36, 0.95) 100%)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-primary)' }}>
                Pro Team Plan
              </span>
              <span className="badge badge-push">Most Popular</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, margin: '14px 0 8px' }}>
              ₹{billingCycle === 'annual' ? '1,599' : '1,999'}{' '}
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ month</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '24px' }}>
              Complete code velocity tracking, 1-click RBAC access hub, and SOC-2 audit trails.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Check size={16} color="#34d399" /> Unlimited GitHub Repositories
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Check size={16} color="#34d399" /> Up to 25 Developers Tracked
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Check size={16} color="#34d399" /> 1-Click Access Grant & Revoke
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Check size={16} color="#34d399" /> Immutable SOC-2 Compliance Audit Logs
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Check size={16} color="#34d399" /> 90-Day Velocity Analytics & DORA Metrics
              </div>
            </div>
            <button
              onClick={onLaunchDemo}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}
            >
              <Zap size={16} /> Launch Pro Sandbox
            </button>
          </div>

          {/* Plan 3: Enterprise */}
          <div className="card-3d" style={{ padding: '36px', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Enterprise Scale
            </span>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, margin: '14px 0 8px' }}>
              ₹{billingCycle === 'annual' ? '7,199' : '8,999'}{' '}
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ month</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '24px' }}>
              Custom compliance policies, self-hosted runner support, and dedicated SLAs.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Check size={16} color="#34d399" /> Unlimited Repos & Contributors
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Check size={16} color="#34d399" /> GitHub Enterprise Server & Cloud Support
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Check size={16} color="#34d399" /> Dedicated Security Engineer & Custom SLA
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Check size={16} color="#34d399" /> Custom Webhook Ingestion Pipelines
              </div>
            </div>
            <button
              onClick={onOpenAuth}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              Contact Enterprise Sales
            </button>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section
        id="faq"
        style={{
          padding: '80px 24px',
          maxWidth: '860px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Frequently Asked Questions</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '6px' }}>
            Everything you need to know about GitPulse security, permissions, and architecture.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="card-3d"
              style={{
                padding: '20px 24px',
                cursor: 'pointer',
              }}
              onClick={() => toggleFaq(idx)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{faq.q}</h4>
                {openFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {openFaq === idx && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '12px' }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. Global Bottom Floating Quick Switcher Dock */}
      <div className="quick-switch-dock">
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Navigation:</span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none',
            border: 'none',
            color: '#a5b4fc',
            fontSize: '0.825rem',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '4px 8px',
          }}
        >
          🌐 Presentation Portal
        </button>
        <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
        <button
          onClick={user ? onOpenDashboard : onLaunchDemo}
          className="btn-primary"
          style={{
            fontSize: '0.825rem',
            padding: '6px 14px',
            borderRadius: '9999px',
          }}
        >
          <Zap size={14} /> {user ? 'Open Dashboard →' : 'Launch Live Demo Dashboard →'}
        </button>
      </div>

      {/* 11. Global Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '60px 24px 100px',
          background: 'rgba(7, 10, 18, 0.95)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                padding: '6px',
                borderRadius: '8px',
                color: '#fff',
              }}
            >
              <GitBranch size={18} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>GitPulse</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              © 2026 Acme Technologies. All rights reserved.
            </span>
          </div>

          <div style={{ display: 'flex', gap: '24px', fontSize: '0.85rem' }}>
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#faq" className="nav-link">FAQ</a>
            <button
              onClick={user ? onOpenDashboard : onLaunchDemo}
              style={{ background: 'none', border: 'none', color: '#c7d2fe', cursor: 'pointer', fontWeight: 600 }}
            >
              Live SaaS Dashboard
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
