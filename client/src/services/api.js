const API_BASE = 'http://localhost:5050/api';

const getHeaders = () => {
  const token = localStorage.getItem('gitpulse_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Auth
  login: async (credentials) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  register: async (data) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  googleAuth: async (googleData) => {
    const res = await fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(googleData),
    });
    return res.json();
  },

  demoLogin: async () => {
    const res = await fetch(`${API_BASE}/auth/demo-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  updateGitHubConfig: async (config) => {
    const res = await fetch(`${API_BASE}/auth/github-config`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(config),
    });
    return res.json();
  },

  // Analytics
  getMetrics: async () => {
    const res = await fetch(`${API_BASE}/analytics/metrics`, { headers: getHeaders() });
    return res.json();
  },

  getTopCommitters: async (timeRange = '30d') => {
    const res = await fetch(`${API_BASE}/analytics/top-committers?timeRange=${timeRange}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  getActivityTimeline: async (days = 14) => {
    const res = await fetch(`${API_BASE}/analytics/activity-timeline?days=${days}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  getLivePushes: async (limit = 25) => {
    const res = await fetch(`${API_BASE}/analytics/live-pushes?limit=${limit}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  getDeveloperProfile: async (username) => {
    const res = await fetch(`${API_BASE}/analytics/developer/${username}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  seedDemo: async () => {
    const res = await fetch(`${API_BASE}/analytics/seed-demo`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Access Control
  getRepos: async () => {
    const res = await fetch(`${API_BASE}/access/repos`, { headers: getHeaders() });
    return res.json();
  },

  getRepoCollaborators: async (repoId) => {
    const res = await fetch(`${API_BASE}/access/repos/${repoId}/collaborators`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  grantAccess: async (data) => {
    const res = await fetch(`${API_BASE}/access/grant`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  revokeAccess: async (data) => {
    const res = await fetch(`${API_BASE}/access/revoke`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getAuditLogs: async () => {
    const res = await fetch(`${API_BASE}/access/audit-logs`, { headers: getHeaders() });
    return res.json();
  },

  syncGitHubRepos: async (token) => {
    const res = await fetch(`${API_BASE}/access/sync-github`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ token }),
    });
    return res.json();
  },

  // Billing (Razorpay)
  getPlans: async () => {
    const res = await fetch(`${API_BASE}/billing/plans`, { headers: getHeaders() });
    return res.json();
  },

  createOrder: async (planId, billingCycle = 'monthly') => {
    const res = await fetch(`${API_BASE}/billing/create-order`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ planId, billingCycle }),
    });
    return res.json();
  },

  verifyPayment: async (paymentData) => {
    const res = await fetch(`${API_BASE}/billing/verify-payment`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(paymentData),
    });
    return res.json();
  },
};
