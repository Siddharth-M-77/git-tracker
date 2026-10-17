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
  const costSavingsPerMonth = Math.round(hoursSavedPerMonth * 45);

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
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', overflowX: 'hidden', width: '100%' }}>
      {/* 1. Interactive 3D Canvas Background */}
      <ThreeCanvasBackground />

      {/* 2. Global Navigation Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(10, 13, 20, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '12px 16px',
          width: '100%',
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          {/* Brand Logo */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                padding: '8px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 0 16px rgba(99, 102, 241, 0.5)',
              }}
            >
              <GitBranch size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.03em' }}>GitPulse</span>
                <span
                  style={{
                    fontSize: '0.6rem',
                    textTransform: 'uppercase',
                    background: 'rgba(99, 102, 241, 0.25)',
                    color: '#c7d2fe',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                  }}
                >
                  SaaS 3D
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
            <a href="#hero-preview" className="nav-link">3D Nexus</a>
            <a href="#simulator" className="nav-link">Live Push Simulator</a>
            <a href="#features" className="nav-link">Capabilities</a>
            <a href="#roi-calculator" className="nav-link">ROI Calculator</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {user ? (
              <button
                onClick={onOpenDashboard}
                className="btn-primary"
                style={{
                  fontSize: '0.825rem',
                  padding: '8px 14px',
                  boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
                  whiteSpace: 'nowrap',
                }}
              >
                <Zap size={14} /> Dashboard ({user.username || user.name})
              </button>
            ) : (
              <>
                <button
                  onClick={onOpenAuth}
                  className="btn-secondary"
                  style={{ fontSize: '0.825rem', padding: '7px 12px' }}
                >
                  Sign In
                </button>
                <button
                  onClick={onLaunchDemo}
                  className="btn-primary"
                  style={{
                    fontSize: '0.825rem',
                    padding: '8px 14px',
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.45)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Zap size={14} /> Live Demo
                </button>
              </>
            )}

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '8px',
              }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '16px',
              borderTop: '1px solid var(--border-subtle)',
              background: 'var(--bg-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginTop: '10px',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.7)',
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
                if (user) onOpenDashboard();
                else onLaunchDemo();
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
            >
              <Zap size={16} /> {user ? 'Open Dashboard' : 'Launch Live Demo Dashboard'}
            </button>
          </div>
        )}
      </header>

      {/* 3. Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(36px, 6vw, 75px) 16px 40px',
          textAlign: 'center',
          zIndex: 1,
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
          {/* Eyebrow Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(99, 102, 241, 0.12)',
              border: '1px solid rgba(99, 102, 241, 0.35)',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: 'clamp(0.72rem, 2vw, 0.85rem)',
              color: '#c7d2fe',
              fontWeight: 600,
              marginBottom: '20px',
              backdropFilter: 'blur(10px)',
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div className="pulse-dot" />
            <span className="shimmer-text" style={{ fontWeight: 700, wordBreak: 'break-word' }}>
              Next-Gen 3D Engineering Intelligence & Real-Time GitOps RBAC
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-headline"
            style={{
              fontSize: 'clamp(1.85rem, 5.2vw, 4.1rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.035em',
              marginBottom: '20px',
              wordBreak: 'break-word',
            }}
          >
            Track Every Line Pushed.{' '}
            <span className="gradient-text">Control Every Repo Access.</span>{' '}
            In Real-Time.
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(0.925rem, 2vw, 1.2rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '800px',
              margin: '0 auto 32px',
              padding: '0 8px',
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
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '32px',
            }}
          >
            <button
              onClick={user ? onOpenDashboard : onLaunchDemo}
              className="btn-primary"
              style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                padding: '12px 26px',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
              }}
            >
              <Zap size={18} /> {user ? 'Open Live Dashboard →' : 'Launch Live Demo Dashboard'}
            </button>
            <button
              onClick={onOpenAuth}
              className="btn-secondary"
              style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', padding: '11px 22px', borderRadius: '12px' }}
            >
              Sign In <ArrowRight size={16} />
            </button>
          </div>

          {/* Live System Stats Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 16px',
              background: 'rgba(15, 20, 34, 0.75)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              flexWrap: 'wrap',
              justifyContent: 'center',
              backdropFilter: 'blur(12px)',
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399' }}>
              <div className="pulse-dot" />
              <span style={{ fontWeight: 600 }}>Webhooks Active</span>
            </div>
            <span>•</span>
            <div>{metrics?.totalRepos || 4} Repos Synchronized</div>
            <span>•</span>
            <div>{metrics?.totalCommits || 60} Processed Commits</div>
            <span>•</span>
            <div>&lt; 180ms Latency</div>
          </div>
        </div>

        {/* 4. Interactive 3D Hero Showcase & Perspective View */}
        <div id="hero-preview" className="responsive-page-container" style={{ marginTop: '40px' }}>
          {/* Interactive Mode Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginBottom: '16px',
            }}
          >
            <div
              className="hero-tabs-bar"
              style={{
                background: 'rgba(15, 20, 34, 0.85)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '6px',
                backdropFilter: 'blur(16px)',
              }}
            >
              <button
                className="hero-tab-btn"
                onClick={() => setActiveHeroTab('nexus')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeHeroTab === 'nexus' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                  color: activeHeroTab === 'nexus' ? '#fff' : 'var(--text-secondary)',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                <Sparkles size={15} /> 3D GitOps Nexus
              </button>
              <button
                className="hero-tab-btn"
                onClick={() => setActiveHeroTab('stream')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeHeroTab === 'stream' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                  color: activeHeroTab === 'stream' ? '#fff' : 'var(--text-secondary)',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                <Activity size={15} /> Live Push Stream
              </button>
              <button
                className="hero-tab-btn"
                onClick={() => setActiveHeroTab('leaderboard')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeHeroTab === 'leaderboard' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                  color: activeHeroTab === 'leaderboard' ? '#fff' : 'var(--text-secondary)',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                <Trophy size={15} /> Leaderboard Podium
              </button>
              <button
                className="hero-tab-btn"
                onClick={() => setActiveHeroTab('rbac')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeHeroTab === 'rbac' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                  color: activeHeroTab === 'rbac' ? '#fff' : 'var(--text-secondary)',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                <KeyRound size={15} /> 1-Click Access Hub
              </button>
            </div>
          </div>

          {/* Main 3D Card Showcase */}
          <div
            className="card-3d"
            style={{
              padding: 'clamp(14px, 3vw, 24px)',
              textAlign: 'left',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {/* Top Browser Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '14px',
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: '16px',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    marginLeft: '8px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  gitpulse-saas-nexus • https://gitpulse.dev/telemetry
                </span>
              </div>
              <button
                onClick={onLaunchDemo}
                className="btn-primary"
                style={{ fontSize: '0.725rem', padding: '5px 10px', flexShrink: 0 }}
              >
                Launch App ↗
              </button>
            </div>

            {/* Content View 1: 3D Nexus Isometric Showcase */}
            {activeHeroTab === 'nexus' && (
              <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', width: '100%' }}>
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

                {/* Floating 3D Badges (Desktop Absolute, Mobile Responsive) */}
                <div className="hero-floating-badges-wrap">
                  <div
                    className="hero-floating-badge float-3d"
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: 'rgba(10, 14, 26, 0.88)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(99, 102, 241, 0.4)',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                    }}
                  >
                    <div style={{ fontSize: '0.68rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: 700 }}>
                      Real-Time DORA Metrics
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#34d399', marginTop: '2px' }}>
                      98.2% Build Success
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Lead Time: &lt; 4h to Prod</div>
                  </div>

                  <div
                    className="hero-floating-badge float-3d-reverse"
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: 'rgba(10, 14, 26, 0.88)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(6, 182, 212, 0.4)',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div className="pulse-dot" />
                      <span style={{ fontSize: '0.72rem', color: '#22d3ee', fontWeight: 700 }}>
                        Live Webhook Ingestion
                      </span>
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, marginTop: '2px' }}>
                      60 Commits Synced
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#34d399' }}>+8,506 / -3,159 Lines Diffed</div>
                  </div>
                </div>
              </div>
            )}

            {/* Content View 2: Real-Time Push Stream Preview */}
            {activeHeroTab === 'stream' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '8px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#a5b4fc' }}>
                    Incoming GitHub Push Events (&lt; 200ms Ingestion)
                  </div>
                  <span className="badge badge-push">Auto-refresh 15s</span>
                </div>
                {simulatedPushes.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: '1 1 240px' }}>
                      <img
                        src={p.avatar}
                        alt={p.author}
                        style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0 }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>@{p.author}</span>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.68rem',
                              background: 'rgba(99, 102, 241, 0.2)',
                              color: '#c7d2fe',
                              padding: '2px 6px',
                              borderRadius: '4px',
                            }}
                          >
                            {p.branch}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px', wordBreak: 'break-word' }}>
                          {p.message}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
                      <div style={{ fontSize: '0.8rem' }}>
                        <span style={{ color: '#34d399', fontWeight: 700 }}>+{p.added}</span> /{' '}
                        <span style={{ color: '#f87171', fontWeight: 700 }}>-{p.deleted}</span>
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{p.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Content View 3: Leaderboard Podium Preview */}
            {activeHeroTab === 'leaderboard' && (
              <div style={{ padding: '8px 0' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24', marginBottom: '14px' }}>
                  Engineering Velocity Podium (Top Committers)
                </div>
                <div className="responsive-grid-3">
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(15, 20, 34, 0.8))',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: '12px',
                      padding: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="badge badge-maintain">Rank #1 Gold</span>
                      <Trophy size={18} color="#fbbf24" />
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, marginTop: '10px' }}>Rahul Sharma</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Staff Backend Engineer</div>
                    <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span className="badge badge-push">+10,413 Lines</span>
                      <span className="badge badge-admin">60 Commits</span>
                    </div>
                  </div>

                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="badge badge-pull">Rank #2 Silver</span>
                      <Trophy size={18} color="#94a3b8" />
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, marginTop: '10px' }}>Priya Patel</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Lead Frontend Architect</div>
                    <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span className="badge badge-push">+6,840 Lines</span>
                      <span className="badge badge-pull">42 Commits</span>
                    </div>
                  </div>

                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="badge" style={{ background: 'rgba(180, 83, 9, 0.15)', color: '#fdba74' }}>
                        Rank #3 Bronze
                      </span>
                      <Trophy size={18} color="#cd7f32" />
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, marginTop: '10px' }}>Arjun Verma</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>DevOps & Security</div>
                    <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span className="badge badge-push">+4,210 Lines</span>
                      <span className="badge badge-maintain">35 Commits</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Content View 4: 1-Click Access Control Hub Preview */}
            {activeHeroTab === 'rbac' && (
              <div style={{ padding: '8px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '6px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                    GitHub Organization Collaborators & 1-Click RBAC
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Direct GitHub API Integration</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {Object.entries(simulatedRoles).map(([username, role]) => (
                    <div
                      key={username}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '10px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>@{username}</span>
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
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <select
                          value={role}
                          onChange={(e) =>
                            setSimulatedRoles({ ...simulatedRoles, [username]: e.target.value })
                          }
                          style={{
                            background: 'var(--bg-tertiary)',
                            color: '#fff',
                            border: '1px solid var(--border-subtle)',
                            padding: '4px 6px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
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
                          style={{ padding: '4px 8px', fontSize: '0.725rem' }}
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
        className="responsive-page-container"
        style={{
          paddingTop: '50px',
          paddingBottom: '50px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          className="card-3d"
          style={{
            padding: 'clamp(20px, 4vw, 36px)',
            background: 'linear-gradient(135deg, rgba(15, 20, 36, 0.9), rgba(10, 13, 24, 0.95))',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#34d399',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '4px',
                }}
              >
                <Terminal size={14} /> Interactive Sandbox
              </div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 800 }}>Simulate a Live Git Push Right Now</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '4px' }}>
                Test our real-time webhook ingestion pipeline. Click below to fire a simulated commit and watch it process!
              </p>
            </div>
            <button
              onClick={handleSimulatePush}
              disabled={isSimulating}
              className="btn-primary"
              style={{
                fontSize: '0.9rem',
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)',
                whiteSpace: 'nowrap',
              }}
            >
              <Zap size={16} className={isSimulating ? 'animate-spin' : ''} />
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
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: '1 1 240px' }}>
                  <img
                    src={push.avatar}
                    alt={push.author}
                    style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0 }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>@{push.author}</span>
                      <span
                        style={{
                          fontSize: '0.68rem',
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
                    <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '2px', wordBreak: 'break-word' }}>
                      "{push.message}"
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.825rem', flexShrink: 0 }}>
                  <span style={{ color: '#34d399', fontWeight: 700 }}>+{push.added}</span> /{' '}
                  <span style={{ color: '#f87171', fontWeight: 700 }}>-{push.deleted}</span>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{push.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Feature Matrix with Real 3D Rendered Icons */}
      <section
        id="features"
        className="responsive-page-container"
        style={{
          paddingTop: '60px',
          paddingBottom: '60px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--accent-primary)',
              fontSize: '0.825rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px',
            }}
          >
            <Sparkles size={15} /> 3D Architecture & Core Pillars
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800 }}>Engineered for Enterprise Visibility & Control</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', maxWidth: '680px', margin: '8px auto 0' }}>
            Built specifically for Engineering Directors, Tech Leads, and Security Officers who need complete GitOps transparency.
          </p>
        </div>

        {/* 3D Features Grid */}
        <div className="responsive-grid-3">
          {/* Card 1: 3D Lightning Telemetry */}
          <div className="card-3d" style={{ padding: 'clamp(20px, 3.5vw, 32px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <div className="pedestal-3d">
                <img
                  src="/assets/icon_3d_lightning.jpg"
                  alt="3D Telemetry Icon"
                  style={{ width: 56, height: 56, objectFit: 'cover' }}
                />
              </div>
              <div>
                <span className="badge badge-push">Sub-Second Webhooks</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '4px' }}>Real-Time Push Telemetry</h3>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Instant visibility into who pushed code, branch targets, commit messages, and numerical line additions/deletions diff stats. Zero polling required; updates dispatch in under 200ms.
            </p>
            <div style={{ marginTop: '18px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className="badge badge-push">+ Additions</span>
              <span className="badge badge-admin">- Deletions</span>
              <span className="badge badge-pull">Branch Tracking</span>
            </div>
          </div>

          {/* Card 2: 3D Shield RBAC Access Hub */}
          <div className="card-3d" style={{ padding: 'clamp(20px, 3.5vw, 32px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <div className="pedestal-3d">
                <img
                  src="/assets/icon_3d_shield.jpg"
                  alt="3D Security Shield Icon"
                  style={{ width: 56, height: 56, objectFit: 'cover' }}
                />
              </div>
              <div>
                <span className="badge badge-admin">SOC-2 Audited</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '4px' }}>1-Click Access Control</h3>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Centrally view and modify repository collaborator permissions across your entire organization. Grant Admin, Push, Maintain, or Pull access in 1 click with automated compliance audit records.
            </p>
            <div style={{ marginTop: '18px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className="badge badge-admin">Instant Revoke</span>
              <span className="badge badge-maintain">Role Escalation</span>
              <span className="badge badge-pull">Security Logs</span>
            </div>
          </div>

          {/* Card 3: 3D Git Cube Developer Intelligence */}
          <div className="card-3d" style={{ padding: 'clamp(20px, 3.5vw, 32px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <div className="pedestal-3d">
                <img
                  src="/assets/icon_3d_gitcube.jpg"
                  alt="3D Git Cube Icon"
                  style={{ width: 56, height: 56, objectFit: 'cover' }}
                />
              </div>
              <div>
                <span className="badge badge-maintain">Leaderboard & DORA</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '4px' }}>Engineering Velocity</h3>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Recognize top committers, identify code bottlenecks, and analyze engineering throughput with commit heatmaps and developer velocity profiles across 7, 30, and 90-day intervals.
            </p>
            <div style={{ marginTop: '18px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
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
        className="responsive-page-container"
        style={{
          paddingTop: '50px',
          paddingBottom: '50px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="card-3d" style={{ padding: 'clamp(20px, 4vw, 36px)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="badge badge-maintain">Business Impact Calculator</span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, marginTop: '8px' }}>
              Calculate Your Team's Productivity & Compliance ROI
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
              Adjust the sliders below to see how much time and money GitPulse saves your engineering team.
            </p>
          </div>

          <div className="responsive-grid-2" style={{ alignItems: 'center' }}>
            {/* Sliders Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Team Size (Developers)</label>
                  <span style={{ fontWeight: 700, color: 'var(--accent-primary)', fontSize: '1rem' }}>
                    {teamSize} devs
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Commits Pushed per Week</label>
                  <span style={{ fontWeight: 700, color: '#06b6d4', fontSize: '1rem' }}>
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
                  style={{ width: '100%', accentColor: '#06b6d4', cursor: 'pointer' }}
                />
              </div>
            </div>

            {/* Calculations Result Output */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(6, 182, 212, 0.1))',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.78rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: 700 }}>
                Estimated Monthly Savings
              </div>
              <div style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 900, color: '#ffffff', margin: '6px 0' }}>
                ~${costSavingsPerMonth.toLocaleString()}
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}> / mo</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '14px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>{hoursSavedPerMonth} hrs</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Admin Work Saved</div>
                </div>
                <div style={{ width: 1, background: 'var(--border-subtle)' }} />
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fbbf24' }}>85%</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Audit Time Slashed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Pricing Plans Section */}
      <section
        id="pricing"
        className="responsive-page-container"
        style={{
          paddingTop: '60px',
          paddingBottom: '60px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--accent-primary)',
              fontSize: '0.825rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px',
            }}
          >
            <CreditCard size={15} /> Transparent Pricing
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800 }}>Predictable Plans for Engineering Teams</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', margin: '8px auto 20px', maxWidth: '600px' }}>
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
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                border: 'none',
                background: billingCycle === 'monthly' ? 'var(--accent-primary)' : 'transparent',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                border: 'none',
                background: billingCycle === 'annual' ? 'var(--accent-primary)' : 'transparent',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Annual Billing
              <span
                style={{
                  background: '#10b981',
                  color: '#fff',
                  fontSize: '0.625rem',
                  padding: '2px 5px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                }}
              >
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="responsive-grid-3">
          {/* Plan 1: Starter */}
          <div className="card-3d" style={{ padding: 'clamp(20px, 3.5vw, 32px)', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Starter Sandbox
            </span>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, margin: '12px 0 6px' }}>
              ₹0 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ month</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Ideal for small teams wanting real-time push tracking and basic committer visibility.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem' }}>
                <Check size={15} color="#34d399" /> Up to 3 GitHub Repositories
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem' }}>
                <Check size={15} color="#34d399" /> Up to 5 Developers Tracked
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem' }}>
                <Check size={15} color="#34d399" /> Real-time Push Telemetry Stream
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem' }}>
                <Check size={15} color="#34d399" /> 7-Day Commit History
              </div>
            </div>
            <button
              onClick={onLaunchDemo}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
            >
              Start Free in Sandbox
            </button>
          </div>

          {/* Plan 2: Pro (Popular) */}
          <div
            className="card-3d glow-accent"
            style={{
              padding: 'clamp(20px, 3.5vw, 32px)',
              display: 'flex',
              flexDirection: 'column',
              borderColor: 'rgba(99, 102, 241, 0.5)',
              background: 'linear-gradient(135deg, rgba(22, 28, 52, 0.85) 0%, rgba(15, 20, 36, 0.95) 100%)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-primary)' }}>
                Pro Team Plan
              </span>
              <span className="badge badge-push">Most Popular</span>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, margin: '12px 0 6px' }}>
              ₹{billingCycle === 'annual' ? '1,599' : '1,999'}{' '}
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ month</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Complete code velocity tracking, 1-click RBAC access hub, and SOC-2 audit trails.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem' }}>
                <Check size={15} color="#34d399" /> Unlimited GitHub Repositories
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem' }}>
                <Check size={15} color="#34d399" /> Up to 25 Developers Tracked
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem' }}>
                <Check size={15} color="#34d399" /> 1-Click Access Grant & Revoke
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem' }}>
                <Check size={15} color="#34d399" /> Immutable SOC-2 Audit Logs
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem' }}>
                <Check size={15} color="#34d399" /> 90-Day Analytics & DORA Metrics
              </div>
            </div>
            <button
              onClick={onLaunchDemo}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '11px', fontSize: '0.9rem' }}
            >
              <Zap size={15} /> Launch Pro Sandbox
            </button>
          </div>

          {/* Plan 3: Enterprise */}
          <div className="card-3d" style={{ padding: 'clamp(20px, 3.5vw, 32px)', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Enterprise Scale
            </span>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, margin: '12px 0 6px' }}>
              ₹{billingCycle === 'annual' ? '7,199' : '8,999'}{' '}
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ month</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Custom compliance policies, self-hosted runner support, and dedicated SLAs.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem' }}>
                <Check size={15} color="#34d399" /> Unlimited Repos & Contributors
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem' }}>
                <Check size={15} color="#34d399" /> GitHub Enterprise Server Support
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem' }}>
                <Check size={15} color="#34d399" /> Dedicated Security Engineer & SLA
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem' }}>
                <Check size={15} color="#34d399" /> Custom Webhook Ingestion Pipelines
              </div>
            </div>
            <button
              onClick={onOpenAuth}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
            >
              Contact Enterprise Sales
            </button>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section
        id="faq"
        className="responsive-page-container"
        style={{
          paddingTop: '60px',
          paddingBottom: '60px',
          maxWidth: '860px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)', fontWeight: 800 }}>Frequently Asked Questions</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Everything you need to know about GitPulse security, permissions, and architecture.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="card-3d"
              style={{
                padding: '16px 20px',
                cursor: 'pointer',
              }}
              onClick={() => toggleFaq(idx)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{faq.q}</h4>
                {openFaq === idx ? <ChevronUp size={18} style={{ flexShrink: 0 }} /> : <ChevronDown size={18} style={{ flexShrink: 0 }} />}
              </div>
              {openFaq === idx && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginTop: '10px' }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. Global Bottom Floating Quick Switcher Dock */}
      <div className="quick-switch-dock">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none',
            border: 'none',
            color: '#a5b4fc',
            fontSize: '0.775rem',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '4px 6px',
            whiteSpace: 'nowrap',
          }}
        >
          🌐 Presentation
        </button>
        <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
        <button
          onClick={user ? onOpenDashboard : onLaunchDemo}
          className="btn-primary"
          style={{
            fontSize: '0.775rem',
            padding: '5px 12px',
            borderRadius: '9999px',
            whiteSpace: 'nowrap',
          }}
        >
          <Zap size={13} /> {user ? 'Open Dashboard →' : 'Launch Live Demo →'}
        </button>
      </div>

      {/* 11. Global Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '40px 16px 90px',
          background: 'rgba(7, 10, 18, 0.95)',
          position: 'relative',
          zIndex: 1,
          width: '100%',
        }}
      >
        <div
          className="responsive-page-container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                padding: '6px',
                borderRadius: '8px',
                color: '#fff',
              }}
            >
              <GitBranch size={16} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1rem' }}>GitPulse</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              © 2026 Acme Technologies. All rights reserved.
            </span>
          </div>

          <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', flexWrap: 'wrap' }}>
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#faq" className="nav-link">FAQ</a>
            <button
              onClick={user ? onOpenDashboard : onLaunchDemo}
              style={{ background: 'none', border: 'none', color: '#c7d2fe', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}
            >
              Live SaaS Dashboard
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
