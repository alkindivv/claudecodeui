import { useState, useEffect, useCallback } from 'react';
import { api } from '@/utils/api.js';

/**
 * Hook to fetch and cache 9Router models and combos
 * 
 * Usage:
 *   const { models, combos, loading, error, refetch } = useNrouter9Models();
 */
export function useNrouter9Models() {
  const [models, setModels] = useState([]);
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.nrouter9.config();
      if (!response.ok) {
        throw new Error(`Failed to fetch 9Router config: ${response.status}`);
      }
      
      const data = await response.json();
      setModels(data.models || []);
      setCombos(data.combos || []);
    } catch (err) {
      console.error('[useNrouter9Models] Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return {
    models,
    combos,
    loading,
    error,
    refetch: fetchConfig,
  };
}

/**
 * Get model options formatted for UI selection
 * Transforms 9Router models into the format expected by the UI
 */
export function useNrouter9ModelOptions() {
  const { models, loading, error } = useNrouter9Models();

  const options = models.map(model => ({
    value: model.fullModel, // e.g., "cx/gpt-5.5"
    label: model.name,      // e.g., "GPT 5.5"
    provider: model.provider,
  }));

  // Group by provider for better UX
  const groupedOptions = options.reduce((acc, opt) => {
    if (!acc[opt.provider]) {
      acc[opt.provider] = [];
    }
    acc[opt.provider].push(opt);
    return acc;
  }, {});

  return {
    options,
    groupedOptions,
    loading,
    error,
  };
}