# GitPulse SaaS — Enterprise Developer Intelligence & GitHub Access Control

> **Full-Stack B2B SaaS Platform**: Track who is pushing what code, when, from where, how many lines added/deleted, top committers leaderboard, and manage repository collaborator permissions with full audit compliance.

---

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Google Auth Library, `@octokit/rest`, Razorpay SDK.
- **Frontend**: React 19 (Vite), Modern Glassmorphism CSS Design System, Lucide Icons, Google Fonts (Outfit, Inter, JetBrains Mono), Razorpay Checkout.
- **Database**: MongoDB (Local `mongodb://127.0.0.1:27017/github_tracker` or MongoDB Atlas).

---

## 🌟 Core Features Built

1. **Developer Telemetry & Push Tracker**:
   - Track who is pushing code, exact timestamp, branch targets, lines added (`+`), lines removed (`-`), and head commit message.
   - Real-time push ticker & activity timeline graph.
   - Latest push highlight card ("Last push kya hai").

2. **Top Committers Leaderboard**:
   - Ranked leaderboard with Gold (#1), Silver (#2), and Bronze (#3) badges.
   - Code velocity metrics (Lines Added, Lines Deleted, Net code, active repositories, last commit date).
   - Time filters: Last 7 Days, Last 30 Days, Last 90 Days.
   - Developer deep-dive profile modal with granular commit history.

3. **Full Repository Access & RBAC Control**:
   - 1-Click collaborator access management directly from the dashboard.
   - Granular roles: `Admin` (Full control), `Maintain`, `Push (Read & Write)`, `Triage`, `Pull (Read only)`.
   - Modify existing collaborator permission on the fly via dropdown.
   - 1-Click revoke access with immediate security audit logging.
   - Live GitHub account synchronization.

4. **Security & SOC-2 Access Audit Logs**:
   - Complete immutable audit trail of who granted, modified, or revoked repository access and when.

5. **Multi-Tenant B2B SaaS Architecture**:
   - Workspace/Organization isolation.
   - Google Sign-In + Work email & password auth + 1-Click Demo Sign-in for immediate evaluation.

6. **Razorpay Subscription & Billing**:
   - Tiered plans: **Starter** (₹0/mo), **Pro Team** (₹2,499/mo), **Enterprise** (₹8,999/mo).
   - Monthly and Yearly billing toggle (with 2 months free discount).
   - Interactive Razorpay Checkout modal with signature verification and instant plan upgrade.

---

## 🛠️ How to Run Locally

### 1. Start MongoDB
Ensure MongoDB is running locally:
```bash
brew services start mongodb-community
```

### 2. Start Backend Server
```bash
cd server
npm install
npm start
# Runs on http://localhost:5050
```

### 3. Start Frontend Client
```bash
cd client
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## 🔑 Environment Configuration (`server/.env`)

```env
PORT=5050
MONGODB_URI=mongodb://127.0.0.1:27017/github_tracker
JWT_SECRET=super_secret_github_tracker_jwt_key_2026_x89!

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub Integration
GITHUB_TOKEN=ghp_your_github_token_here
GITHUB_WEBHOOK_SECRET=github_webhook_secret_key_123

# Razorpay Subscription
RAZORPAY_KEY_ID=rzp_test_YourTestKeyId123
RAZORPAY_KEY_SECRET=YourTestKeySecret456
RAZORPAY_WEBHOOK_SECRET=razorpay_webhook_secret_789
```

---

## 📡 Webhook Setup in GitHub

1. Go to your GitHub Repository or Organization > **Settings** > **Webhooks** > **Add Webhook**.
2. **Payload URL**: `https://your-domain.com/api/webhooks/github`
3. **Content type**: `application/json`
4. **Secret**: matches your `GITHUB_WEBHOOK_SECRET`
5. **Events**: Select `Pushes` and `Collaborator add, remove, or change`.
