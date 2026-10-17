import React, { useState } from 'react';
import { Settings, Copy, Check, Shield, Bell } from 'lucide-react';
import { api } from '../services/api';

const GithubIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export default function SettingsView({ user, onUserUpdated }) {
  const [githubUsername, setGithubUsername] = useState(user?.githubUsername || '');
  const [token, setToken] = useState('');
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const webhookUrl = `${window.location.origin}/api/webhooks/github`;

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);
    try {
      const res = await api.updateGitHubConfig({
        githubUsername,
        githubAccessToken: token || undefined,
      });
      if (res.success) {
        setFeedback({ type: 'success', text: 'GitHub configuration saved successfully!' });
        if (onUserUpdated) onUserUpdated(res.user);
      }
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Settings size={26} color="var(--accent-primary)" />
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>GitHub Organization & App Settings</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          Connect your GitHub Organization, Personal Access Token (classic/fine-grained) and Webhooks.
        </p>
      </div>

      {feedback && (
        <div style={{
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          background: feedback.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: `1px solid ${feedback.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          color: feedback.type === 'success' ? '#a7f3d0' : '#fca5a5',
          fontSize: '0.9rem',
        }}>
          {feedback.text}
        </div>
      )}

      {/* GitHub Credentials Card */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <GithubIcon size={20} color="var(--accent-primary)" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>GitHub Integration Credentials</h2>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              GitHub Org or Username
            </label>
            <input
              type="text"
              placeholder="e.g. acme-corp or your-github-handle"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Personal Access Token / GitHub App Token
            </label>
            <input
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx (Optional if using server-level token)"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Requires <code>repo</code> and <code>admin:org</code> scopes to manage collaborator permissions and push streams.
            </p>
          </div>

          <div>
            <button type="submit" disabled={saving} className="btn-primary" style={{ fontSize: '0.9rem' }}>
              {saving ? 'Saving...' : 'Save GitHub Configuration'}
            </button>
          </div>
        </form>
      </div>

      {/* GitHub Webhook Setup Guide */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <Bell size={20} color="var(--accent-cyan)" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Real-Time Push Webhook Endpoint</h2>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Add this webhook payload URL to your GitHub Repository or Organization Settings &gt; Webhooks:
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '10px 16px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
        }}>
          <span style={{ color: '#38bdf8', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {webhookUrl}
          </span>
          <button
            onClick={handleCopyWebhook}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          >
            {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <div>• <strong>Content type:</strong> <code>application/json</code></div>
          <div>• <strong>Events:</strong> Check <code>Pushes</code> and <code>Collaborator add, remove, or change</code></div>
          <div>• <strong>Secret:</strong> Matches your <code>GITHUB_WEBHOOK_SECRET</code> in backend environment</div>
        </div>
      </div>
    </div>
  );
}
