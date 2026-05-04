import express from 'express';

const router = express.Router();

/**
 * Debug endpoint to check provider configuration
 */
router.get('/providers', async (req, res) => {
  try {
    // Import the modelConstants to check what's actually loaded
    const modelConstants = await import('../../shared/modelConstants.js');
    
    res.json({
      providers: modelConstants.PROVIDERS,
      providerCount: modelConstants.PROVIDERS.length,
      providerIds: modelConstants.PROVIDERS.map(p => p.id),
      nrouter9Exists: modelConstants.PROVIDERS.some(p => p.id === 'nrouter9'),
      nrouter9Models: modelConstants.NROUTER9_MODELS,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

export default router;
