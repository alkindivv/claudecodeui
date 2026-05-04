import express from 'express';

const router = express.Router();

/**
 * Get 9Router configuration and available models/combos
 */
router.get('/config', async (req, res) => {
  try {
    const endpoint = process.env.NROUTER9_ENDPOINT || 'http://127.0.0.1:20128';
    
    // Fetch models and combos in parallel
    const [modelsRes, combosRes] = await Promise.allSettled([
      fetch(`${endpoint}/api/models`, { timeout: 5000 }),
      fetch(`${endpoint}/api/combos`, { timeout: 5000 }),
    ]);

    const models = modelsRes.status === 'fulfilled' 
      ? (await modelsRes.value.json()).models || []
      : [];

    const combos = combosRes.status === 'fulfilled'
      ? (await combosRes.value.json()).combos || []
      : [];

    res.json({
      endpoint,
      models,
      combos,
    });
  } catch (error) {
    console.error('[nrouter9] Failed to fetch 9Router config:', error);
    res.status(500).json({ error: 'Failed to fetch 9Router configuration' });
  }
});

/**
 * Get 9Router models only
 */
router.get('/models', async (req, res) => {
  try {
    const endpoint = process.env.NROUTER9_ENDPOINT || 'http://127.0.0.1:20128';
    const response = await fetch(`${endpoint}/api/models`, { timeout: 10000 });
    
    if (!response.ok) {
      throw new Error(`9Router returned ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('[nrouter9] Failed to fetch models:', error);
    res.status(500).json({ error: 'Failed to fetch 9Router models' });
  }
});

/**
 * Get 9Router combos only
 */
router.get('/combos', async (req, res) => {
  try {
    const endpoint = process.env.NROUTER9_ENDPOINT || 'http://127.0.0.1:20128';
    const response = await fetch(`${endpoint}/api/combos`, { timeout: 10000 });
    
    if (!response.ok) {
      throw new Error(`9Router returned ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('[nrouter9] Failed to fetch combos:', error);
    res.status(500).json({ error: 'Failed to fetch 9Router combos' });
  }
});

/**
 * Chat completions proxy to 9Router
 * This is used when the frontend wants to use 9Router directly
 */
router.post('/chat', async (req, res) => {
  try {
    const endpoint = process.env.NROUTER9_ENDPOINT || 'http://127.0.0.1:20128';
    const { model, messages, stream = false, apiKey } = req.body;

    if (!model) {
      return res.status(400).json({ error: 'model is required' });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages must be an array' });
    }

    // Forward to 9Router
    const response = await fetch(`${endpoint}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({ model, messages, stream }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    if (stream) {
      // Stream the response
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      response.body.pipe(res);
    } else {
      const data = await response.json();
      res.json(data);
    }
  } catch (error) {
    console.error('[nrouter9] Chat error:', error);
    res.status(500).json({ error: 'Failed to chat with 9Router' });
  }
});

export default router;