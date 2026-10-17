import React, { useState } from 'react';
import {
  KeyRound,
  Shield,
  UserPlus,
  Trash2,
  Check,
  AlertTriangle,
  FolderGit2,
  ExternalLink,
  RefreshCw,
  Search,
} from 'lucide-react';

export default function AccessControlView({ repos, onGrantAccess, onRevokeAccess, onSyncGitHub, loadingSync }) {
  const [selectedRepoId, setSelectedRepoId] = useState(repos[0]?._id || '');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPermission, setNewPermission] = useState('push');
  const [newRoleName, setNewRoleName] = useState('Developer');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const currentRepo = repos.find((r) => r._id === selectedRepoId) || repos[0];

  const handleGrantSubmit = async (e) => {
    e.preventDefault();
    if (!newUsername.trim() || !currentRepo) return;

    setSubmitting(true);
    setFeedback(null);
    try {
      await onGrantAccess({
        repoId: currentRepo._id,
        username: newUsername.trim(),
        permission: newPermission,
        roleName: newRoleName,
      });
      setFeedback({ type: 'success', text: `Access granted to @${newUsername} for ${currentRepo.name}!` });
      setShowAddModal(false);
      setNewUsername('');
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Failed to grant access' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRevoke = async (username) => {
    if (!window.confirm(`Are you sure you want to revoke access for @${username} from ${currentRepo.name}?`)) {
      return;
    }

    try {
      await onRevokeAccess({
        repoId: currentRepo._id,
        username,
      });
      setFeedback({ type: 'success', text: `Revoked access for @${username}` });
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Failed to revoke access' });
    }
  };

  const handleQuickPermissionChange = async (username, permission) => {
    try {
      await onGrantAccess({
        repoId: currentRepo._id,
        username,
        permission,
        roleName: permission.toUpperCase(),
      });
      setFeedback({ type: 'success', text: `Updated @${username}'s role to ${permission.toUpperCase()}` });
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    }
  };

  const getBadgeClass = (permission) => {
    switch (permission?.toLowerCase()) {
      case 'admin': return 'badge badge-admin';
      case 'maintain': return 'badge badge-maintain';
      case 'push': return 'badge badge-push';
      default: return 'badge badge-pull';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Title & Sync Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <KeyRound size={26} color="var(--accent-primary)" />
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Repository Access & RBAC Hub</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Granular control to grant, modify, and revoke collaborator access across all GitHub repositories.
          </p>
        </div>

        <button
          onClick={onSyncGitHub}
          disabled={loadingSync}
          className="btn-secondary"
          style={{ fontSize: '0.85rem' }}
        >
          <RefreshCw size={15} className={loadingSync ? 'animate-spin' : ''} />
          {loadingSync ? 'Syncing GitHub...' : 'Sync GitHub Repos'}
        </button>
      </div>

      {feedback && (
        <div style={{
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          background: feedback.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: `1px solid ${feedback.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          color: feedback.type === 'success' ? '#a7f3d0' : '#fca5a5',
          fontSize: '0.9rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span>{feedback.text}</span>
          <button onClick={() => setFeedback(null)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>×</button>
        </div>
      )}

      {/* Repository Selector Grid / Dropdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
        {repos && repos.map((repo) => {
          const isSelected = (currentRepo?._id === repo._id);
          return (
            <div
              key={repo._id}
              onClick={() => setSelectedRepoId(repo._id)}
              className="glass-panel"
              style={{
                padding: '16px',
                cursor: 'pointer',
                borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-subtle)',
                background: isSelected ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-glass)',
                transform: isSelected ? 'translateY(-2px)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {repo.owner}
                </span>
                <span className={repo.isPrivate ? 'badge badge-admin' : 'badge badge-pull'} style={{ fontSize: '0.65rem' }}>
                  {repo.isPrivate ? 'Private' : 'Public'}
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: '6px', color: isSelected ? '#fff' : 'var(--text-primary)' }}>
                {repo.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                Collaborators: <strong style={{ color: '#fff' }}>{repo.collaborators?.length || 0}</strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* Collaborator Management Panel for Active Repo */}
      {currentRepo ? (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FolderGit2 size={20} color="var(--accent-cyan)" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{currentRepo.fullName}</h2>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {currentRepo.description || 'No description provided.'}
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary"
              style={{ fontSize: '0.85rem' }}
            >
              <UserPlus size={16} /> Grant New Access
            </button>
          </div>

          {/* Collaborators Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderBottom: '1px solid var(--border-subtle)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-muted)',
              }}>
                <th style={{ padding: '14px 18px' }}>Developer</th>
                <th style={{ padding: '14px 18px' }}>Current Permission</th>
                <th style={{ padding: '14px 18px' }}>Role Name</th>
                <th style={{ padding: '14px 18px' }}>Access Scope</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRepo.collaborators && currentRepo.collaborators.length > 0 ? (
                currentRepo.collaborators.map((collab, index) => (
                  <tr
                    key={index}
                    style={{ borderBottom: '1px solid var(--border-subtle)' }}
                  >
                    {/* Developer Info */}
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={collab.avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${collab.username}`}
                          alt={collab.username}
                          style={{ width: 34, height: 34, borderRadius: '50%' }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>@{collab.username}</div>
                          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>GitHub Collaborator</div>
                        </div>
                      </div>
                    </td>

                    {/* Permission Badge & Quick Selector */}
                    <td style={{ padding: '14px 18px' }}>
                      <select
                        value={collab.permission}
                        onChange={(e) => handleQuickPermissionChange(collab.username, e.target.value)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.06)',
                          color: '#fff',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-body)',
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                      >
                        <option value="admin">Admin (Full Control)</option>
                        <option value="maintain">Maintain (Manage)</option>
                        <option value="push">Push (Read & Write)</option>
                        <option value="triage">Triage (Issues & PRs)</option>
                        <option value="pull">Pull (Read Only)</option>
                      </select>
                    </td>

                    {/* Role Name */}
                    <td style={{ padding: '14px 18px' }}>
                      <span className={getBadgeClass(collab.permission)}>
                        {collab.roleName || collab.permission.toUpperCase()}
                      </span>
                    </td>

                    {/* Access Scope Description */}
                    <td style={{ padding: '14px 18px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {collab.permission === 'admin' && 'Full administrative rights, delete repo & manage webhooks'}
                      {collab.permission === 'maintain' && 'Manage repository, branches, and code reviews'}
                      {collab.permission === 'push' && 'Push code, create branches & open/merge pull requests'}
                      {collab.permission === 'triage' && 'Manage issues, discussions, and pull requests'}
                      {collab.permission === 'pull' && 'Clone and view repository contents only'}
                    </td>

                    {/* Revoke Action */}
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleRevoke(collab.username)}
                        className="btn-danger"
                        title="Revoke access immediately"
                      >
                        <Trash2 size={13} /> Revoke
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No collaborators found for this repository. Click "Grant New Access" to invite one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : null}

      {/* Grant Access Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '28px', background: '#0e1322' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={20} color="var(--accent-primary)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Grant Repository Access</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.4rem', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleGrantSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Target Repository
                </label>
                <input
                  type="text"
                  value={currentRepo?.fullName}
                  disabled
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--accent-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Developer GitHub Username *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. rahul-sharma, alex-dev"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
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
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Permission Level *
                </label>
                <select
                  value={newPermission}
                  onChange={(e) => {
                    setNewPermission(e.target.value);
                    if (e.target.value === 'admin') setNewRoleName('Tech Lead / Admin');
                    else if (e.target.value === 'maintain') setNewRoleName('Maintainer');
                    else if (e.target.value === 'push') setNewRoleName('Developer');
                    else if (e.target.value === 'pull') setNewRoleName('Intern / Viewer');
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="admin">Admin — Full read, write, configure & access control</option>
                  <option value="maintain">Maintain — Read, write, merge PRs & manage repo issues</option>
                  <option value="push">Push (Write) — Push commits, create branches & PRs</option>
                  <option value="triage">Triage — Review PRs and triage issues</option>
                  <option value="pull">Pull (Read) — Clone, fork and view code only</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Custom Role Label (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Backend Dev, Consultant"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary"
                  style={{ fontSize: '0.85rem' }}
                >
                  {submitting ? 'Granting...' : 'Confirm & Grant Access'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
