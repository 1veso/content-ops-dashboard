const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MOCK: In production, verify the Auth0 JWT here
const checkAuth = (req, res, next) => {
  // const token = req.headers.authorization;
  // if (!token) return res.status(401).send('Unauthorized');
  // jwt.verify(token, ...);
  next();
};

// Pipeline endpoints (Proxy to n8n)
app.get('/api/n8n/pipeline', checkAuth, async (req, res) => {
  try {
    // const response = await fetch('YOUR_N8N_WEBHOOK_URL/pipeline');
    // const data = await response.json();
    
    // MOCK DATA
    res.json({
      mined: [{ hashtag: '#sealsaltspray', views: '2.1M', score: 94 }],
      scripted: 3,
      briefReady: 1,
      filmed: 1,
      scheduled: 1
    });
  } catch (err) {
    res.status(500).json({ error: 'n8n connection failed' });
  }
});

app.post('/api/n8n/trigger', checkAuth, async (req, res) => {
  try {
    // Proxy trigger
    // await fetch('YOUR_N8N_WEBHOOK_URL/trigger', { method: 'POST', body: ... })
    res.json({ success: true, message: 'Workflow triggered in n8n' });
  } catch (err) {
    res.status(500).json({ error: 'Trigger failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`n8n Proxy server running on port ${PORT}`);
});
