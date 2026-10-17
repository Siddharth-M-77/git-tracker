import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import OverviewView from './components/OverviewView';
import LeaderboardView from './components/LeaderboardView';
import LivePushesView from './components/LivePushesView';
import AccessControlView from './components/AccessControlView';
import AuditLogsView from './components/AuditLogsView';
import BillingView from './components/BillingView';
import SettingsView from './components/SettingsView';
import AuthModal from './components/AuthModal';
import DeveloperModal from './components/DeveloperModal';
import LandingPage from './components/LandingPage';
import { api } from './services/api';

export default function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'dashboard'
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Core Data States
  const [metrics, setMetrics] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [pushes, setPushes] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [repos, setRepos] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [plans, setPlans] = useState([]);

  // UI state
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [loadingSeed, setLoadingSeed] = useState(false);
  const [loadingSync, setLoadingSync] = useState(false);

  // Check auth on load (Always default to landing page as requested by user)
  useEffect(() => {
    const token = localStorage.getItem('gitpulse_token');
    const urlParams = new URLSearchParams(window.location.search);
    const requestedView = urlParams.get('view');

    if (token) {
      api.getMe()
        .then((res) => {
          if (res.success) {
            setUser(res.user);
            if (requestedView === 'dashboard') {
              setViewMode('dashboard');
            } else {
              setViewMode('landing');
            }
          } else {
            localStorage.removeItem('gitpulse_token');
          }
        })
        .catch(() => localStorage.removeItem('gitpulse_token'))
        .finally(() => setAuthChecked(true));
    } else {
      setAuthChecked(true);
    }
  }, []);

  // Fetch dashboard data
  const refreshAllData = async () => {
    try {
      const [
        metricsRes,
        leaderboardRes,
        pushesRes,
        timelineRes,
        reposRes,
        auditRes,
        plansRes,
      ] = await Promise.all([
        api.getMetrics(),
        api.getTopCommitters(timeRange),
        api.getLivePushes(30),
        api.getActivityTimeline(14),
        api.getRepos(),
        api.getAuditLogs(),
        api.getPlans(),
      ]);

      if (metricsRes.success) setMetrics(metricsRes.metrics);
      if (leaderboardRes.success) setLeaderboard(leaderboardRes.leaderboard);
      if (pushesRes.success) setPushes(pushesRes.pushes);
      if (timelineRes.success) setTimeline(timelineRes.timeline);
      if (reposRes.success) setRepos(reposRes.repositories);
      if (auditRes.success) setAuditLogs(auditRes.logs);
      if (plansRes.success) setPlans(plansRes.plans);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    }
  };

  useEffect(() => {
    refreshAllData();
    // Auto-refresh live pushes & metrics every 15s
    const interval = setInterval(() => {
      api.getLivePushes(25).then((res) => {
        if (res.success) setPushes(res.pushes);
      });
      api.getMetrics().then((res) => {
        if (res.success) setMetrics(res.metrics);
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [timeRange]);

  const handleInstantDemo = async () => {
    try {
      const res = await api.demoLogin();
      if (res.success) {
        localStorage.setItem('gitpulse_token', res.token);
        setUser(res.user);
        setViewMode('dashboard');
        await refreshAllData();
      }
    } catch (err) {
      console.error('Demo login error:', err);
      // Fallback: switch to dashboard anyway
      setViewMode('dashboard');
    }
  };

  const handleSeedDemo = async () => {
    setLoadingSeed(true);
    try {
      await api.seedDemo();
      await refreshAllData();
    } catch (err) {
      console.error('Failed to seed demo data:', err);
    } finally {
      setLoadingSeed(false);
    }
  };

  const handleGrantAccess = async (grantData) => {
    const res = await api.grantAccess(grantData);
    if (res.success) {
      await refreshAllData();
    }
    return res;
  };

  const handleRevokeAccess = async (revokeData) => {
    const res = await api.revokeAccess(revokeData);
    if (res.success) {
      await refreshAllData();
    }
    return res;
  };

  const handleSyncGitHub = async () => {
    setLoadingSync(true);
    try {
      await api.syncGitHubRepos();
      await refreshAllData();
    } catch (err) {
      alert(err.message || 'Please configure your GitHub Token in Settings');
    } finally {
      setLoadingSync(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('gitpulse_token');
    setUser(null);
    setViewMode('landing');
  };

  if (!authChecked) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Initializing GitPulse SaaS Engine...</div>
      </div>
    );
  }

  // 1. Landing Page View Mode
  if (viewMode === 'landing') {
    return (
      <>
        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onLoginSuccess={(u) => {
              setUser(u);
              setShowAuthModal(false);
              setViewMode('dashboard');
              refreshAllData();
            }}
          />
        )}
        <LandingPage
          user={user}
          onOpenAuth={() => setShowAuthModal(true)}
          onLaunchDemo={handleInstantDemo}
          onOpenDashboard={() => setViewMode('dashboard')}
          plans={plans}
          metrics={metrics}
          pushes={pushes}
          leaderboard={leaderboard}
        />
      </>
    );
  }

  // 2. Full Dashboard View Mode
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Auth Modal if unauthenticated */}
      {!user && (
        <AuthModal
          onClose={() => setViewMode('landing')}
          onLoginSuccess={(u) => { setUser(u); refreshAllData(); }}
        />
      )}

      {/* Developer Profile Deep-Dive Modal */}
      {selectedDeveloper && (
        <DeveloperModal
          username={selectedDeveloper}
          onClose={() => setSelectedDeveloper(null)}
        />
      )}

      {/* Top Navbar */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        onOpenBilling={() => setActiveTab('billing')}
        onSeedDemo={handleSeedDemo}
        loadingSeed={loadingSeed}
        onGoToLanding={() => setViewMode('landing')}
      />

      {/* Main Body with Responsive Containers */}
      <div className="app-container" style={{ display: 'flex', flex: 1 }}>
        {/* Left Sidebar */}
        <div className="app-sidebar">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            counts={{ repos: repos.length, devs: leaderboard.length }}
            onGoToLanding={() => setViewMode('landing')}
          />
        </div>

        {/* View Content Area */}
        <main className="main-content" style={{ flex: 1, padding: '32px 36px', overflowY: 'auto', maxWidth: '1440px', width: '100%' }}>
          {activeTab === 'overview' && (
            <OverviewView
              metrics={metrics}
              pushes={pushes}
              timeline={timeline}
              onSelectDeveloper={setSelectedDeveloper}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'leaderboard' && (
            <LeaderboardView
              leaderboard={leaderboard}
              onSelectDeveloper={setSelectedDeveloper}
              onTimeRangeChange={setTimeRange}
              timeRange={timeRange}
            />
          )}

          {activeTab === 'live-pushes' && (
            <LivePushesView
              pushes={pushes}
              onSelectDeveloper={setSelectedDeveloper}
            />
          )}

          {activeTab === 'access-control' && (
            <AccessControlView
              repos={repos}
              onGrantAccess={handleGrantAccess}
              onRevokeAccess={handleRevokeAccess}
              onSyncGitHub={handleSyncGitHub}
              loadingSync={loadingSync}
            />
          )}

          {activeTab === 'audit-logs' && (
            <AuditLogsView auditLogs={auditLogs} />
          )}

          {activeTab === 'billing' && (
            <BillingView
              user={user}
              plans={plans}
              onPlanUpdated={(newPlan) => setUser({ ...user, currentPlan: newPlan })}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              user={user}
              onUserUpdated={(u) => setUser({ ...user, ...u })}
            />
          )}
        </main>
      </div>
    </div>
  );
}
