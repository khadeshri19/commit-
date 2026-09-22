// API Client with JWT Bearer Token Interceptor

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export function getToken() {
  return localStorage.getItem('commit_auth_token');
}

export function setToken(token) {
  if (token) {
    localStorage.setItem('commit_auth_token', token);
  } else {
    localStorage.removeItem('commit_auth_token');
  }
}

async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.error || data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  // --- Auth ---
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  signup: (userData) => request('/auth/signup', { method: 'POST', body: JSON.stringify(userData) }),
  getMe: () => request('/auth/me'),

  // --- Commits ---
  getCommits: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/commits${query ? `?${query}` : ''}`);
  },
  createCommit: (commitData) => request('/commits', { method: 'POST', body: JSON.stringify(commitData) }),
  updateCommit: (id, commitData) => request(`/commits/${id}`, { method: 'PUT', body: JSON.stringify(commitData) }),
  deleteCommit: (id) => request(`/commits/${id}`, { method: 'DELETE' }),
  getStreak: () => request('/commits/streak'),
  getHeatmap: () => request('/commits/heatmap'),

  // --- Striver DSA Sheet ---
  getDsaSteps: () => request('/dsa/steps'),
  toggleDsaSolved: (problemId) => request(`/dsa/toggle-solved/${problemId}`, { method: 'POST' }),
  toggleDsaFlag: (problemId) => request(`/dsa/toggle-flag/${problemId}`, { method: 'POST' }),
  updateDsaNotes: (problemId, notes) => request(`/dsa/notes/${problemId}`, { method: 'PUT', body: JSON.stringify({ notes }) }),
  getDsaStats: () => request('/dsa/stats'),

  // --- 90-Day Roadmap & LeetCode Integration ---
  getRoadmap: () => request('/roadmap'),
  toggleMilestone: (milestoneId) => request(`/roadmap/toggle-milestone/${milestoneId}`, { method: 'POST' }),
  getRoadmapPreferences: () => request('/roadmap/preferences'),
  updateRoadmapPreferences: (prefs) => request('/roadmap/preferences', { method: 'PUT', body: JSON.stringify(prefs) }),
  addCustomLeetcode: (data) => request('/roadmap/custom-leetcode', { method: 'POST', body: JSON.stringify(data) }),
  deleteCustomLeetcode: (problemId) => request(`/roadmap/custom-leetcode/${problemId}`, { method: 'DELETE' }),
  toggleCustomLeetcodeSolved: (problemId) => request(`/roadmap/custom-leetcode/toggle-solved/${problemId}`, { method: 'POST' }),
  batchAddLeetcode: (data) => request('/roadmap/batch-leetcode', { method: 'POST', body: JSON.stringify(data) }),

  // --- Resources ---
  getResources: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/resources${query ? `?${query}` : ''}`);
  },
  updateResourceStatus: (id, status) => request(`/resources/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  addResource: (resData) => request('/resources', { method: 'POST', body: JSON.stringify(resData) }),

  // --- Stats / Telemetry ---
  getOverview: () => request('/stats/overview'),
  getReadme: () => request('/stats/readme'),
};
