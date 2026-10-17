import React from 'react';
import { FileText, ShieldAlert, CheckCircle, Clock } from 'lucide-react';

export default function AuditLogsView({ auditLogs }) {
  const getActionBadge = (action) => {
    switch (action) {
      case 'INVITED':
        return <span className="badge badge-push">INVITED</span>;
      case 'ROLE_CHANGED':
        return <span className="badge badge-maintain">ROLE CHANGED</span>;
      case 'REMOVED':
        return <span className="badge badge-admin">REMOVED</span>;
      default:
        return <span className="badge badge-pull">{action}</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FileText size={26} color="var(--accent-primary)" />
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Access Security Audit Trail</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          Immutable record of every permission grant, revocation, and role change for SOC-2 and ISO-27001 compliance.
        </p>
      </div>

      <div className="glass-panel" style={{ overflow: 'hidden' }}>
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
              <th style={{ padding: '16px 20px' }}>Timestamp</th>
              <th style={{ padding: '16px 20px' }}>Action</th>
              <th style={{ padding: '16px 20px' }}>Developer</th>
              <th style={{ padding: '16px 20px' }}>Repository</th>
              <th style={{ padding: '16px 20px' }}>Permission</th>
              <th style={{ padding: '16px 20px' }}>Admin (Performed By)</th>
              <th style={{ padding: '16px 20px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs && auditLogs.length > 0 ? (
              auditLogs.map((log) => (
                <tr key={log._id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '16px 20px', fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={13} />
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    {getActionBadge(log.action)}
                  </td>
                  <td style={{ padding: '16px 20px', fontWeight: 600 }}>
                    @{log.targetUsername}
                  </td>
                  <td style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-primary)' }}>
                    {log.repositoryFullName}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      textTransform: 'uppercase',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(255, 255, 255, 0.06)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}>
                      {log.permissionLevel}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {log.performedBy}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#34d399', fontSize: '0.8rem' }}>
                      <CheckCircle size={14} /> Success
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No access audit events recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
