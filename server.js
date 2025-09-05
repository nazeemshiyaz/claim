const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Sample users database (in production, use a real database)
const users = [
    {
        id: 1,
        username: 'admin',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: "password"
        role: 'admin'
    },
    {
        id: 2,
        username: 'user',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: "password"
        role: 'user'
    }
];

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Routes
app.get('/', (req, res) => {
    console.log('Serving login page...');
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Redirect old index.html to login
app.get('/index.html', (req, res) => {
    res.redirect('/');
});

// Test route to verify server is working
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Protected route to get user info
app.get('/api/user', authenticateToken, (req, res) => {
    res.json({
        user: {
            id: req.user.id,
            username: req.user.username,
            role: req.user.role
        }
    });
});

// Admin-only route
app.get('/api/admin', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    res.json({ message: 'Admin access granted', users: users.map(u => ({ id: u.id, username: u.username, role: u.role })) });
});

// Serve dashboard based on role
app.get('/dashboard', (req, res) => {
    // Check if user has a valid token in localStorage (client-side check)
    // For now, serve the admin dashboard by default
    // The client-side JavaScript will handle the actual authentication
    res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});    // Serve claims system
   app.get('/claims-system.html', (req, res) => {
       res.sendFile(path.join(__dirname, 'public', 'claims-system.html'));
   });

   // Serve admin dashboard
   app.get('/admin-dashboard.html', (req, res) => {
       res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
   });

   // Serve user dashboard
   app.get('/user-dashboard.html', (req, res) => {
       res.sendFile(path.join(__dirname, 'public', 'user-dashboard.html'));
   });
