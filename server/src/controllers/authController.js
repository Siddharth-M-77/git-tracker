const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_github_tracker_jwt_key_2026_x89!', {
    expiresIn: '30d',
  });
};

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, companyName } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      companyName: companyName || 'My Tech Company',
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(name)}`,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        currentPlan: user.currentPlan,
        avatar: user.avatar,
        githubUsername: user.githubUsername,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    user.lastLogin = Date.now();
    await user.save();

    const token = generateToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        currentPlan: user.currentPlan,
        avatar: user.avatar,
        githubUsername: user.githubUsername,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Google Auth (Token verify or direct payload from frontend Google Login)
exports.googleAuth = async (req, res) => {
  try {
    const { credential, email, name, avatar, googleId } = req.body;

    let userEmail = email;
    let userName = name;
    let userAvatar = avatar;
    let userGoogleId = googleId;

    // If client sent credential token from Google Identity Services
    if (credential && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== 'your-google-client-id.apps.googleusercontent.com') {
      try {
        const ticket = await googleClient.verifyIdToken({
          idToken: credential,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        userEmail = payload.email;
        userName = payload.name;
        userAvatar = payload.picture;
        userGoogleId = payload.sub;
      } catch (err) {
        console.warn('Google verifyIdToken failed, falling back to payload values:', err.message);
      }
    }

    if (!userEmail) {
      return res.status(400).json({ success: false, message: 'Google authentication failed: Email missing' });
    }

    let user = await User.findOne({ email: userEmail });
    if (!user) {
      user = await User.create({
        name: userName || 'Google User',
        email: userEmail,
        googleId: userGoogleId,
        avatar: userAvatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(userName || 'User')}`,
        role: 'admin',
        companyName: 'My Tech Organization',
        currentPlan: 'starter',
      });
    } else {
      if (userAvatar) user.avatar = userAvatar;
      if (userGoogleId) user.googleId = userGoogleId;
      user.lastLogin = Date.now();
      await user.save();
    }

    const token = generateToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        currentPlan: user.currentPlan,
        avatar: user.avatar,
        githubUsername: user.githubUsername,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Demo Login (Instant access for evaluation)
exports.demoLogin = async (req, res) => {
  try {
    let demoUser = await User.findOne({ email: 'admin@acmecorp.dev' });
    if (!demoUser) {
      demoUser = await User.create({
        name: 'Siddharth (Tech Lead)',
        email: 'admin@acmecorp.dev',
        role: 'superadmin',
        companyName: 'Acme Technologies Pvt Ltd',
        currentPlan: 'pro',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        githubUsername: 'siddharth-lead',
      });
    }

    const token = generateToken(demoUser._id);
    res.json({
      success: true,
      token,
      user: {
        id: demoUser._id,
        name: demoUser.name,
        email: demoUser.email,
        role: demoUser.role,
        companyName: demoUser.companyName,
        currentPlan: demoUser.currentPlan,
        avatar: demoUser.avatar,
        githubUsername: demoUser.githubUsername,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Current User Profile
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update GitHub Config / Token
exports.updateGitHubConfig = async (req, res) => {
  try {
    const { githubUsername, githubAccessToken } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (githubUsername) user.githubUsername = githubUsername;
    if (githubAccessToken) user.githubAccessToken = githubAccessToken;
    await user.save();

    res.json({
      success: true,
      message: 'GitHub credentials updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        githubUsername: user.githubUsername,
        hasCustomToken: Boolean(user.githubAccessToken),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
